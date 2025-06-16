import { Meta, StoryObj } from '@storybook/react';
import DataGrid from './index';
import type { DataGridProps, Column } from './index';

type SampleRow = {
  id: number;
  name: string;
  age: number;
  role: string;
};

const sampleData: SampleRow[] = [
  { id: 1, name: 'Alice', age: 30, role: 'Developer' },
  { id: 2, name: 'Bob', age: 25, role: 'Designer' },
  { id: 3, name: 'Charlie', age: 35, role: 'Manager' },
  { id: 4, name: 'Diana', age: 28, role: 'Developer' },
];

const columns: Column<SampleRow>[] = [
  {
    key: 'id',
    label: 'ID', // UI text should use i18n in the DataGrid implementation
    sortable: true,
    filterable: true,
  },
  {
    key: 'name',
    label: 'Name', // UI text should use i18n in the DataGrid implementation
    sortable: true,
    filterable: true,
  },
  {
    key: 'age',
    label: 'Age', // UI text should use i18n in the DataGrid implementation
    sortable: true,
    filterable: true,
  },
  {
    key: 'role',
    label: 'Role', // UI text should use i18n in the DataGrid implementation
    sortable: true,
    filterable: true,
  },
];

const meta: Meta<DataGridProps<SampleRow>> = {
  title: 'Components/DataGrid',
  component: DataGrid,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<DataGridProps<SampleRow>>;

export const Default: Story = {
  args: {
    columns,
    data: sampleData,
    // If your DataGrid requires additional props for sorting/filtering, add them here
  },
};
