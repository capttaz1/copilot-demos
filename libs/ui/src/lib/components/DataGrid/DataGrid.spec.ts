import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataGrid from './index';

describe('DataGrid', () => {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
  ];
  const data = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  it('renders table headers', () => {
    render(React.createElement(DataGrid, { columns, data }));
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it('renders table rows', () => {
    render(React.createElement(DataGrid, { columns, data }));
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    render(React.createElement(DataGrid, { columns, data: [] }));
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });

  it('calls onRowClick when a row is clicked', () => {
    const onRowClick = jest.fn();
    render(React.createElement(DataGrid, { columns, data, onRowClick }));
    fireEvent.click(screen.getByText('Alice'));
    expect(onRowClick).toHaveBeenCalledWith(data[0]);
  });
  it('renders custom cell content using render prop', () => {
    interface CustomColumn {
      key: string;
      label: string;
      render?: (value: any) => React.ReactNode;
    }

    const customColumns: CustomColumn[] = [
      { key: 'id', label: 'ID' },
      {
        key: 'name',
        label: 'Name',
        render: (value: string) => React.createElement('strong', null, value),
      },
    ];
    render(React.createElement(DataGrid, { columns: customColumns, data }));
    expect(screen.getByText('Alice').tagName).toBe('STRONG');
  });
});
