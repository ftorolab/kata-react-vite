import { useState } from 'react';
import AssignPcTable from '../components/computers/AssignPcTable';
import CrudFormAssignPc from '../components/computers/CrudFormAssignPc';
import {
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';


export default function AssignPcPage() {
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
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Gestión de Asignaciones Computadores</Typography>

      {/* Botón para nuevo usuario */}
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => { setSelected({}); setOpen(true); }}>
        Nueva Asignación
      </Button>

      {/* Tabla de usuarios */}
      <AssignPcTable key={refresh.toString()} table="asignaciones" onEdit={handleEdit} />

      {/* Modal para crear/editar */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selected?.id ? 'Editar Asignación' : 'Nueva Asignación'}</DialogTitle>
        <DialogContent>
          <CrudFormAssignPc table="asignaciones" initialData={selected} onSuccess={handleSuccess} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancelar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
