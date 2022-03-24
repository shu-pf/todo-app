import { mutate } from 'swr';

import { authenticatedFetcher } from '../../libs/fetchers';

interface ResponseData {
  message: string;
}

export const deleteCategory = async ({
  categoryId,
  token,
}: {
  categoryId: string;
  token: string;
}) => {
  await authenticatedFetcher<ResponseData>(`/api/categories/${categoryId}`, token, 'DELETE');

  mutate(['/api/categories', token]);
};
