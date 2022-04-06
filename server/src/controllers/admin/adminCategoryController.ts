import express, {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import lapisLog from '../../core/lapisLog';
import CategoryModel from '../../database/models/CategoryModel';
import { ICategoryDocument, ICategorySchema, TCategoryDocument } from '../../database/schemas/categorySchema';

class AdminCategoryController{
    // [POST] /category/create
    public create = async (req: Request, res: Response, next: NextFunction) => {
        // get category from client
        const categoryFromClient:ICategorySchema = req.body;
        if(!categoryFromClient){
            return res.status(400).send();
        }

        // create new category
        const category = new CategoryModel();
        this.makeCategory(category, categoryFromClient);

        // save
        try{
            await category.save();
            return res.status(200).json(category);
        }
        catch(e:any & {message:string}){
            lapisLog('ERROR', `Can't save category: ${e.message}`);
            return res.status(400).send();
        }
    }

    // [PATCH] /category/update/:id
    public update = async (req: Request, res: Response, next: NextFunction) => {
        const categoryId:string = req.params.id;

        // Find category and check
        const category = await CategoryModel.findById(categoryId);
        if(!category || category===null){
            return res.status(404).send();
        }

        // Get category from client
        const categoryFromClient:ICategorySchema = req.body;
        if(!categoryFromClient){
            return res.status(400).send();
        }

        // Merge category with categoryFromClient selectively
        this.makeCategory(category, categoryFromClient);

        // Check if fullPath of category is endless "circular loops"
        if(await category.fullPathIsCircularLoops()){
            return res.status(400).json({
                message: `Invalid parentId !. parentId can't contain child id`
            });
        }

        // Save
        try{
            await category.save();
            return res.status(200).json(category);
        }
        catch(e:any & {message:string}){
            lapisLog('ERROR', `Can't save category: ${e.message}`);
            return res.status(400).send();
        }
    }

    // [DELETE] /category/remove/:id
    public remove = async (req: Request, res: Response, next: NextFunction) => {
        const categoryId:string = req.params.id;
        
        try{
            // find
            const category = await CategoryModel.findByIdAndRemove(categoryId);

            // response
            if(!category || category === null){
                return res.status(404).send();
            }

            return res.status(200).json(category.toObject());
        }
        catch(e:any & {message:string}){
            lapisLog('ERROR', e.message);
        }

        return res.status(404).send();
    }


    // [GET] /category/find/:id
    public find = async (req: Request, res: Response, next: NextFunction) => {
        const categoryId:string = req.params.id;
        
        // find
        const category = await CategoryModel.findById(categoryId);

        // response
        if(!category){
            return res.status(404).send();
        }

        return res.status(200).json({
            ...category.toObject(),
            fullPath: await category.fullPath
        } as ICategoryDocument)
    }

    private makeCategory = (category:TCategoryDocument, categoryFromClient:ICategorySchema) => {
        if(categoryFromClient.title){
            category.title = categoryFromClient.title;
        }

        if(categoryFromClient.parentId){
            if(String(categoryFromClient.parentId) === 'undefined'){
                category.parentId = undefined;
            }
            else{
                category.parentId = categoryFromClient.parentId;
            }
        }
    }
}

const adminCategoryController:AdminCategoryController = new AdminCategoryController();
export default adminCategoryController;