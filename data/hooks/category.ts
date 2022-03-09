import { useRecoilValue } from 'recoil';
import useSWR from 'swr';

import { userTokenState } from '../../states';
import { getAuthenticatedFetcher } from '../libs/fetchers';

interface Category {
  id: string;
  name: string;
}

export const useCategoryList = () => {
  const userToken = useRecoilValue(userTokenState);

  const { data, error } = useSWR(
    ['/api/categories', userToken],
    getAuthenticatedFetcher<Category[]>(userToken)
  );

  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
  };
};
