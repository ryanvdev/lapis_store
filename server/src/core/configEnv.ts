import dotenv from 'dotenv';
import lapisLog from './lapisLog';

lapisLog('INFO', `NODE_ENV="${process.env.NODE_ENV}"`);

if (process.env.NODE_ENV) {
    dotenv.config({
        path: `.env.${process.env.NODE_ENV}`,
    });
}
