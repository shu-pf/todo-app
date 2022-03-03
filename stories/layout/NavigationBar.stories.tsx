import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NavigationBar } from '../../components/layout/NavigationBar';
import { Middleware, SWRConfig, SWRResponse } from 'swr';

const meta: ComponentMeta<typeof NavigationBar> = {
  title: 'component/layout/NavigationBar',
  component: NavigationBar,
};

export default meta;

const Template: ComponentStory<typeof NavigationBar> = (args) => <NavigationBar {...args} />;

const categories = [
  {
    id: 'oeijfeowijfwoeijk',
    name: 'Work',
  },
  {
    id: 'feoijfeifjeoifjk',
    name: 'お買物リスト',
  },
  {
    id: 'feoijfeoijfeoifj',
    name: '買いたい',
  },
  {
    id: 'fwoefjwlekffewogn',
    name: 'House',
  },
  {
    id: 'rigjrokanklrkwgnk',
    name: 'その他',
  },
];

const manyCategory = [
  ...categories,
  { id: 'awpfwkafewlk', name: 'その他' },
  { id: 'fefefewfewaf', name: 'その他' },
  { id: 'thegrgragrgr', name: 'その他' },
  { id: 'bebebbgbtrte', name: 'その他' },
  { id: 'ebtbgbrbrtbr', name: 'その他' },
  { id: 'oijkmpokekll', name: 'その他' },
  { id: 'pkmjwemrkmkw', name: 'その他' },
];

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
