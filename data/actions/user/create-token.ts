import { fetcher } from '../../libs/fetchers';

interface Params {
  email: string;
  password: string;
}

interface RequestData {
  email: string;
  password: string;
}
interface ResponseData {
  token: string;
}

export const createToken = async ({ email, password }: Params) => {
  const responseData = await fetcher<ResponseData, RequestData>('/api/users/login', 'POST', {
    email,
    password,
  });

  return responseData;
};
