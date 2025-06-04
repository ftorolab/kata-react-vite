import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { api } from '../../services/api';

interface AssignPcTableProps {
  table: string;
  onEdit: (row: any) => void;
}

export default function AssignPcTable({ table, onEdit }: AssignPcTableProps) {
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

  const handleDelete = async (id: number, idEquipo: number) => {
    await api.remove(table, id);
    await api.update('equipos',idEquipo, {disponible: true});
    fetchData();
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell key={0}>Id</TableCell>
            <TableCell key={1}>Fecha entrega</TableCell>
            <TableCell key={2}>Usuario</TableCell>
            <TableCell key={3}>Correo</TableCell>
            <TableCell key={4}>Equipo</TableCell>
            <TableCell key={5}>No. Serie</TableCell>
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
              <TableCell key={1}>{row.fecha_entrega}</TableCell>
              <TableCell key={2}>{row.usuario}</TableCell>
              <TableCell key={3}>{row.correo_usuario}</TableCell>
              <TableCell key={3}>{row.equipo}</TableCell>
              <TableCell key={3}>{row.numero_serie}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(row)}><EditIcon /></IconButton>
                <IconButton onClick={() => handleDelete(row.id, row.equipo_id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
