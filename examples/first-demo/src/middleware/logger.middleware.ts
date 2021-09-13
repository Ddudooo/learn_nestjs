import {Injectable, NestMiddleware} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req : Request, res: Response, next: NextFunction) {
        console.log(`Request...`);
        //console.log(req);
        console.log(req.headers);
        console.log(req.params);
        console.log(req.body);

        console.log(`Response...`);
        console.log(res);
        console.log(req.headers);
        console.log(res.status);
        next();
    }
}