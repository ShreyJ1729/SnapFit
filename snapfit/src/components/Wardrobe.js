import './Wardrobe.css';
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export function Wardrobe() {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip label="Shirts" variant="outlined" onClick={handleClick} />
      <Chip label="Pants/Shorts" variant="outlined" onClick={handleClick} />
      <Chip label="Shoes" variant="outlined" onClick={handleClick} />
    </Stack>
  );
}


