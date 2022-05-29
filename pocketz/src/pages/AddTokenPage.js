import { Box, Card } from '@mui/material';
import React from 'react'
import AddTokenForm from '../components/Service/AddTokenForm';
import AppHeader from '../components/AppHeader';

function AddTokenPage() {
  return (
    <Card>
      <AppHeader />
      <AddTokenForm />
    </Card>
  );
}

export default AddTokenPage;