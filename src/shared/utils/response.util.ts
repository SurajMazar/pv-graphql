import { GraphQLError } from 'graphql/error';

export const handleFailureResponse = (
  message: string,
  code: string,
  data: any = null,
) => {
  throw new GraphQLError(message, {
    extensions: {
      code: code,
      ...(data ? { data: data } : {}),
    },
  });
};
