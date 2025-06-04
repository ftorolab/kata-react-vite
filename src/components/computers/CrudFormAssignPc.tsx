import { useState, useEffect } from 'react';
import {
  TextField, Button, Box, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import {api} from '../../services/api';

interface Props {
  table: string;
  initialData?: any;
  onSuccess: () => void;
}

export default function CrudFormAssignPc({ table, initialData, onSuccess }: Props) {
  const [formData, setFormData] = useState<any>({
    usuario_id: '',
    equipo_id: '',
    fecha_entrega: ''
  });

  const [usuarios, setUsuarios] = useState([]);
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [a, r,] = await Promise.all([
          api.getAll('solicitudes_usuarios'),
          api.getAll('equipos'),
        ]);
        setUsuarios(a.data);
        setEquipos(r.data.filter((equipo: any) => equipo.disponible === 1));
      } catch (error) {
        console.error('Error cargando datos de listas', error);
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name!]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id) {
        const { usuario_id, equipo_id, fecha_entrega } = formData;
        const dataToSend = { usuario_id, equipo_id, fecha_entrega };
        await api.update(table,formData.id, dataToSend);
    } else {
      await api.create(table, formData);
      await api.update('equipos',formData.equipo_id, {disponible: false});
    }
    onSuccess();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
      <TextField
        name="fecha_entrega"
        type="date"
        value={formData.fecha_entrega}
        onChange={handleChange}
        fullWidth
        required
      />

      <FormControl fullWidth>
        <InputLabel>Usuario</InputLabel>
        <Select name="usuario_id" value={formData.usuario_id} label="Usuario" onChange={handleChange}>
          {usuarios.map((usuario: any) => (
            <MenuItem key={usuario.id} value={usuario.id}>{usuario.nombre}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Equipo</InputLabel>
        <Select name="equipo_id" value={formData.equipo_id} label="Equipo" onChange={handleChange}>
            {formData.id ? (
            <MenuItem key={formData.equipo_id} value={formData.equipo_id}>
              {`${formData.equipo} - ${formData.numero_serie}`}
            </MenuItem>
            ):
            (equipos.map((equipo: any) => (
            <MenuItem key={equipo.id} value={equipo.id}>
              {`${equipo.nombre_equipo} - ${equipo.numero_serie}`}
            </MenuItem>
            )))
            }
        </Select>
      </FormControl>
      

      <Button type="submit" variant="contained">
        {formData.id ? 'Actualizar' : 'Asignar'}
      </Button>
    </Box>
  );
}
