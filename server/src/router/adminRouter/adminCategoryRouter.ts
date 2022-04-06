import express from 'express';
import adminCategoryController from '../../controllers/admin/adminCategoryController';

const adminCategoryRouter:express.Router = express.Router();

adminCategoryRouter.get('/find/:id', adminCategoryController.find);
adminCategoryRouter.post('/create', adminCategoryController.create);
adminCategoryRouter.patch('/update/:id', adminCategoryController.update);
adminCategoryRouter.delete('/remove/:id', adminCategoryController.remove);

export default adminCategoryRouter;