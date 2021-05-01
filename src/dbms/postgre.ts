import config from "config";
import { Sequelize } from "sequelize-typescript";
import { Product } from "../models/model.product";
import { Heart } from "../models/model.heart";
//import { ProductReview } from "../models/product_review";
//import { RefreshToken } from "../models/refresh_token";
import { User } from "../models/model.user";

const sequelize = new Sequelize("postgres://postgres:7565@localhost:5432/postgres");
//sequelize.authenticate();

sequelize.addModels([User, Product, Heart]); //, RefreshToken, Product, ProductDibs, ProductReview]);

//sequelize.sync({ force: false, });

// if (process.env.MODE == "dev") {
//     sequelize.sync({ force: true });
// }

const db = {
    User,
    Heart,
    Product,
    sequelize, // connection instance (RAW queries)
    connection: sequelize,
    Sequelize, // library
};

export default db;
