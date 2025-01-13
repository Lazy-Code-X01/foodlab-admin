'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

interface VendorsFiltersProps {
  onSearchChange: (search: string) => void;
}

export function VendorsFilters({ onSearchChange }: VendorsFiltersProps): React.JSX.Element {
  const [search, setSearch] = React.useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    onSearchChange(value); // Pass the search input to the parent
  };

  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        value={search}
        fullWidth
        placeholder="Search vendor"
        onChange={handleSearchChange}
        startAdornment={
          <InputAdornment position="start">
            <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
          </InputAdornment>
        }
        sx={{ maxWidth: '500px' }}
      />
    </Card>
  );
}
