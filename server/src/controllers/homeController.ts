import { NextFunction, Request, Response } from 'express';

class HomeController {
    public constructor() {}

    public index = async (req: Request, res: Response, next: NextFunction) => {
        res.status(200).send('Setup home controller successfully');
    };
}

const homeController: HomeController = new HomeController();
export default homeController;
