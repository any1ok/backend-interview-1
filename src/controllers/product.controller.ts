import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product.service";
import * as _ from 'lodash';

export class ProductController {

    //상품만들기
    async insertProduct(req: Request, res: Response, next: NextFunction) {
        const user_no = BigInt(req.userItem.user_no)
        const user_type = String(req.userItem.user_type)
        if (user_no == null) {
            res.status(403).send({ success_yn: false, msg: "non auth" });
            return;
        }
        if (user_type != "ADMIN") {
            res.status(403).send({ success_yn: false, msg: "non auth" });
            return;
        }
        const product_nm = _.defaultTo(String(req.body.product_nm), null);
        const price = _.defaultTo(BigInt(req.body.price), null);
        const product_detail = _.defaultTo(String(req.body.product_detail), null);
        const brand = _.defaultTo(String(req.body.brand), null);
        const size = _.defaultTo(String(req.body.size), null);
        const color = _.defaultTo(String(req.body.color), null);

        if (product_nm == null || price == null || product_detail == null || product_nm == null || brand == null || size == null || color == null) {
            res.status(406).send({ success_yn: false, msg: "bad param" });
            return;
        }

        try {
            const productService = new ProductService();

            const product = await productService.createProduct({
                user_no,
                product_nm,
                price,
                product_detail,
                brand,
                size,
                color,
                join_dt: BigInt(Date.now())
            });

            res.json({ success_yn: true, msg: "success" });
        } catch (error) {
            res.status(403).send({ success_yn: false, error: error });
            console.log("query: error", error);
            return;
        }
    }
    //상품수정
    async updateProduct(req: Request, res: Response, next: NextFunction) {
        const user_no = BigInt(req.userItem.user_no)
        if (user_no == null) {
            res.status(403).send({ success_yn: false, msg: "non auth" });
            return;
        }
        const product_no = BigInt(req.params.product_no);
        const product_nm = _.defaultTo(String(req.body.product_nm), null);
        const price = _.defaultTo(BigInt(req.body.price), null);
        const product_detail = _.defaultTo(String(req.body.product_detail), null);
        const brand = _.defaultTo(String(req.body.brand), null);
        const size = _.defaultTo(String(req.body.size), null);
        const color = _.defaultTo(String(req.body.color), null);

        if (product_nm == null || price == null || product_detail == null || product_nm == null || brand == null || size == null || color == null) {
            res.status(406).send({ success_yn: false, msg: "bad param" });
            return;
        }

        try {
            const productService = new ProductService();

            await productService.updateProduct({
                user_no,
                product_nm,
                product_detail,
                brand,
                price,
                size,
                color,
                product_no
            });

            res.json({ success_yn: true, msg: "success" });
        } catch (error) {
            res.status(403).send({ success_yn: false, error: error });
            console.log("query: error", error);
            return;
        }
    }
    // 상품 디테일
    async getProduct(req: Request, res: Response, next: NextFunction) {
        const user_no = BigInt(req.userItem.user_no)
        if (user_no == null) {
            res.status(403).send({ success_yn: false, msg: "non auth" });
            return;
        }
        const product_no = BigInt(req.params.product_no);

        try {
            const productService = new ProductService();

            const product_data = await productService.getproductByProductNo(product_no);

            res.json({ success_yn: true, msg: "success", product_data });
        } catch (error) {
            res.status(403).send({ success_yn: false, error: error });
            console.log("query: error", error);
            return;
        }
    }
    //  상품삭제
    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        const user_type = String(req.userItem.user_type)
        if (user_type != "ADMIN") {
            res.status(403).send({ success_yn: false, msg: "non auth" });
            return;
        }
        const product_no = BigInt(req.params.product_no);

