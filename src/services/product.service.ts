import { ProductCreateDto } from "../dtos/product.create.dto";
import { ReviewCreateDto } from "../dtos/review.create.dto";
import db from '../dbms/postgre'
import { Product } from "../models/model.product";
import { Review } from "../models/model.review";
import { Heart } from "../models/model.heart";
import { ProductUpdateDto } from "../dtos/product.update.dto";
import { QueryTypes } from "sequelize";
//import { postgresStringEscape } from "../lib/postgres_escape";

export class ProductService {

    async createProduct(value: ProductCreateDto) {
        const product = new Product({ ...value });
        return await product.save();
    }


    async updateProduct(value: ProductUpdateDto) {
        return await Product.update(
            { ...value },
            { where: { product_no: value.product_no, use_yn: true } }
        );
    }

    async getproductByProductNo(product_no: bigint) {
        return await Product.findOne({ where: { product_no, use_yn: true } });
    }

    async deleteProductByProductNo(product_no: bigint) {
        return await Product.update({ use_yn: false }, { where: { product_no } });
    }

    async heartYn(user_no: bigint, product_no: bigint) {
        const select_data = await Heart.findOne({
            where: { user_no, product_no },
        });

        if (select_data) {
            if (select_data.use_yn == false) {
                await Heart.update(
                    { use_yn: true },
                    { where: { user_no, product_no } }
                );
            }
            else {
                await Heart.update(
                    { use_yn: false },
                    { where: { user_no, product_no } }
                );
            }
        } else {
            const heart = new Heart({ user_no, product_no });
            await heart.save();
        }

        return;
    }

    async createReview(value: ReviewCreateDto) {
        const review = new Review({ ...value });
        await review.save();
        return;
    }

    async updateReview(review_no: bigint, review_content: string) {
        return await Product.update(
            { review_content },
            { where: { review_no, use_yn: true } }
        );
    }

    async reviewlist(product_no: bigint, user_no: bigint, mine: boolean) {
        if (mine) {
            return await Product.findAll({ where: { product_no, user_no, use_yn: true } });
        } else {
            return await Product.findAll({ where: { product_no, use_yn: true } });
        }
    }


    async productList(value: {
        search_filter?: string;
        search_text?: string;
        sort_type: string;
        limit: number;
        offset: number;
        max_price: number;
        min_price: number;
        user_no: bigint
    }) {

        const selectQuery1 = db.mybatisMapper.getStatement(
            "PRODUCT",
            "productlist.SELECT",
            {
                search_filter: value.search_filter,
                search_text: value.search_text,
                offset: value.offset,
                limit: value.limit,
                sort_type: value.sort_type,
                max_price: value.max_price,
                min_price: value.min_price,
                user_no: value.user_no
            },
            { language: "sql", indent: "  " }
        );
        var data1 = await db.sequelize.query(selectQuery1, {
            type: QueryTypes.SELECT,
        });
        return data1;

    }

}
