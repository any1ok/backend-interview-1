
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
    DataType
} from "sequelize-typescript";
import { Product } from "./model.product";
import { User } from "./model.user";

// 상품 찜 테이블
@Table
export class Review extends Model {
    @Comment("리뷰 일련번호")
    @PrimaryKey
    @AutoIncrement
    @Column
    review_no: bigint;

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

    @Comment("상품 설명")
    @AllowNull(false)
    @Column(DataType.TEXT)
    review_content: string;

    @Comment("등록일자")
    @AllowNull(false)
    @Column
    join_dt: bigint;

    @Comment("사용여부")
    @AllowNull(false)
    @Default(true)
    @Column
    use_yn: boolean;
}
