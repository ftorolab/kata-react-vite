import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Switch
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { api } from '../../services/api';

interface PcsTableProps {
  table: string;
  onEdit: (row: any) => void;
}

export default function PcsTable({ table, onEdit }: PcsTableProps) {
  const [rows, setRows] = useState<any[]>([]);

  const fetchData = async () => {
    try {
        const { data } = await api.getAll(table);
        console.log('Datos obtenidos:', data);
        setRows(data);
    } catch (error) {
        console.error('Error inesperado:', error);
    }
    
  };

  useEffect(() => {
    fetchData();
  }, [table]);

  const handleDelete = async (id: number) => {
    await api.remove(table, id);
    fetchData();
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell key={0}>Id</TableCell>
            <TableCell key={1}>Marca</TableCell>
            <TableCell key={2}>Número serie</TableCell>
            <TableCell key={3}>Disponible</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell key={0}>{row.id}</TableCell>
              <TableCell key={1}>{row.nombre_equipo}</TableCell>
              <TableCell key={2}>{row.numero_serie}</TableCell>
              <TableCell key={3}><Switch checked={!!row.disponible} disabled /></TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(row)}><EditIcon /></IconButton>
                <IconButton onClick={() => handleDelete(row.id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
