export class HttpError extends Error {
  data: { error: string };
  status: number;
  constructor({
    message,
    data,
    status,
  }: {
    message: string;
    data: { error: string };
    status: number;
  }) {
    super(message);
    this.data = data;
    this.status = status;
  }
}

export const fetcher = async <ResponseData, RequestData = undefined>(
  resource: string,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  data?: RequestData,
  init?: RequestInit
): Promise<ResponseData> => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_ORIGIN + resource, {
    headers: {
      'Content-Type': 'application/json',
    },
    method,
    body: JSON.stringify(data),
    ...init,
  });

  if (!res.ok) {
    try {
      throw new HttpError({
        message: '通信中にエラーが発生しました。',
        data: await res.json(),
        status: res.status,
      });
    } catch (e) {
      if (e instanceof SyntaxError) {
        throw new HttpError({
          message: '通信中にエラーが発生しました。',
          data: {
            error: 'Response is not JSON',
          },
          status: res.status,
        });
      }
      throw e;
    }
  }

  return res.json();
};

export const authenticatedFetcher = async <ResponseData, RequestData = undefined>(
  resource: string,
  token: string,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  data?: RequestData,
  init?: RequestInit
): Promise<ResponseData> => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_ORIGIN + resource, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    method,
    body: JSON.stringify(data),
    ...init,
  });

  if (!res.ok) {
    try {
      throw new HttpError({
        message: '通信中にエラーが発生しました。',
        data: await res.json(),
        status: res.status,
      });
    } catch (e) {
      if (e instanceof SyntaxError) {
        throw new HttpError({
          message: '通信中にエラーが発生しました。',
          data: {
            error: 'Response is not JSON',
          },
          status: res.status,
        });
      }
      throw e;
    }
  }

  return res.json();
};
