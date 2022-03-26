import mongoose, {} from 'mongoose';
import lapisLog from './lapisLog';
import LAPIS_ENV from './LAPIS_ENV';


export default async function(){
    lapisLog('WAIT', `Connecting to ${LAPIS_ENV.DATABASE_NAME}`);
    
    try{
        await mongoose.connect(
            `mongodb://${LAPIS_ENV.DATABASE_HOST}/${LAPIS_ENV.DATABASE_NAME}`,
            {
                keepAlive:true
            }
        );
        lapisLog('SUCCESS', `Connection to ${LAPIS_ENV.DATABASE_NAME} successfully !`);
    }
    catch(e){
        lapisLog('ERROR', `Connection to ${LAPIS_ENV.DATABASE_NAME} failed !`);
    }
}