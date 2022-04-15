import express, {Request, Response, NextFunction} from 'express';
import lapisLog from '../core/lapisLog';
import { TLapisMiddleware } from '../core/LapisTypes';

const allowOrigins:string[] = [
    "http://lapis.com:80",
    "http://lapis.com:3000",
    "http://127.0.0.1",
    "http://127.0.0.1:3000",
    "http://localhost:3000"
]


const accessControlAllowLocalHost:TLapisMiddleware = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const headersOrigin = req.headers.origin;
    console.log(headersOrigin);
    // 
    if(!headersOrigin){
        next();
        return;
    }

    if(!allowOrigins.includes(headersOrigin)){
        lapisLog('WARNING', `Client access is "${headersOrigin}"`);

        res.status(403).send();
        return;
    }

    res.setHeader('Access-Control-Allow-Origin', headersOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();

    //  // Website you wish to allow to connect
    //  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');

    //  // Request methods you wish to allow
    //  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
    //  // Request headers you wish to allow
    //  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 
    //  // Set to true if you need the website to include cookies in the requests sent
    //  // to the API (e.g. in case you use sessions)
    //  res.setHeader('Access-Control-Allow-Credentials', true);
 
     // Pass to next layer of middleware
}

export default accessControlAllowLocalHost;