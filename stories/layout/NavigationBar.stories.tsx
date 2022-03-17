import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Middleware, SWRConfig, SWRResponse } from 'swr';

import { NavigationBar } from '../../components/layout/NavigationBar';
import { categories, manyCategory } from '../../mocks/data';

const meta: ComponentMeta<typeof NavigationBar> = {
  component: NavigationBar,
};

export default meta;

const Template: ComponentStory<typeof NavigationBar> = (args) => <NavigationBar {...args} />;

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

const noCategoryMiddleware: Middleware = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (): SWRResponse<any, any> => {
    return {
      data: [],
      error: undefined,
      mutate: () => Promise.resolve(),
      isValidating: false,
    };
  };
};

const manyCategoryMiddleware: Middleware = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (): SWRResponse<any, any> => {
    return {
      data: manyCategory,
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

export const CategorySelected = Template.bind({});
CategorySelected.decorators = [
  (story) => <SWRConfig value={{ use: [successMiddleware] }}>{story()}</SWRConfig>,
];
CategorySelected.args = {
  currentCategoryId: 'oeijfeowijfwoeijk',
};

export const NoCategories = Template.bind({});
NoCategories.decorators = [
  (story) => <SWRConfig value={{ use: [noCategoryMiddleware] }}>{story()}</SWRConfig>,
];

export const ManyCategories = Template.bind({});
ManyCategories.decorators = [
  (story) => <SWRConfig value={{ use: [manyCategoryMiddleware] }}>{story()}</SWRConfig>,
];
