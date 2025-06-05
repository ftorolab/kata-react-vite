import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { api } from "../../services/api";

interface Props {
  table: string;
  initialData?: any;
  onSuccess: () => void;
}

export default function CrudFormPcs({ table, initialData, onSuccess }: Props) {
  const [formData, setFormData] = useState<any>({
    nombre_equipo: "",
    numero_serie: "",
    disponible: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    console.log("name", name);
    setFormData((prev: any) => ({
      ...prev,
      [name!]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id) {
      const { nombre_equipo, numero_serie, disponible } = formData;
      const dataToSend = { nombre_equipo, numero_serie, disponible };
      await api.update(table, formData.id, dataToSend);
    } else {
      await api.create(table, formData);
    }
    onSuccess();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}
    >
      <TextField
        name="nombre_equipo"
        type="text"
        value={formData.nombre_equipo}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="numero_serie"
        type="text"
        value={formData.numero_serie}
        onChange={handleChange}
        fullWidth
      />
      <FormControlLabel
        control={
          <Switch
            checked={formData.disponible ?? true}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                disponible: e.target.checked,
              }))
            }
            name="disponible"
          />
        }
        label="Disponible/ No Disponible"
      />

      <Button type="submit" variant="contained">
        {formData.id ? "Actualizar" : "Crear"}
      </Button>
    </Box>
  );
}
