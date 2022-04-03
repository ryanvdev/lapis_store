import mongoose from 'mongoose';

import productSchema, {
    IProductSchema,
    TProductDocument,
    TProductModel,
} from '../schemas/productSchema';

productSchema.methods.slugIsExisted = async function () {
    if (!this.slug) return undefined;

    const product = await ProductModel.findOne({
        slug: this.slug,
    });

    if (!product) return false;

    if (!this._id) return true;

    if (product._id.toString() === this._id.toString()) {
        return false;
    }
    return true;
};

productSchema.statics.findBySlug = async function (
    slug: string,
): Promise<TProductDocument | null> {
    return await ProductModel.findOne({
        slug: slug,
    });
};

const ProductModel = mongoose.model<IProductSchema, TProductModel>(
    'Product',
    productSchema,
);

export default ProductModel;