        try {
            const productService = new ProductService();

            await productService.deleteProductByProductNo(product_no);

            res.json({ success_yn: true, msg: "success", });
        } catch (error) {
            res.status(403).send({ success_yn: false, error: error });
            console.log("query: error", error);
            return;
        }
    }

    //좋아요
    async heart(req: Request, res: Response, _next: NextFunction) {
        const user_no = BigInt(req.userItem.user_no)
        if (user_no == null) {
            res.status(403).send({ success_yn: false, msg: "non auth" });
            return;
        }
        const product_no = BigInt(req.params.product_no);

        try {
            const dibsService = new ProductService();

            await dibsService.heartYn(user_no, product_no);

            res.json({ success_yn: true, msg: "success", });
        } catch (error) {
            res.status(403).send({ success_yn: false, error: error });
            console.log("query: error", error);
            return;
        }
    }

    //상품 목록 조회
    async productList(req: Request, res: Response, _next: NextFunction) {
        const user_no = BigInt(req.userItem.user_no)
        if (user_no == null) {
            res.status(403).send({ success_yn: false, msg: "non auth" });
            return;
        }
        var search_filter = _.defaultTo(String(req.query.search_filter), null);
        var search_text = _.defaultTo(String(req.query.search_text), null);
        if (search_text != null) {
            search_text = '%' + search_text + '%'
        }
        var sort_type = _.defaultTo(String(req.query.sort_type), null);
        var page = _.defaultTo(Number(req.query.page), 1);
        var limit = _.defaultTo(Number(req.query.limit), 10);
        var offset = limit * (page - 1)
        var page = _.defaultTo(Number(req.query.page), 1);
        var max_price = _.defaultTo(Number(req.query.max_price), null);
        var min_price = _.defaultTo(Number(req.query.min_price), null);
        if (!(sort_type == 'price' || sort_type == "product_nm" || sort_type == "join_dt")) {
            res.status(406).send({ success_yn: false, msg: "bad param1" });
            return;
        }
        if (!(search_filter == 'color' || search_filter == "product_nm" || search_filter == "size")) {
            res.status(406).send({ success_yn: false, msg: "bad param2" });
            return;
        }
        if (max_price != null) {
            if (min_price > max_price) {
                res.status(401).send({ success_yn: false, msg: "bad param3" });
                return;
            }
        }
        try {
            const productService = new ProductService();

            const data = await productService.productList({
                search_filter,
                search_text,
                sort_type,
                limit,
                offset,
                max_price,
                min_price,
                user_no
            });
            var total_cnt = 0;
            if (data.length > 0) {
                total_cnt = _.get(data[0], 'total_cnt');
            }
            res.json({ success_yn: true, msg: "success", data, total_cnt });
        } catch (error) {
            res.status(403).send({ success_yn: false, error: error });
            console.log("query: error", error);
            return;
        }
    }

    async insertReview(req: Request, res: Response, next: NextFunction) {
        const user_no = BigInt(req.userItem.user_no)
        if (user_no == null) {
            res.status(403).send({ success_yn: false, msg: "non auth" });
            return;
        }

        const product_no = _.defaultTo(String(req.body.product_no), null);
        const review_content = _.defaultTo(String(req.body.review_content), null);

        if (product_no == null || review_content == null) {
            res.status(406).send({ success_yn: false, msg: "bad param" });
            return;
        }

        try {
            const productService = new ProductService();

            const product = await productService.createReview({
                user_no,
                product_no,
                review_content,
                join_dt: BigInt(Date.now())
            });

            res.json({ success_yn: true, msg: "success" });
        } catch (error) {
            res.status(403).send({ success_yn: false, error: error });
            console.log("query: error", error);
            return;
        }
    }
    //상품수정
    async updateReview(req: Request, res: Response, next: NextFunction) {
        const user_no = BigInt(req.userItem.user_no)
        if (user_no == null) {
            res.status(403).send({ success_yn: false, msg: "non auth" });
            return;
        }
        const review_content = _.defaultTo(String(req.body.review_content), null);
        const review_no = BigInt(req.params.review_no);


        if (review_content == null || review_no == null) {
            res.status(406).send({ success_yn: false, msg: "bad param" });
            return;
        }

        try {
            const productService = new ProductService();

            await productService.updateReview(
                review_no,
                review_content,
            );

            res.json({ success_yn: true, msg: "success" });
        } catch (error) {
            res.status(403).send({ success_yn: false, error: error });
            console.log("query: error", error);
            return;
        }
    }
    // 상품 디테일
    async getReview(req: Request, res: Response, next: NextFunction) {
        const user_no = BigInt(req.userItem.user_no)
        if (user_no == null) {
            res.status(403).send({ success_yn: false, msg: "non auth" });
            return;
        }
        const product_no = BigInt(req.query.product_no);

        const mine = _.defaultTo(Boolean(req.query.mine), false);
        try {
            const productService = new ProductService();

            const product_data = await productService.reviewlist(user_no, product_no, mine);

            res.json({ success_yn: true, msg: "success", product_data });
        } catch (error) {
            res.status(403).send({ success_yn: false, error: error });
            console.log("query: error", error);
            return;
        }
    }

}
