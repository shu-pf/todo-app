import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Middleware, SWRResponse, SWRConfig } from 'swr';

import { CategoryList } from '../../../components/layout/NavigationBar/CategoryList';
import { categories } from '../../../mocks/data';

const meta: ComponentMeta<typeof CategoryList> = {
  component: CategoryList,
  parameters: {
    backgrounds: {
      default: 'pink',
      values: [{ name: 'pink', value: '#FF5470' }],
    },
  },
};

export default meta;

const Template: ComponentStory<typeof CategoryList> = (args) => <CategoryList {...args} />;

const successMiddleware: Middleware = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (): SWRResponse<any, any> => {
    return {
      data: categories,
      error: undefined,
      mutate: () => Promise.resolve(),
      isValidating: false,
    };
  };
};

const loadingMiddleware: Middleware = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (): SWRResponse<any, any> => {
    return {
      data: undefined,
      error: undefined,
      mutate: () => Promise.resolve(),
      isValidating: false,
    };
  };
};

export const Default = Template.bind({});
Default.decorators = [
  (story) => <SWRConfig value={{ use: [successMiddleware] }}>{story()}</SWRConfig>,
];

export const Loading = Template.bind({});
Loading.decorators = [
  (story) => <SWRConfig value={{ use: [loadingMiddleware] }}>{story()}</SWRConfig>,
];
