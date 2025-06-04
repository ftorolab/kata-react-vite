import { useState } from 'react';
import UserTable from '../components/users/UserTable';
import CrudFormUsers from '../components/users/CrudFormUsers';
import {
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';


export default function UsuariosPage() {
  const [selected, setSelected] = useState<any>(null);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);

  const handleEdit = (row: any) => {
    setSelected(row);
    setOpen(true);
  };

  const handleSuccess = () => {
    setSelected(null);
    setOpen(false);
    setRefresh(!refresh);
  };

  const handleClose = () => {
    setSelected(null);
    setOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Gestión de Usuarios</Typography>

      {/* Botón para nuevo usuario */}
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => { setSelected({}); setOpen(true); }}>
        Nuevo Usuario
      </Button>

      {/* Tabla de usuarios */}
      <UserTable key={refresh.toString()} table="solicitudes_usuarios" onEdit={handleEdit} />

      {/* Modal para crear/editar */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selected?.id ? 'Editar Usuario' : 'Nuevo Usuario'}</DialogTitle>
        <DialogContent>
          <CrudFormUsers table="solicitudes_usuarios" initialData={selected} onSuccess={handleSuccess} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancelar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
