import React, { useState, useMemo } from 'react';

type Row = { id: number; name: string; email: string; role: string };

export type DataGridProps = {
  rows?: Row[];
  columns: Array<{ field: string; headerName: string; width?: number }>;
};

type SortKey = keyof Row;
type SortOrder = 'asc' | 'desc';

const DataGrid: React.FC<DataGridProps> = ({ rows = [], columns }) => {
  const [filter, setFilter] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const filteredRows = useMemo(() => {
    return rows.filter((row) =>
      row.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [rows, filter]);

  const sortedUsers = useMemo(() => {
    return [...filteredRows].sort((a, b) => {
      const aValue = String(a[sortKey]).toLowerCase();
      const bValue = String(b[sortKey]).toLowerCase();
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredRows, sortKey, sortOrder]);

  return (
    <div>
      <input
        type="text"
        placeholder="Filter users..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: 8, padding: 4, width: '100%' }}
      />
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => handleSort('name')}
            >
              Name {sortKey === 'name' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => handleSort('email')}
            >
              Email{' '}
              {sortKey === 'email' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => handleSort('role')}
            >
              Role {sortKey === 'role' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, idx) => (
            <tr key={idx}>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>
                {user.name}
              </td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>
                {user.email}
              </td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>
                {user.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;
