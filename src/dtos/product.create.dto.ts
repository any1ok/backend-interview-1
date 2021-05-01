
export class ProductCreateDto {

    constructor(value: {
        user_no: bigint;
        product_nm: string;
        price: bigint;
        product_detail: string;
        brand: string;
        size: string;
        color: string;
        joinDt: bigint;
    }) {
        this.user_no = value.user_no
        this.product_nm = value.product_nm;
        this.price = value.price;
        this.product_detail = value.product_detail;
        this.brand = value.brand;
        this.size = value.size;
        this.color = value.color;
        this.joinDt = value.joinDt;
    }

    user_no: bigint;
    product_nm: string;
    price: bigint;
    product_detail: string;
    brand: string;
    size: string;
    color: string;
    joinDt: bigint;


}
