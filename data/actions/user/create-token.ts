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
  const fetcher = getFetcher<ResponseData>();

  const requestData: RequestData = {
    email,
    password,
  };

  const responseData = await fetcher('/api/users/login', {
    method: 'POST',
    body: JSON.stringify(requestData),
  });

  return responseData;
};
