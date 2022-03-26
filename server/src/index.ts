import './core/configEnv';
import express, {Application, NextFunction, Request, Response} from 'express';
import lapisLog, { ELogColor } from './core/lapisLog';
import router from './router';
import LAPIS_ENV from './core/LAPIS_ENV';
import dbConnect from './core/dbConnect';

(async ()=>{
    const app:Application = express();

    await dbConnect();
    router(app);

    app.listen(LAPIS_ENV.PORT, ()=>{
        lapisLog(
            'INFO',
            `Server have been run on ${ELogColor.FgBlue}http://127.0.0.1:${LAPIS_ENV.PORT}/${ELogColor.Reset}`
        );
    });
})();