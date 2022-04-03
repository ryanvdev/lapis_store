class LAPIS_ENV {
    public static readonly IS_DEV: boolean =
        (process.env.NODE_ENV && process.env.NODE_ENV === 'development') || false;
    public static readonly PORT: number = process.env.PORT
        ? parseInt(process.env.PORT)
        : 8080;
    //
    // DATABASE
    public static readonly DATABASE_HOST: string =
        process.env.DATABASE_HOST || '127.0.0.1:27017';
    public static readonly DATABASE_NAME: string = process.env.DATABASE_NAME || 'default';
    //
    // TOKEN
    public static readonly ACCESS_TOKEN_SECRET: string =
        process.env.ACCESS_TOKEN_SECRET || 'default';
    public static readonly REFRESH_TOKEN_SECRET: string =
        process.env.REFRESH_TOKEN_SECRET || 'default';
    // TIME EXPIRE TOKEN
    public static readonly ACCESS_TOKEN_EXPIRE_IN: string =
        process.env.ACCESS_TOKEN_EXPIRE_IN || '15m';
    public static readonly REFRESH_TOKEN_EXPIRE_IN: string =
        process.env.REFRESH_TOKEN_EXPIRE_IN || '15m';
}

export default LAPIS_ENV;
