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

export const getFetcher = () => {
  return async (resource: string, init?: RequestInit) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_ORIGIN + resource, {
      headers: {
        'Content-Type': 'application/json',
      },
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
};

export const getAuthenticatedFetcher = (token: string) => {
  return async (resource: string, init?: RequestInit) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_ORIGIN + resource, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
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
};
