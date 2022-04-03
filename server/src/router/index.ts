import bodyParser from 'body-parser';
import { Application } from 'express';
import homeRouter from './homeRouter';
import loginRouter from './loginRouter';
import productRouter from './productRouter';

function router(app: Application) {
    // middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    //
    app.use('/product', productRouter);
    app.use('/home', homeRouter);
    app.use('/login', loginRouter);

    // default
    app.use('/', homeRouter);
}

export default router;
