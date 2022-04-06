import mongoose from 'mongoose';

import productSchema, {
    IProductSchema,
    TProductDocument,
    IProductModel,
    IProductDocument,
} from '../schemas/productSchema';

// VIRTUAL PROPERTIES

productSchema.virtual('currentPrice').get(function(this: IProductSchema):number{
    return this.price*this.discount;
});


// METHODS

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


// STATICS

productSchema.statics.findBySlug = async function (
    slug: string,
): Promise<TProductDocument | null> {
    return await ProductModel.findOne({
        slug: slug,
    });
};

// EVENT

productSchema.pre('save', async function(next) {
    const currentTime = new Date(Date.now());
    this.updatedAt = currentTime;
    this.createdAt = currentTime;
    next();
});

const ProductModel = mongoose.model<IProductDocument, IProductModel>(
    'Product',
    productSchema,
);

export default ProductModel;
