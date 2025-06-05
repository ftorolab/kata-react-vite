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

export default function CrudFormUsers({ table, initialData, onSuccess }: Props) {
  const [formData, setFormData] = useState<any>({
    nombre: '',
    correo: '',
    area_id: '',
    rol_id: '',
    estado_id: 3,
  });

  const [areas, setAreas] = useState([]);
  const [roles, setRoles] = useState([]);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [a, r, e] = await Promise.all([
          api.getAll('areas'),
          api.getAll('roles'),
          api.getAll('estados_creacion_usuario')
        ]);
        setAreas(a.data);
        setRoles(r.data);
        setEstados(e.data);
      } catch (error) {
        console.error('Error cargando datos de listas', error);
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<{ name?: string; value: unknown }> | any
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id) {
        const { area_id, rol_id, estado_id, nombre, correo, id } = formData;
        const dataToSend = { nombre, correo, id, area_id, rol_id, estado_id };
        await api.update(table,formData.id, dataToSend);
    } else {
      await api.create(table, formData);
    }
    onSuccess();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
      <TextField
        name="nombre"
        label="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="correo"
        label="Correo"
        type="email"
        value={formData.correo}
        onChange={handleChange}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel>Área</InputLabel>
        <Select name="area_id" value={formData.area_id} label="Área" onChange={handleChange}>
          {areas.map((area: any) => (
            <MenuItem key={area.id} value={area.id}>{area.nombre}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Rol</InputLabel>
        <Select name="rol_id" value={formData.rol_id} label="Rol" onChange={handleChange}>
          {roles.map((rol: any) => (
            <MenuItem key={rol.id} value={rol.id}>{rol.nombre}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {formData.id ? 
        <FormControl fullWidth>
        <InputLabel>Estado</InputLabel>
        <Select name="estado_id" value={formData.estado_id} label="Estado" onChange={handleChange}>
            {estados.map((estado: any) => (
            <MenuItem key={estado.id} value={estado.id}>{estado.nombre_estado}</MenuItem>
            ))}
        </Select>
        </FormControl> : <></>}
      

      <Button type="submit" variant="contained">
        {formData.id ? 'Actualizar' : 'Crear'}
      </Button>
    </Box>
  );
}
