import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: () => void) {

    const {method, originalUrl} = req;
    const startTime = Date.now();

    //Next middleware
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const user = (req as any).user;
      const userId = user ? user.id || user.userId : 'Guest';

      this.logger.log(`[${method}] ${originalUrl} | User: ${userId} | ${res.statusCode} - ${duration}ms`);
    });

    next();
  }
}
