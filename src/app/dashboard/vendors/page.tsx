'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { AddVendorModal, VendorFormData } from '@/components/dashboard/vendor/add-vendor-modal';
import { VendorsFilters } from '@/components/dashboard/vendor/vendors-filters';
import { VendorsTable } from '@/components/dashboard/vendor/vendors-table';
import type { Vendor } from '@/components/dashboard/vendor/vendors-table';

export default function Page(): React.JSX.Element {
  const [vendors, setVendors] = React.useState<Vendor[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isAddVendorModalOpen, setIsAddVendorModalOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Open/Close Modal
  const openAddVendorModal = () => setIsAddVendorModalOpen(true);
  const closeAddVendorModal = () => setIsAddVendorModalOpen(false);

  // Fetch Vendors
  const fetchVendors = React.useCallback(async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch('http://localhost:5000/api/admin/getVendors', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data: Vendor[] = await response.json();
        setVendors(data);
      } else {
        console.error('Failed to fetch vendors');
      }
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  }, []);

  // Fetch Vendors on Initial Render
  React.useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  // Add Vendor Handler
  const handleVendorAdded = () => {
    closeAddVendorModal();
    fetchVendors(); // Re-fetch the vendors to ensure the table is up-to-date
  };

  // Search Filter
  const filteredVendors = React.useMemo(() => {
    if (!searchQuery) return vendors;
    const lowerQuery = searchQuery.toLowerCase();
    return vendors.filter(
      (vendor) =>
        vendor.name.toLowerCase().includes(lowerQuery) ||
        vendor.email.toLowerCase().includes(lowerQuery) ||
        vendor.phone.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery, vendors]);

  // Pagination
  const paginatedVendors = filteredVendors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">Vendors</Typography>
        <Button startIcon={<PlusIcon />} variant="contained" onClick={openAddVendorModal}>
          Add Vendor
        </Button>
      </Stack>
      <VendorsFilters onSearchChange={setSearchQuery} />
      {filteredVendors.length === 0 && searchQuery ? (
        <Typography variant="h6" align="center">
          No vendors found
        </Typography>
      ) : (
        <VendorsTable
          count={filteredVendors.length}
          rows={paginatedVendors}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      )}
      <AddVendorModal open={isAddVendorModalOpen} onClose={closeAddVendorModal} onVendorAdded={handleVendorAdded} />
    </Stack>
  );
}
