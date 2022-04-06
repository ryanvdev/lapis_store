import bodyParser from 'body-parser';
import { Application } from 'express';
import homeRouter from './homeRouter';
import loginRouter from './loginRouter';
import adminRouter from './adminRouter';
import accessControlAllowLocalHost from '../middlewares/accessControlAllowLocalHost';

function router(app: Application) {
    // middleware
    app.use(accessControlAllowLocalHost);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    //
    app.use('/admin', adminRouter);
    app.use('/home', homeRouter);
    app.use('/login', loginRouter);

    // default
    app.use('/', homeRouter);
}

export default router;
