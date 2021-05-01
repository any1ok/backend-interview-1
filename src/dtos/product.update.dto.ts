
export class ProductUpdateDto {
    constructor(value: {
        product_no: bigint;
        user_no: bigint;
        product_nm: string;
        price: bigint;
        product_detail: string;
        brand: string;
        size: string;
        color: string;
    }) {
        this.product_no = value.product_no
        this.user_no = value.user_no
        this.product_nm = value.product_nm;
        this.price = value.price;
        this.product_detail = value.product_detail;
        this.brand = value.brand;
        this.size = value.size;
        this.color = value.color;
    }

    product_no: bigint;
    user_no: bigint;
    product_nm: string;
    price: bigint;
    product_detail: string;
    brand: string;
    size: string;
    color: string;
}
