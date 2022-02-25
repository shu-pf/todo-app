import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NavigationBar } from '../../components/layout/NavigationBar';

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
Default.args = {
  categories,
};

export const CategorySelected = Template.bind({});
CategorySelected.args = {
  categories,
  currentCategoryId: 'oeijfeowijfwoeijk',
};

export const NoCategories = Template.bind({});
NoCategories.args = {};

export const ManyCategories = Template.bind({});
ManyCategories.args = {
  categories: manyCategories,
};