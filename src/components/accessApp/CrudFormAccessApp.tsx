import { useState, useEffect } from 'react';
import {
  TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, Switch,
  FormControlLabel
} from '@mui/material';
import {api} from '../../services/api';

interface Props {
  table: string;
  initialData?: any;
  onSuccess: () => void;
}

export default function CrudFormAccessApp({ table, initialData, onSuccess }: Props) {
  const [formData, setFormData] = useState<any>({
    usuario_id: '',
    acceso_id: '',
    fecha_solicitud: '',
    estado:''
  });

  const [usuarios, setUsuarios] = useState([]);
  const [accesos, setAccesos] = useState([]);

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
          api.getAll('accesos'),
        ]);
        setUsuarios(a.data);
        setAccesos(r.data);
      } catch (error) {
        console.error('Error cargando datos de listas', error);
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    
    const { name, value } = e.target;
    console.log('name', name)
    setFormData((prev: any) => ({
      ...prev,
      [name!]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id) {
        const { usuario_id, fecha_solicitud, estado, acceso_id } = formData;
        const dataToSend = { usuario_id, fecha_solicitud, estado, acceso_id };
        await api.update(table,formData.id, dataToSend);
    } else {
      await api.create(table, formData);
    }
    onSuccess();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
      
      {formData.id ? 
         <></>
       : 
       <TextField
       name="fecha_solicitud"
       type="date"
       value={formData.fecha_solicitud}
       onChange={handleChange}
       fullWidth
       required/>}
      

      <FormControl fullWidth>
        <InputLabel>Usuario</InputLabel>
        <Select name="usuario_id" value={formData.usuario_id} label="Usuario" onChange={handleChange}>
          {usuarios.map((usuario: any) => (
            <MenuItem key={usuario.id} value={usuario.id}>{usuario.nombre}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>App</InputLabel>
        <Select name="acceso_id" value={formData.acceso_id} label="App" onChange={handleChange}>
          {accesos.map((acceso: any) => (
            <MenuItem key={acceso.id} value={acceso.id}>{`${acceso.nombre}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      {formData.id ? 
         <FormControlLabel
         control={
           <Switch
             checked={formData.estado ?? true}
             onChange={(e) =>
               setFormData((prev: any) => ({
                 ...prev,
                 estado: e.target.checked,
               }))
             }
             name="estado"
           />
         }
         label="Habilitar/Deshabilitar acceso"
       /> : <></>}
     
      

      <Button type="submit" variant="contained">
        {formData.id ? 'Actualizar' : 'Solicitar'}
      </Button>
    </Box>
  );
}
