import {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';

// Middleware
export type TLapisMiddleware = (req:Request, res:Response, next:NextFunction) => any | void | Promise<void> | undefined;

// Mongoose document
export type TLapisMongooseDocument<T> = mongoose.Document<unknown, any, T> &
T & {
    _id: mongoose.Types.ObjectId;
};

// General Schema
export interface ILapisGeneralSchema extends mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}
