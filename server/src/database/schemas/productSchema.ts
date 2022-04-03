import mongoose from 'mongoose';

import IGeneralSchema from '../../core/types/IGeneralSchema';
import TMongooseDocument from '../../core/types/TMongooseDocument';

interface IProductSchema extends IGeneralSchema {
    _id: mongoose.Types.ObjectId;
    categoryId?: mongoose.Types.ObjectId;
    title: String;
    slug: String;
    summary: String;
    price: Number;
    discount: Number;
    discountStartAt?: Date;
    discountEndAt?: Date;
    quantity: Number;
    description: String;
    images: String[];
}

// method
interface IProductMethods {
    slugIsExisted: () => Promise<boolean | undefined>;
}

type TProductDocument = TMongooseDocument<IProductSchema & IProductMethods>;

// static methods
interface IProductStatics {
    findBySlug: (slug: string) => Promise<TProductDocument | null>;
}

type TProductModel = mongoose.Model<IProductMethods & IProductSchema> & IProductStatics;

const productSchema = new mongoose.Schema<IProductSchema, TProductModel>({
    categoryId: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    title: {
        type: String,
        default: '',
    },
    slug: {
        type: String,
        required: true,
        minlength: 1,
    },
    summary: {
        type: String,
        default: '',
    },
    price: {
        type: Number,
        min: 0,
        default: 0,
    },
    discount: {
        type: Number,
        min: 0,
        default: 1,
    },
    discountStartAt: {
        type: Date,
    },
    discountEndAt: {
        type: Date,
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0,
    },
    description: {
        type: String,
        default: '',
    },
    images: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return new Date(Date.now());
        },
    },
    updatedAt: {
        type: Date,
        default: () => {
            return new Date(Date.now());
        },
    },
});

export { IProductSchema, TProductDocument, TProductModel };
export default productSchema;
