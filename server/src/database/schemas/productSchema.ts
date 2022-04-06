import mongoose from 'mongoose';

import {TLapisMongooseDocument, ILapisGeneralSchema} from '../../core/LapisTypes';
import CategoryModel from '../models/CategoryModel';


const checkSlug = /^[a-z0-9\-]+$/;

interface IProductSchema extends ILapisGeneralSchema, mongoose.Document {
    _id: mongoose.Types.ObjectId;
    categoryId?: mongoose.Types.ObjectId;
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

interface IProductDocument extends IProductSchema {
    currentPrice: Number,
    slugIsExisted: () => Promise<boolean | undefined>
};

// static methods
interface IProductModel extends mongoose.Model<IProductDocument>{
    findBySlug: (slug: string) => Promise<TProductDocument | null>;
}

const productSchema = new mongoose.Schema<IProductDocument, IProductModel>({
    categoryId: {
        type: mongoose.SchemaTypes.ObjectId,
        validate:{
            validator: async (v:mongoose.Types.ObjectId|undefined): Promise<boolean> => {
                if(!v) return true; // if id === undefined
                return await CategoryModel.idIsExisted(v);
            },
            message: (v) => `Invalid categoryId: ${v.value} don't exists`
        }
    },
    title: {
        type: String,
        default: '',
    },
    slug: {
        type: String,
        required: true,
        minlength: 1,
        validate:{
            validator: (v:String)=> checkSlug.test(v as string),
            message: (v) => `Invalid slug: slug include [a-z0-9\\-]{1,}`
        }
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

type TProductDocument = TLapisMongooseDocument<IProductDocument>;
export { IProductSchema, TProductDocument, IProductDocument, IProductModel };
export default productSchema;
