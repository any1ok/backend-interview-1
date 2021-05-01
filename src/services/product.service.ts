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
            { where: { id: value.product_no, useYn: true } }
        );
    }

    async getproductByProductNo(product_no: bigint) {
        return await Product.findOne({ where: { product_no, useYn: true } });
    }

    async deleteproductByProductNo(product_no: bigint) {
        return await Product.update({ useYn: false }, { where: { product_no } });
    }

    async createOne(user_no: bigint, product_no: bigint) {
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
                    { useYn: true },
                    { where: { user_no, product_no } }
                );
            }
        } else {
            const dibs = new Heart({ user_no, product_no });
            await dibs.save();
        }

        return;
    }

    /*
        async findList(value: {
            dibs?: boolean;
            userId?: bigint;
            searchText?: string;
            starMin?: number;
            starMax?: number;
            brand?: string;
            order: "dibsCount" | "reviewCount" | "name" | "createdAt";
            asc: boolean;
            limit: number;
            offset: number;
            }) {
            const result: any = await db.connection.query(
                `
                SELECT 
                    *
                FROM 
                (
                    SELECT 
                        *
                        , COUNT(1) OVER() AS TOTAL_COUNT
                    FROM 
                    (
                        SELECT 
                            A."id"
                            , A."name"
                            , A."description"
                            , A."brand"
                            , A."dibsCount"
                            , A."createdAt"
                            , A."dibsYn"
                            , COUNT(B."id") AS "reviewCount"
                            , AVG(B."star") AS "starAverage"
                        FROM 
                        (
                            SELECT  
                                A."id"
                                , A."name"
                                , A."description"
                                , A."brand"
                                , A."createdAt"
                                , COUNT(B."id") AS "dibsCount"
                                , COALESCE(C."useYn", FALSE) AS "dibsYn"
                            FROM "Products" AS A 
                            LEFT JOIN "ProductDibs" AS B 
                            ON 1=1
                                AND A."id" = B."productId"
                                AND B."useYn" IS TRUE
                            LEFT JOIN "ProductDibs" AS C 
                            ON 1=1
                                AND A."id" = C."productId"
                                AND C."userId" = ${value.userId ?? 0}
                            GROUP BY 
                                A."id"
                                , A."name"
                                , A."description"
                                , A."brand"
                                , A."createdAt"
                                , C."id"
                        ) AS A
                        LEFT JOIN "ProductReviews" B 
                        ON 1=1
                            AND A."id" = B."productId"
                            AND B."useYn" IS TRUE
                        GROUP BY 
                            A."id"
                            , A."name"
                            , A."description"
                            , A."brand"
                            , A."dibsCount"
                            , A."createdAt"
                            , A."dibsYn"
                    ) A
                    WHERE 1=1
                        ${value.starMin === null
                    ? ""
                    : `AND A."starAverage" >= ${value.starMin}`
                }
                        ${value.starMax === null
                    ? ""
                    : `AND A."starAverage" <= ${value.starMax}`
                }
                        ${value.brand === null
                    ? ""
                    : `AND A."brand" = '${postgresStringEscape(
                        value.brand
                    )}'`
                }
                        ${value.searchText === null
                    ? ""
                    : `AND (
                                    A."name" LIKE '%' || ${postgresStringEscape(
                        value.searchText
                    )}
                                    OR 
                                    A."description" LIKE '%' || ${postgresStringEscape(
                        value.searchText
                    )}
                                )`
                }
                        ${value.dibs === null
                    ? ""
                    : `AND A."dibsYn" = ${value.dibs}`
                }
                ) A
                ORDER BY A."${value.order}"
                ${value.asc ? "ASC" : "DESC"}
                OFFSET ${value.offset}
                LIMIT ${value.limit}
            `,
                { type: QueryTypes.SELECT }
            );
    
            return {
                total_count: result.length === 0 ? 0 : result[0].total_count,
                list: result.map((e) => ({
                    id: e.id,
                    name: e.name,
                    description: e.description,
                    createdAt: e.createdAt,
                    dibsCount: e.dibsCount,
                    reviewCount: e.reviewCount,
                    starAverage: e.starAverage,
                    dibsYn: e.dibsYn,
                })),
            };
        }
    */
}
