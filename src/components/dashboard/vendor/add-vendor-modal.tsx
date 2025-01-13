'use client';

import * as React from 'react';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

import { Vendor } from './vendors-table';

export interface VendorFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  restaurantName: string;
  address: string;
  openTime: string;
  closeTime: string;
  businessDescription: string;
}

export interface AddVendorModalProps {
  open: boolean;
  onClose: () => void;
  onVendorAdded: (newVendor: Vendor) => void; // Use Vendor type here
}

export function AddVendorModal({ open, onClose, onVendorAdded }: AddVendorModalProps): React.JSX.Element {
  const [formData, setFormData] = React.useState<VendorFormData>({
    name: '',
    email: '',
    password: '',
    phone: '',
    restaurantName: '',
    address: '',
    openTime: '',
    closeTime: '',
    businessDescription: '',
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddVendor = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('https://foodlab-server.onrender.com/api/admin/addVendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add vendor.');
      }

      const newVendor: Vendor = await response.json();
      onVendorAdded(newVendor);
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Vendor</DialogTitle>
      <DialogContent>
        <TextField label="Name" name="name" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Email" name="email" type="email" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Phone" name="phone" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Restaurant Name" name="restaurantName" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Address" name="address" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Open Time" name="openTime" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Close Time" name="closeTime" fullWidth margin="normal" onChange={handleChange} />
        <TextField
          label="Business Description"
          name="businessDescription"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        {error && <Alert severity="error">{error}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleAddVendor} variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Add Vendor'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
