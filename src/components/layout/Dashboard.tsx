import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Topbar />
        <Box component="main" sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
