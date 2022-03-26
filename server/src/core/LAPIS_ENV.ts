class LAPIS_ENV{
    public static readonly PORT:number = process.env.PORT ? parseInt(process.env.PORT) : 8080;
    public static readonly DATABASE_HOST:string = process.env.DATABASE_HOST || '127.0.0.1:27017';
    public static readonly DATABASE_NAME:string = process.env.DATABASE_NAME || 'default_database';
}

export default LAPIS_ENV;