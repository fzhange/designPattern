import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Example/Button',
  component: Button,
  // tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    // Assigns the argTypes to the Colors category
    backgroundColor: {
      control: 'color',
      table: {
        category: 'Colors',
      },
    },
    primary: {
      table: {
        category: 'Colors',
      },
    },
    // Assigns the argType to the Text category
    label: {
      table: {
        category: 'Text',
      },
    },
    // Assigns the argType to the Events category
    onClick: {
      table: {
        category: 'Events',
      },
    },
    // Assigns the argType to the Sizes category
    size: {
      table: {
        category: 'Sizes',
      },
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary = {
  args: {
    label: 'Button',
  },
};

export const Large = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small = {
  args: {
    size: 'small',
    label: 'Button',
  },
};
