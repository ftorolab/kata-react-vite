import { useState } from 'react';
import CrudTable from '../components/CrudTable';
import CrudForm from '../components/CrudForm';
import {
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';


export default function EstadosPage() {
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
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Gestión de Estados</Typography>

      {/* Botón para nuevo usuario */}
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => { setSelected({}); setOpen(true); }}>
        Nueva Estado
      </Button>

      {/* Tabla de usuarios */}
      <CrudTable key={refresh.toString()} table="estados_creacion_usuario" onEdit={handleEdit} />

      {/* Modal para crear/editar */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selected?.id ? 'Editar Estadoa' : 'Nuevo Estado'}</DialogTitle>
        <DialogContent>
          <CrudForm table="estados_creacion_usuario" initialData={selected} onSuccess={handleSuccess} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancelar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
