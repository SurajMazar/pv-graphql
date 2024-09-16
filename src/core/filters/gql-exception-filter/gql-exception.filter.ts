import { Catch, ExceptionFilter } from '@nestjs/common';
import { ApolloError } from 'apollo-server-errors';
import { CustomHttpException } from '../../exceptions/customHttpException';

@Catch()
export class GqlExceptionFilter implements ExceptionFilter {
  catch(exception: CustomHttpException) {
    return new ApolloError(exception?.message, exception?.code, {
      ...(exception?.errors ? { errors: exception?.errors } : {}),
      // ...(process.env.NODE_ENV !== 'production'
      //   ? { exception: exception }
      //   : {}),
    });
  }
}
