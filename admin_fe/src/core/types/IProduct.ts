interface IProduct {
    _id: string;
    categoryId?: string;
    title: string;
    slug: string;
    summary: string;
    price: number;
    discount: number;
    discountStartAt?: string;
    discountEndAt?: string;
    quantity: number;
    description: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
}
export default IProduct;
