import { CustomHttpException } from '../exceptions/customHttpException';

export const handleFailureResponse = (
  message: string,
  code: string,
  error: any = null,
) => {
  throw new CustomHttpException({
    message,
    code: code,
    ...(error ? { errors: error } : {}),
  });
};
