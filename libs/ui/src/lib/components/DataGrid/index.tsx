import React, { useState, useMemo } from 'react';

export type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
};

export type DataGridProps<T> = {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
};

function DataGrid<T extends Record<string, unknown>>({
  data,
  columns,
}: DataGridProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const handleFilterChange = (key: keyof T, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.every((col) => {
        if (!col.filterable || !filters[col.key as string]) return true;
        const cellValue = String(row[col.key] ?? '').toLowerCase();
        return cellValue.includes(filters[col.key as string].toLowerCase());
      })
    );
  }, [data, columns, filters]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (aValue === bValue) return 0;
      if (aValue == null) return sortAsc ? -1 : 1;
      if (bValue == null) return sortAsc ? 1 : -1;
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortAsc ? aValue - bValue : bValue - aValue;
      }
      return sortAsc
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [filteredData, sortKey, sortAsc]);

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              style={{
                border: '1px solid #ccc',
                padding: '8px',
                cursor: col.sortable ? 'pointer' : 'default',
              }}
              onClick={col.sortable ? () => handleSort(col.key) : undefined}
            >
              {col.label}
              {col.sortable && sortKey === col.key && (sortAsc ? ' ▲' : ' ▼')}
              {col.filterable && (
                <div>
                  <input
                    type="text"
                    value={filters[col.key as string] || ''}
                    onChange={(e) =>
                      handleFilterChange(col.key, e.target.value)
                    }
                    placeholder="Filter"
                    style={{ width: '90%' }}
                  />
                </div>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length}
              style={{ textAlign: 'center', padding: '16px' }}
            >
              No data
            </td>
          </tr>
        ) : (
          sortedData.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  style={{ border: '1px solid #ccc', padding: '8px' }}
                >
                  {col.render
                    ? col.render(row[col.key], row)
                    : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default DataGrid;
