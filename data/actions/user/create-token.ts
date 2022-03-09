import { getFetcher } from '../../libs/fetchers';

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
  const fetcher = getFetcher<RequestData, ResponseData>();

  const responseData = await fetcher('/api/users/login', 'POST', {
    email,
    password,
  });

  return responseData;
};
