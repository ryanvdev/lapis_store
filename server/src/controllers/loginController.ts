import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
//import generateAccessToken from "../core/generateAccessToken";
import lapisLog from '../core/lapisLog';
import LAPIS_ENV from '../core/LAPIS_ENV';

class LoginController {
    public constructor() {}

    public index = async (req: Request, res: Response, next: NextFunction) => {
        res.status(200).send('Setup home controller successfully');
    };

    public login = async (req: Request, res: Response, next: NextFunction) => {
        const userName: string | undefined =
            req.query.username && (req.query.username as string);

        lapisLog('INFO', req.query);
        lapisLog('INFO', req.body);

        res.status(200).json(
            this.generateAccessToken({
                userName,
            }),
        );
    };

    private generateAccessToken = (payload: any) => {
        const accessToken: string = jwt.sign(payload, LAPIS_ENV.ACCESS_TOKEN_SECRET, {
            expiresIn: LAPIS_ENV.ACCESS_TOKEN_EXPIRE_IN,
        });

        const refreshToken: string = jwt.sign(payload, LAPIS_ENV.ACCESS_TOKEN_SECRET, {
            expiresIn: LAPIS_ENV.REFRESH_TOKEN_EXPIRE_IN,
        });

        return {
            accessToken,
            refreshToken,
        };
    };
}

const loginController: LoginController = new LoginController();
export default loginController;
