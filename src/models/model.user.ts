import {
    Table,
    Column,
    Model,
    Unique,
    Comment,
    DataType,
    Default,
    AllowNull,
    PrimaryKey,
    AutoIncrement,
    CreatedAt
} from "sequelize-typescript";

// 사용자 테이블
@Table
export class User extends Model {

    @Comment("일련번호")
    @PrimaryKey
    @AutoIncrement
    @Column
    user_no: bigint;

    @Comment("아이디")
    @AllowNull(false)
    @Unique
    @Column
    user_id: string;

    @Comment("패스워드")
    @AllowNull(false)
    @Column(DataType.STRING(255))
    pass: string;

    @Comment("유저 고유 아이디")
    @AllowNull(false)
    @Column(DataType.STRING(100))
    uuid: string;

    @Comment("사용자 이름")
    @AllowNull(false)
    @Column(DataType.STRING(100))
    name: string;

    @Comment("이메일")
    @AllowNull(false)
    @Column(DataType.STRING(100))
    email: string;

    @Comment("사용자 타입")
    @AllowNull(false)
    @Column
    user_type: string;

    @Comment("가입일자")
    @AllowNull(false)
    @Column
    join_dt: bigint;

    @CreatedAt
    created: Date;

    @Comment("탈퇴여부 : 0일시 미탈퇴")
    @AllowNull(false)
    @Default(0)
    @Column
    userStatus: bigint;
}
