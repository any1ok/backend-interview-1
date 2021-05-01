import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product.service";
import * as _ from 'lodash';

export class ProductController {


    async insertProduct(req: Request, res: Response, next: NextFunction) {

        const user_no = _.get(req, 'user_no');
        const product_nm = _.defaultTo(req.body.product_nm, null);
        const price = _.defaultTo(req.body.price, null);
        const product_detail = _.defaultTo(req.body.product_detail, null);
        const brand = _.defaultTo(req.body.brand, null);
        const size = _.defaultTo(req.body.size, null);
        const color = _.defaultTo(req.body.color, null);

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
                joinDt: BigInt(Date.now())
            });

            res.json({ success_yn: true, msg: "success" });
        } catch (error) {
            res.status(403).send({ success_yn: false, error: error });
            console.log("query: error", error);
            return;
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {

        const user_no = _.get(req, 'user_no');
        const product_no = _.defaultTo(req.body.product_no, null);
        const product_nm = _.defaultTo(req.body.product_nm, null);
        const price = _.defaultTo(req.body.price, null);
        const product_detail = _.defaultTo(req.body.product_detail, null);
        const brand = _.defaultTo(req.body.brand, null);
        const size = _.defaultTo(req.body.size, null);
        const color = _.defaultTo(req.body.color, null);

        if (product_nm == null || price == null || product_detail == null || product_nm == null || brand == null || size == null || color == null) {
            res.status(406).send({ success_yn: false, msg: "bad param" });
            return;
        }

        try {
            const productService = new ProductService();

            const product = await productService.updateProduct({
                user_no,
                product_nm,
                price,
                product_detail,
                brand,
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

    async getProduct(req: Request, res: Response, next: NextFunction) {
        const product_no = BigInt(req.params.id);

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

    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        const product_no = _.defaultTo(BigInt(req.params.id), null);

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

    //찜(좋아요)
    async Heart(req: Request, res: Response, _next: NextFunction) {
        const product_no = _.defaultTo(BigInt(req.params.id), null);


        const user_no = BigInt((_.get(req, 'user_no')));

        try {
            const dibsService = new ProductService();

            await dibsService.heartYn(user_no, product_no);

            res.json({
                success: true,
                message: "성공",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "서버 오류",
                error: JSON.stringify(error),
            });
        }
    }



    //상품 목록 조회
    async findList(req: Request, res: Response, _next: NextFunction) {
        const user_no = BigInt((_.get(req, 'user_no')));

        let order: "dibsCount" | "reviewCount" | "name" | "createdAt";

        switch (String(req.query.order)) {
            case "dibsCount":
                order = "dibsCount";
                break;
            case "reviewCount":
                order = "reviewCount";
                break;
            case "name":
                order = "name";
                break;
            case "createdAt":
                order = "createdAt";
                break;
            default:
                order = "dibsCount";
        }

        const dibs =
            req.query.dibs === undefined ? null : req.query.dibs == "true";
        const searchText = (req.query.searchText as string) ?? null;
        const starMin =
            req.query.starMin === undefined ? null : Number(req.query.starMin);
        const starMax =
            req.query.starMin === undefined ? null : Number(req.query.starMax);
        const brand = (req.query.brand as string) ?? null;
        const asc = req.query.asc === "true";
        const page = req.query.page === undefined ? 1 : Number(req.query.page);
        const limit =
            req.query.limit === undefined ? 10 : Number(req.query.limit);
        const offset = (page - 1) * limit;

        const userId = req.authUser?.id ?? null;

        try {
            const productService = new ProductService();

            const { list, total_count } = await productService.findList({
                order,
                asc,
                limit,
                offset,
                searchText,
                starMin,
                starMax,
                brand,
                userId,
                dibs,
            });

            res.json({
                success: true,
                list,
                total_count,
                message: "성공",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "서버 오류",
                error: JSON.stringify(error),
            });
        }
    }

}
