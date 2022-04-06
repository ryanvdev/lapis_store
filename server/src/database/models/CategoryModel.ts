import mongoose from "mongoose";
import lapisLog from "../../core/lapisLog";
import categorySchema,{ ICategoryDocument, ICategoryModel, ICategorySchema } from "../schemas/categorySchema";
import { IProductDocument } from "../schemas/productSchema";

// VIRTUAL

categorySchema.virtual('fullPath').get(async function(this:ICategorySchema):Promise<String> {
    const ROOT_TITLE = 'LapisStore';

    const getPath = async (id:mongoose.Types.ObjectId, listParentId: string[] = []): Promise<string> => {
        const category = await CategoryModel.findById(id);

        if(!category || category === null) return '';
        if(!category.parentId) return category.title;

        // avoid endless "circular loops"
        const strParentId = category.parentId.toString()
        if(listParentId.includes(strParentId)) {
            lapisLog('WARNING', `endless "circular loops", ${JSON.stringify(listParentId)}`);
            return '';
        }
        listParentId.push(strParentId);


        const parentCategoryPath = await getPath(category.parentId, listParentId);
        return `${parentCategoryPath}/${category.title}`;
    }
    if(!this.parentId) return '';

    // LapisStore/{parentPath}/title
    return `${ROOT_TITLE}/${await getPath(this.parentId)}/${this.title}`;
});


// METHODS

categorySchema.methods.parentIdIsExisted = async function (this:ICategorySchema):Promise<boolean> {
    return await CategoryModel.idIsExisted(this.parentId);
};

categorySchema.methods.fullPathIsCircularLoops = async function (this:ICategorySchema):Promise<boolean> {
    if(!this._id || !this.parentId) return false;

    if(this._id.toString() === this.parentId.toString()) return true;
    
    const checkFullPathIsCircularLoops = async (id:mongoose.Types.ObjectId, listParentId:string[] = []): Promise<boolean> => {
        const category = await CategoryModel.findById(id);

        if(!category || category === null) return false;
        if(!category.parentId) return false;

        // avoid endless "circular loops"
        const strParentId = category.parentId.toString()
        if(listParentId.includes(strParentId)) {
            return true;
        }
        listParentId.push(strParentId);


        return await checkFullPathIsCircularLoops(category.parentId, listParentId);
    }

    return await checkFullPathIsCircularLoops(this.parentId, [this._id.toString()]);
}

// STATICS

categorySchema.statics.idIsExisted = async function(id:mongoose.Types.ObjectId|undefined): Promise<boolean> {
    if(!id) return false;

    const parentCategory = await CategoryModel.exists({
        _id: id
    });

    if(parentCategory){
        return true;
    }

    return false;
}

// EVENT

categorySchema.pre('save', async function(next) {
    const currentTime = new Date(Date.now());
    this.createdAt = currentTime;
    this.updatedAt = currentTime;
    next();
})


const CategoryModel = mongoose.model<ICategoryDocument, ICategoryModel>('Category', categorySchema);

export default CategoryModel;