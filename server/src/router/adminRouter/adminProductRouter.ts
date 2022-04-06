import express from 'express';
import adminProductController from '../../controllers/admin/adminProductController';

const adminProductRouter = express.Router();

adminProductRouter.post('/create', adminProductController.create);
adminProductRouter.patch('/update/:id', adminProductController.update);
adminProductRouter.delete('/remove/:id', adminProductController.remove);
adminProductRouter.get('/find/:id', adminProductController.find);
adminProductRouter.get('/list', adminProductController.list);
adminProductRouter.get('/check-slug', adminProductController.checkSlug);

export default adminProductRouter;
