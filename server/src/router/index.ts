import { Application } from 'express';
import homeRouter from './homeRouter';

function router(app:Application){
    app.use('/home', homeRouter);

    // default
    app.use('/', homeRouter);
}

export default router;