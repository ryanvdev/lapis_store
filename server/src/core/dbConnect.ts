import mongoose from 'mongoose';
import lapisLog from './lapisLog';
import LAPIS_ENV from './LAPIS_ENV';

export default async function (): Promise<boolean> {
    lapisLog('WAITTING', `Connecting to ${LAPIS_ENV.DATABASE_NAME}`);
    try {
        await mongoose.connect(
            `mongodb://${LAPIS_ENV.DATABASE_HOST}/${LAPIS_ENV.DATABASE_NAME}`,
            {
                keepAlive: true,
            },
        );
        lapisLog('SUCCESS', `Connect to ${LAPIS_ENV.DATABASE_NAME} successfully !`);
        return true;
    } catch (e) {
        lapisLog('ERROR', `Connect to ${LAPIS_ENV.DATABASE_NAME} failed !`);
    }
    return false;
}
