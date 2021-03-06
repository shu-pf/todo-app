import { fetcher } from '../../libs/fetchers';

interface Params {
  email: string;
  password: string;
}

interface ResponseData {
  email: string;
}

interface RequestData {
  email: string;
  password: string;
}

export const createUser = async ({ email, password }: Params) => {
  const responseData = await fetcher<ResponseData, RequestData>('/api/users', 'POST', {
    email,
    password,
  });

  return responseData;
};
