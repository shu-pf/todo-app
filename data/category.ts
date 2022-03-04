import useSWR from 'swr';

interface Category {
  id: string;
  name: string;
}

export const useCategoryList = () => {
  const { data, error } = useSWR<Category[]>('/api/categories');

  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
  };
};
