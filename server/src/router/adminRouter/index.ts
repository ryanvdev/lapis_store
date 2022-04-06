import express from 'express';

import adminCategoryRouter from './adminCategoryRouter';
import adminProductRouter from './adminProductRouter';

const adminRouter = express.Router();

adminRouter.use('/product', adminProductRouter);
adminRouter.use('/category', adminCategoryRouter);

export default adminRouter;