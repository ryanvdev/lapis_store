import mongoose from 'mongoose';

type TMongooseDocument<T> = mongoose.Document<unknown, any, T> &
    T & {
        _id: mongoose.Types.ObjectId;
    };
export default TMongooseDocument;
