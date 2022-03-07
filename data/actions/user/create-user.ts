interface Params {
  email: string;
  password: string;
}

interface ResponseDataError {
  message: string;
}

interface ResponseData {
  email: string;
}

export const createUser = async ({ email, password }: Params) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_ORIGIN + '/api/users', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const data = (await response.json()) as ResponseDataError;
    throw Error(data.message);
  }

  const data = (await response.json()) as ResponseData;

  return data;
};
