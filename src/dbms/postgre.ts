
import config from "config";
import { Sequelize } from "sequelize-typescript";

import { Product } from "../models/model.product";
import { Heart } from "../models/model.heart";

import { User } from "../models/model.user";

const path = require("path");
const sequelize = new Sequelize("postgres://postgres:7565@localhost:5432/postgres");


sequelize.addModels([User, Product, Heart]);
const mybatisMapper = require("mybatis-mapper");
const sqlPath = path.join(__dirname, "..", "..", ".", '/src/sql');
console.log(sqlPath);
mybatisMapper.createMapper([`${sqlPath}/product.xml`]);


const db = {
    User,
    Heart,
    Product,
    sequelize,
    connection: sequelize,
    Sequelize,
    mybatisMapper
};

export default db;
