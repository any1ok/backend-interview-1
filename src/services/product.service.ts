import { ProductCreateDto } from "../dtos/product.create.dto";
import db from '../dbms/postgre'
import { Product } from "../models/model.product";
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
            if (select_data.useYn == false) {
                await Heart.update(
                    { useYn: true },
                    { where: { user_no, product_no } }
                );
            }
            else {
                await Heart.update(
                    { useYn: false },
                    { where: { user_no, product_no } }
                );
            }
        } else {
            const dibs = new Heart({ user_no, product_no });
            await dibs.save();
        }

        return;
    }


    async productList(value: {
        search_filter?: string;
        search_text?: string;
        sort_type: string;
        limit: number;
        offset: number;
        max_price: number;
        min_price: number;
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
            },
            { language: "sql", indent: "  " }
        );
        var data1 = await db.sequelize.query(selectQuery1, {
            type: QueryTypes.SELECT,
        });
        return data1;

    }

}
