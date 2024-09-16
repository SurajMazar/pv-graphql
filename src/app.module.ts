import { Module, ValidationPipe } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { GqlExceptionFilter } from './core/filters/gql-exception-filter/gql-exception.filter';
import { VALIDATION_FAILED } from './core/constants/status.codes';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
    }),
    UserModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        exceptionFactory: (errors) => {
          return {
            message: 'Validation failed',
            code: VALIDATION_FAILED,
            errors: errors.reduce((acc, err) => {
              acc[err.property] = Object.values(err.constraints);
              return acc;
            }, {}),
          };
        },
      }),
    },
    {
      provide: APP_FILTER,
      useClass: GqlExceptionFilter,
    },
  ],
})
export class AppModule {}
