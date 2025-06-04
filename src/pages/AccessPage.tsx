import { useState } from 'react';
import AccessAppTable from '../components/accessApp/AccessAppTable';
import CrudFormAccessApp from '../components/accessApp/CrudFormAccessApp';
import {
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';


export default function AccessPage() {
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
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Gestión de Accesos</Typography>

      {/* Botón para nuevo usuario */}
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => { setSelected({}); setOpen(true); }}>
        Nuevo Acceso
      </Button>

      {/* Tabla de usuarios */}
      <AccessAppTable key={refresh.toString()} table="solicitudes_accesos" onEdit={handleEdit} />

      {/* Modal para crear/editar */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selected?.id ? 'Editar Acceso' : 'Nuevo Acceso'}</DialogTitle>
        <DialogContent>
          <CrudFormAccessApp table="solicitudes_acceso" initialData={selected} onSuccess={handleSuccess} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancelar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
