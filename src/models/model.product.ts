import {
    Table,
    Column,
    Model,
    Comment,
    DataType,
    Default,
    AllowNull,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
} from "sequelize-typescript";
import { User } from "./model.user";

//상품 테이블
@Table
export class Product extends Model {

    @Comment("상품 일련번호")
    @PrimaryKey
    @AutoIncrement
    @Column
    product_no: bigint;

    @Comment("등록자(유저) 일련번호")
    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    user_no: bigint;

    @Comment("상품명")
    @AllowNull(false)
    @Column(DataType.STRING(50))
    product_nm: string;

    @Comment("상품가격")
    @AllowNull(false)
    @Column
    price: bigint;

    @Comment("상품 설명")
    @AllowNull(false)
    @Column(DataType.TEXT)
    product_detail: string;

    @Comment("상품 브랜드")
    @AllowNull(false)
    @Column(DataType.STRING(50))
    brand: string;

    @Comment("상품 사이즈")
    @AllowNull(false)
    @Column(DataType.STRING(50))
    size: string;

    @Comment("상품 색상")
    @AllowNull(false)
    @Column(DataType.STRING(50))
    color: string;

    @Comment("등록일자")
    @AllowNull(false)
    @Column
    join_dt: bigint;

    @Comment("사용여부(논리적 삭제)")
    @AllowNull(false)
    @Default(true)
    @Column
    use_yn: boolean;
}
