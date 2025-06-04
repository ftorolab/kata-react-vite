import axios from 'axios';

const API_BASE = 'https://dzkxpw5tpk.execute-api.us-east-1.amazonaws.com';

export const api = {
  getAll: (table: string) => axios.get(`${API_BASE}/${table}`),
  getById: (table: string, id: number) => axios.get(`${API_BASE}/${table}/${id}`),
  create: (table: string, data: any) => axios.post(`${API_BASE}/${table}`, data),
  update: (table: string, id: number, data: any) => axios.put(`${API_BASE}/${table}/${id}`, data),
  remove: (table: string, id: number) => axios.delete(`${API_BASE}/${table}/${id}`)
}