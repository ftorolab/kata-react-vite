import { useState, useEffect } from 'react';
import {
  TextField, Button, Box
} from '@mui/material';
import {api} from '../services/api';

interface Props {
  table: string;
  initialData?: any;
  onSuccess: () => void;
}

export default function CrudForm({ table, initialData, onSuccess }: Props) {
  const [formData, setFormData] = useState<any>({
    nombre: '',
  });


  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

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
        const { nombre } = formData;
        const dataToSend = { nombre };
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

      <Button type="submit" variant="contained">
        {formData.id ? 'Actualizar' : 'Crear'}
      </Button>
    </Box>
  );
}
