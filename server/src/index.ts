import './core/configEnv';
import express, {Application, NextFunction, Request, Response} from 'express';
import lapisLog from './core/lapisLog';

const PORT = process.env.PORT || 8080;
const app:Application  = express();

app.get('/', async (req:Request, res:Response)=>{
    lapisLog('ERROR', 'ok');
    res.status(200).send('Setup completed');
});

app.listen(PORT, ()=>{
    lapisLog('INFO', `Server have been run on 127.0.0.1:${PORT}/`);
});