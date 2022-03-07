/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Select } from '../../../components/ui/input/Select';

const meta: ComponentMeta<typeof Select> = {
  component: Select,
  parameters: {
    viewport: {
      viewports: {
        custom: {
          name: 'custom',
          styles: {
            width: '600px',
            height: '200px',
          },
        },
      },
    },
  },
};

export default meta;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

const options = [
  {
    value: 'Work',
    key: 'feoijfwoijk',
  },
  {
    value: 'お買い物リスト',
    key: 'feoijfwkkfwk',
  },
];

const manyOptions = [
  {
    value: '選択肢1',
    key: 'feoijfwoijk',
  },
  {
    value: '選択肢2',
    key: 'feoijfwkkfwk',
  },
  {
    value: '選択肢3',
    key: 'woijoijgregr',
  },
  {
    value: '選択肢4',
    key: 'iejrglerngre',
  },
  {
    value: '選択肢5',
    key: 'wekjweijeoj',
  },
  {
    value: '選択肢6',
    key: 'hijrkmelrgke',
  },
];

export const Default = Template.bind({});
Default.args = {
  options,
  placeholder: '選択してください',
};

export const Selected = Template.bind({});
Selected.args = {
  options,
  value: 'Work',
};

export const ManyItems = Template.bind({});
ManyItems.args = {
  options: manyOptions,
};
ManyItems.parameters = {
  viewport: {
    defaultViewport: 'custom',
  },
};

export const AtTheBottom = Template.bind({});
AtTheBottom.args = {
  options,
};
AtTheBottom.parameters = {
  viewport: {
    defaultViewport: 'custom',
  },
};
AtTheBottom.decorators = [
  (Story) => (
    <div
      css={css`
        height: 100vh;
        display: flex;
        align-items: flex-end;
      `}
    >
      <Story />
    </div>
  ),
];

export const AtTheBottomManyItems = Template.bind({});
AtTheBottomManyItems.args = {
  options: manyOptions,
};
AtTheBottomManyItems.parameters = {
  viewport: {
    defaultViewport: 'custom',
  },
};
AtTheBottomManyItems.decorators = [
  (Story) => (
    <div
      css={css`
        height: 100vh;
        display: flex;
        align-items: flex-end;
      `}
    >
      <Story />
    </div>
  ),
];

export const AtTheCenter = Template.bind({});
AtTheCenter.args = {
  options: manyOptions,
};
AtTheCenter.parameters = {
  viewport: {
    defaultViewport: 'custom',
  },
};
AtTheCenter.decorators = [
  (Story) => (
    <div
      css={css`
        height: 100vh;
        display: flex;
        align-items: center;
      `}
    >
      <Story />
    </div>
  ),
];
