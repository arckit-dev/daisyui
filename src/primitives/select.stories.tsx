import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Select, type SelectProps } from './select';

const meta = {
  title: 'Libraries/UI/Primitives/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Select component for dropdown selection. Supports semantic colors and multiple sizes.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'select-accent',
        'select-error',
        'select-info',
        'select-neutral',
        'select-primary',
        'select-secondary',
        'select-success',
        'select-warning'
      ],
      description: 'Semantic color of the select',
      table: {
        category: 'Appearance',
        type: { summary: 'Color' }
      }
    },
    scale: {
      control: 'select',
      options: ['select-lg', 'select-md', 'select-sm', 'select-xl', 'select-xs'],
      description: 'Size of the select',
      table: {
        category: 'Appearance',
        type: { summary: 'Scale' }
      }
    },
    kind: {
      control: 'select',
      options: ['select-ghost'],
      description: 'Visual variant',
      table: {
        category: 'Appearance',
        type: { summary: 'Kind' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        category: 'State',
        type: { summary: 'boolean' }
      }
    }
  },
  render: (args) => (
    <Select {...args}>
      <option disabled value=''>
        Pick one
      </option>
      <option>Option A</option>
      <option>Option B</option>
      <option>Option C</option>
    </Select>
  )
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {};

// =============================================================================
// Colors
// =============================================================================

export const Accent: Story = {
  args: { color: 'select-accent' }
};

export const SelectError: Story = {
  args: { color: 'select-error' },
  parameters: {
    docs: {
      description: { story: 'Error color for validation failures.' }
    }
  }
};

export const Info: Story = {
  args: { color: 'select-info' }
};

export const Neutral: Story = {
  args: { color: 'select-neutral' }
};

export const Primary: Story = {
  args: { color: 'select-primary' }
};

export const Secondary: Story = {
  args: { color: 'select-secondary' }
};

export const Success: Story = {
  args: { color: 'select-success' }
};

export const Warning: Story = {
  args: { color: 'select-warning' }
};

export const AllColors: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      {(
        [
          'select-accent',
          'select-error',
          'select-info',
          'select-neutral',
          'select-primary',
          'select-secondary',
          'select-success',
          'select-warning'
        ] as const
      ).map((color) => (
        <Select key={color} color={color} defaultValue='Option A'>
          <option>Option A</option>
          <option>Option B</option>
        </Select>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of all available colors.' }
    }
  }
};

// =============================================================================
// Scales
// =============================================================================

export const ExtraLarge: Story = { args: { scale: 'select-xl' } };
export const Large: Story = { args: { scale: 'select-lg' } };
export const Medium: Story = { args: { scale: 'select-md' } };
export const Small: Story = { args: { scale: 'select-sm' } };
export const ExtraSmall: Story = { args: { scale: 'select-xs' } };

export const AllScales: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      {(['select-xl', 'select-lg', 'select-md', 'select-sm', 'select-xs'] as const).map((scale) => (
        <Select key={scale} scale={scale} defaultValue='Option A'>
          <option>Option A</option>
          <option>Option B</option>
        </Select>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of all available sizes.' }
    }
  }
};

// =============================================================================
// States
// =============================================================================

export const Disabled: Story = {
  args: { disabled: true }
};

export const Ghost: Story = {
  args: { kind: 'select-ghost' }
};

// =============================================================================
// Complete Matrix
// =============================================================================

const colors: Array<SelectProps['color']> = [
  'select-accent',
  undefined,
  'select-error',
  'select-info',
  'select-neutral',
  'select-primary',
  'select-secondary',
  'select-success',
  'select-warning'
];
const scales: Array<SelectProps['scale']> = [undefined, 'select-lg', 'select-md', 'select-sm', 'select-xs'];

export const Matrix: Story = {
  render: () => (
    <div className='flex flex-col gap-6'>
      {scales.map((scale) => (
        <div key={scale ?? 'default-scale'}>
          <h3 className='mb-2 font-semibold'>{scale ?? 'Default'}</h3>
          <div className='flex flex-col gap-2'>
            {colors.map((color) => (
              <Select
                key={color ?? 'default-color'}
                defaultValue='Option A'
                {...(scale ? { scale } : {})}
                {...(color ? { color } : {})}
              >
                <option>Option A</option>
                <option>Option B</option>
              </Select>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Complete matrix of all scale x color combinations.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const SelectTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');

    await expect(select).toBeVisible();

    await userEvent.selectOptions(select, 'Option B');
    await expect(select).toHaveValue('Option B');
  },
  parameters: {
    docs: {
      description: { story: 'Verifies select can change value.' }
    }
  }
};

export const DisabledTest: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');

    await expect(select).toBeDisabled();
  },
  parameters: {
    docs: {
      description: { story: 'Verifies disabled state.' }
    }
  }
};
