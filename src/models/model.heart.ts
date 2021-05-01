
import {
    Table,
    Column,
    Model,
    Comment,
    Default,
    AllowNull,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
} from "sequelize-typescript";
import { Product } from "./model.product";
import { User } from "./model.user";

// 상품 찜 테이블
@Table
export class Heart extends Model {
    @Comment("좋아요 일련번호")
    @PrimaryKey
    @AutoIncrement
    @Column
    heart_no: bigint;

    @Comment("사용자 일련번호")
    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    user_no: bigint;

    @Comment("상품 일련번호")
    @AllowNull(false)
    @ForeignKey(() => Product)
    @Column
    product_no: bigint;

    @Comment("사용여부")
    @AllowNull(false)
    @Default(true)
    @Column
    useYn: boolean;
}
