import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { api } from '../services/api';

interface CrudTableProps {
  table: string;
  onEdit: (row: any) => void;
}

export default function CrudTable({ table, onEdit }: CrudTableProps) {
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
            {rows[0] && Object.keys(rows[0]).map((key) => (
              <TableCell key={key}>{key}</TableCell>
            ))}
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {Object.values(row).map((value: any, i) => (
                <TableCell key={i}>{value}</TableCell>
              ))}
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
