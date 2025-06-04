import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Topbar() {
  return (
    <AppBar position="static" sx={{ ml: 30 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Panel de Administración
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
