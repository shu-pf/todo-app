interface Params {
  token: string;
  task: {
    title: string;
    checked: string;
    category: string;
    limit: string;
    detail: string;
  };
}

interface ResponseDataError {
  message: string;
}

interface ResponseData {
  id: string;
  title: string;
  category: string;
  limit: string;
  detail: string;
  created_at: string;
}

export const createUser = async ({ token, task }: Params) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_ORIGIN + '/api/tasks', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      title: JSON.stringify({ title: task.title, checked: task.checked }),
      category: task.category,
      limit: task.limit,
      detail: task.detail,
    }),
  });

  if (!response.ok) {
    const data = (await response.json()) as ResponseDataError;
    throw Error(data.message);
  }

  const responseData = (await response.json()) as ResponseData;

  const { title, checked }: { title: string; checked: boolean } = JSON.parse(responseData.title);

  return {
    id: responseData.id,
    title,
    checked,
    category: responseData.category,
    limit: responseData.limit,
    detail: responseData.detail,
    created_at: responseData.created_at,
  };
};
