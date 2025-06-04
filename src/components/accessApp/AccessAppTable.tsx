import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Switch
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { api } from '../../services/api';

interface AccessAppTableProps {
  table: string;
  onEdit: (row: any) => void;
}

export default function AccessAppTable({ table, onEdit }: AccessAppTableProps) {
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
            <TableCell key={1}>Fecha</TableCell>
            <TableCell key={2}>Aplicación</TableCell>
            <TableCell key={3}>Usuario</TableCell>
            <TableCell key={4}>Estado</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {/* {Object.values(row).map((value, i) => (
                <TableCell key={i}>{value}</TableCell>
              ))} */}
              <TableCell key={0}>{row.id}</TableCell>
              <TableCell key={1}>{row.fecha_solicitud}</TableCell>
              <TableCell key={2}>{row.acceso}</TableCell>
              <TableCell key={3}>{row.usuario}</TableCell>
              <TableCell key={4}><Switch checked={!!row.estado} disabled /></TableCell>
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
