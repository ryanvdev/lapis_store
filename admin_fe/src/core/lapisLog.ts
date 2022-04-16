type TLogType = 'INFO' | 'ERROR' | 'SUCCESS' | 'WAITTING' | 'WARNING';


function lapisLog(logType: TLogType, ...message:any){
    console.group(`${logType}_${lapisLog.caller.name}`);
    console.log(...message);
    console.groupEnd();
}

export default lapisLog;