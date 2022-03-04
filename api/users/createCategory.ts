interface Params {
  name: string;
  token: string;
}

interface ResponseDataError {
  message: string;
}

interface ResponseData {
  id: string;
  name: string;
}

export const createCategory = async ({ name, token }: Params) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_ORIGIN + '/api/categories', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const data = (await response.json()) as ResponseDataError;
    throw Error(data.message);
  }

  const data = (await response.json()) as ResponseData;

  return data;
};
