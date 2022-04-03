import express from 'express';
import productController from '../controllers/productController';

const productRouter = express.Router();

productRouter.post('/create', productController.create);
productRouter.patch('/update/:id', productController.update);
productRouter.delete('/remove/:id', productController.remove);

export default productRouter;
