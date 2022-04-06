import mongoose from 'mongoose';
import { ILapisGeneralSchema, TLapisMongooseDocument } from '../../core/LapisTypes';
import CategoryModel from '../models/CategoryModel';

interface ICategorySchema extends ILapisGeneralSchema{
    title: string,
    parentId?: mongoose.Types.ObjectId,
}

// Include virtual properties, document methods
interface ICategoryDocument extends ICategorySchema {
    fullPath: string,
    parentIdIsExisted: () => Promise<boolean>
    fullPathIsCircularLoops: () => Promise<boolean>
}

// Include static methods
interface ICategoryModel extends mongoose.Model<ICategoryDocument> {
    idIsExisted: (id: mongoose.Types.ObjectId|undefined) => Promise<boolean>;
}

const categorySchema = new mongoose.Schema<ICategoryDocument, ICategoryModel>({
    title: {
        type: String,
        default: ''
    },
    parentId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: false,
        default: undefined,
        validate: {
            validator: async (v:mongoose.Types.ObjectId):Promise<boolean>=>{
                return await CategoryModel.idIsExisted(v);
            },
            message: (v) => `Invalid parentId: ${v} not exists. parentId must be undefined or categoryId existed`
        }
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => new Date(Date.now()),
    },
    updatedAt: {
        type: Date,
        default: () => new Date(Date.now()),
    }
});

type TCategoryDocument = TLapisMongooseDocument<ICategoryDocument>

export {
    ICategorySchema,
    ICategoryDocument,
    ICategoryModel,
    TCategoryDocument
}

export default categorySchema;

