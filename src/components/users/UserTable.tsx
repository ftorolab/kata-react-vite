import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { api } from '../../services/api';

interface UserTableProps {
  table: string;
  onEdit: (row: any) => void;
}

export default function UserTable({ table, onEdit }: UserTableProps) {
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
            <TableCell key={1}>Nombre</TableCell>
            <TableCell key={2}>E-mail</TableCell>
            <TableCell key={3}>Área</TableCell>
            <TableCell key={4}>Estado</TableCell>
            <TableCell key={5}>Rol</TableCell>
            <TableCell key={6}>Creación</TableCell>
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
              <TableCell key={1}>{row.nombre}</TableCell>
              <TableCell key={2}>{row.correo}</TableCell>
              <TableCell key={3}>{row.area}</TableCell>
              <TableCell key={3}>{row.estado}</TableCell>
              <TableCell key={3}>{row.rol}</TableCell>
              <TableCell key={3}>{row.creacion}</TableCell>
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
