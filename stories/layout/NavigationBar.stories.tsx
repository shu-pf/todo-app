import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NavigationBar } from '../../components/layout/NavigationBar';
import { rest } from 'msw';
import { useSWRConfig } from 'swr';

const meta: ComponentMeta<typeof NavigationBar> = {
  title: 'component/layout/NavigationBar',
  component: NavigationBar,
  decorators: [
    (story) => {
      const { mutate } = useSWRConfig();
      mutate('/api/categories');

      return story();
    },
  ],
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

const manyCategories = [
  ...categories,
  { id: 'awpfwkafewlk', name: 'その他' },
  { id: 'fefefewfewaf', name: 'その他' },
  { id: 'thegrgragrgr', name: 'その他' },
  { id: 'bebebbgbtrte', name: 'その他' },
  { id: 'ebtbgbrbrtbr', name: 'その他' },
  { id: 'oijkmpokekll', name: 'その他' },
  { id: 'pkmjwemrkmkw', name: 'その他' },
];

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.get('/api/categories', (_, res, ctx) => {
        return res(ctx.json(categories));
      }),
    ],
  },
};

export const CategorySelected = Template.bind({});
CategorySelected.parameters = {
  msw: {
    handlers: [
      rest.get('/api/categories', (_, res, ctx) => {
        return res(ctx.json(categories));
      }),
    ],
  },
};
CategorySelected.args = {
  currentCategoryId: 'oeijfeowijfwoeijk',
};

export const NoCategories = Template.bind({});
NoCategories.parameters = {
  msw: {
    handlers: [
      rest.get('/api/categories', (_, res, ctx) => {
        return res(ctx.json([]));
      }),
    ],
  },
};

export const ManyCategories = Template.bind({});
ManyCategories.parameters = {
  msw: {
    handlers: [
      rest.get('/api/categories', (_, res, ctx) => {
        return res(ctx.json(manyCategories));
      }),
    ],
  },
};
