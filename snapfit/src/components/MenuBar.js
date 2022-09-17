import "./MenuBar.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import {Route, Link, Routes, Navigate} from 'react-router-dom';

export function MenuBar() {
  const route = window.location.route;
  const [value, setValue] = React.useState(route);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id="container">
      <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction value='/wardrobe' label="My Wardrobe" icon={<CheckroomIcon />} component={Link} to='/wardrobe'/>
        <BottomNavigationAction value='/camera' label="Camera" icon={<CameraAltIcon />} component={Link} to='/camera'/>
        <BottomNavigationAction value='/fits' label="My Fits" icon={<SettingsAccessibilityIcon />} component={Link} to='/fits'/>
      </BottomNavigation>
      </Box>

      <Routes>
        <Route path="/" element={<Navigate to="/camera" />} />
      </Routes>
    </div>
  );
}
