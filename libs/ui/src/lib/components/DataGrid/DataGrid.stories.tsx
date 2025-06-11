import { Meta, StoryObj } from '@storybook/react';
import DataGrid from './index';
import type { DataGridProps } from './index';

const sampleData = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
  { id: 3, name: 'Charlie Lee', email: 'charlie@example.com', role: 'Editor' },
];

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'email', headerName: 'Email', width: 220 },
  { field: 'role', headerName: 'Role', width: 120 },
];

const meta: Meta<DataGridProps> = {
  title: 'Components/DataGrid',
  component: DataGrid,
  args: {
    rows: sampleData,
    columns,
  },
};

export default meta;

type Story = StoryObj<DataGridProps>;

export const Default: Story = {};
