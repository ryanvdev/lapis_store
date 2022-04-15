import { NextFunction, Request, Response } from 'express';

import lapisLog from '../../core/lapisLog';
import LAPIS_ENV from '../../core/LAPIS_ENV';
import { IProductSchema, TProductDocument } from '../../database/schemas/productSchema';
import ProductModel from '../../database/models/ProductModel';
import lapisRegex from '../../core/lapisRegex';

class AdminProductController {
    public constructor() {}

    // [POST] /product/create
    public create = async (req: Request, res: Response, next: NextFunction) => {
        // get and check request body
        const productFromClient: IProductSchema | undefined = req.body;
        if (!productFromClient) {
            return res.status(400).send();
        }

        // const product:TProductDocument = new ProductModel({
        //     ...productFromClient
        // });

        // create new product and then merge productFromClient to product
        const product: TProductDocument = new ProductModel();
        this.makeProduct(product, productFromClient);

        // Save to database
        try {
            // if slug existed
            const slugIsExisted = await product.slugIsExisted();
            if (slugIsExisted) {
                return res.status(400).json({
                    message: 'slug existed',
                });
            }

            // save
            await product.save();
            return res.status(200).json(product);
        } catch (e: any & { message: string }) {
            lapisLog('ERROR', e.message);

            if (LAPIS_ENV.IS_DEV) {
                return res.status(400).json({
                    message: e.message,
                });
            }

            return res.status(400).send();
        }
    };

    // [PATCH] /product/update/:id
    public update = async (req: Request, res: Response, next: NextFunction) => {
        const productId: string = req.params.id;

        // Check if id is objectId
        if(!lapisRegex.objectId.test(productId)){
            return res.status(404).send();
        }

        // get and check request body
        const productFromClient: IProductSchema | undefined = req.body;
        if (!productFromClient) {
            return res.status(400).send();
        }

        // find product
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).send();
        }

        // create new product and then merge productFromClient to product
        this.makeProduct(product, productFromClient);

        // update version and update time
        product.updatedAt = new Date(Date.now());

        // Save to database
        try {
            // if slug existed
            const slugIsExisted = await product.slugIsExisted();
            if (slugIsExisted) {
                return res.status(400).json({
                    message: 'slug existed',
                });
            }

            // else
            await product.save();
            return res.status(200).json(product);
        } catch (e: any & { message: string }) {
            lapisLog('ERROR', e.message);
            return res.status(400).send();
        }
    };

    // [DELETE] /product/remove/:id
    public remove = async (req: Request, res: Response, next: NextFunction) => {
        const productId: string = req.params.id;

        // Check if id is objectId
        if(!lapisRegex.objectId.test(productId)){
            return res.status(404).send();
        }

        const product = await ProductModel.findByIdAndDelete(productId);
        if (product) {
            return res.status(200).json(product);
        }
        return res.status(404).send();
    };

    // [GET] /product/find/:id
    public find = async (req: Request, res: Response, next: NextFunction) => {
        const productId: string = req.params.id;

        // Check if id is objectId
        if(!lapisRegex.objectId.test(productId)){
            return res.status(404).send();
        }

        const product = await ProductModel.findById(productId);

        if(!product){
            return res.status(404).send();
        }

        // lapisLog('WARNING')

        return res.status(200).json({
            ...product.toObject(),
            currentPrice: product.currentPrice
        });

    }

    // [GET] /product/list
    public list = async (req: Request, res: Response, next: NextFunction) => {
        const product = await ProductModel.find().sort({
            createdAt: -1
        });

        if(!product){
            return res.status(404).send();
        }

        return res.status(200).json(product);
    }

    // [GET] /product/check-slug
    public checkSlug = async (req: Request, res: Response, next: NextFunction) => {
        const slug:string|undefined = req.query.slug &&  String(req.query.slug);
        const id:string|undefined = req.query.id &&  String(req.query.id);
        
        if(!slug) return res.status(400).send();

        const product = await ProductModel.findBySlug(slug);

        if(!product || product === null){
            return res.status(200).json({
                isExisted: false
            }); 
        }

        if(id && id===product._id.toString()){
            return res.status(200).json({
                isExisted: false
            });
        }

        // response
        return res.status(200).json({
            isExisted: true
        });
    }

    private makeProduct = (
        product: TProductDocument,
        productFromClient: IProductSchema,
    ) => {
        if (productFromClient.categoryId) {
            if(String(productFromClient.categoryId) === 'undefined'){
                product.categoryId = undefined;
            }
            else product.categoryId = productFromClient.categoryId;
        }

        if (productFromClient.title) {
            product.title = productFromClient.title;
        }

        if (productFromClient.slug) {
            product.slug = productFromClient.slug;
        }

        if (productFromClient.summary) {
            product.summary = productFromClient.summary;
        }

        if (productFromClient.price) {
            product.price = productFromClient.price;
        }

        if (productFromClient.discount) {
            product.discount = productFromClient.discount;
        }

        if (productFromClient.discountStartAt) {
            product.discountStartAt = productFromClient.discountStartAt;
        }

        if (productFromClient.discountEndAt) {
            product.discountEndAt = productFromClient.discountEndAt;
        }

        if (productFromClient.quantity) {
            product.quantity = productFromClient.quantity;
        }

        if (productFromClient.description) {
            product.description = productFromClient.description;
        }

        if (productFromClient.images && Array.isArray(productFromClient.images)) {
            product.images = [...productFromClient.images];
        }
    };
}

const adminProductController = new AdminProductController();
export default adminProductController;
