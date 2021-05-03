
export class ReviewCreateDto {

    constructor(value: {
        user_no: bigint;
        product_no: string;
        review_content: string;
    }) {
        this.user_no = value.user_no
        this.product_no = value.product_no;
        this.review_content = value.review_content;
        this.join_dt = BigInt(Date.now());
    }
    user_no: bigint;
    product_no: string;
    review_content: string;
    join_dt: bigint;
}
