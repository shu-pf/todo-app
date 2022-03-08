import { getFetcher } from '../../libs/fetchers';

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
  const fetcher = getFetcher<ResponseData>();

  const requestData: RequestData = {
    email,
    password,
  };

  const responseData = await fetcher('/api/users', {
    method: 'POST',
    body: JSON.stringify(requestData),
  });

  return responseData;
};
