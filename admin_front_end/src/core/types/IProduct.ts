interface IProduct{
    _id: string;
    categoryId?: string;
    title: string;
    slug: string;
    summary: string;
    price: number;
    discount: number;
    discountStartAt?: Date;
    discountEndAt?: Date;
    quantity: number;
    description: string;
    images: string[];
}
export default IProduct;