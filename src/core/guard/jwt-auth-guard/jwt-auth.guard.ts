import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtAuthService } from '../../jwt/jwt.service';
import { CustomHttpException } from '../../exceptions/customHttpException';
import { UNAUTHORIZED } from '../../constants/status.codes';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtAuthService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const authHeader = req.headers.authorization || '';
    if (!authHeader) {
      throw new CustomHttpException({
        message: 'No authorization header provided',
        code: UNAUTHORIZED,
      });
    }
    try {
      const token = authHeader.replace('Bearer ', '');
      req.user = await this.jwtService.verifyToken(token);
      return true;
    } catch (err) {
      throw new CustomHttpException({
        message: 'Invalid token or session expired.',
        code: UNAUTHORIZED,
      });
    }
  }
}
