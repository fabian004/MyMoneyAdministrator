// components/ExpenseList.tsx

import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { getExpenses, createExpense, updateExpense, deleteExpense } from "../utils/api"; // Importar las funciones necesarias
import { Expense, ExpenseType } from "../interfaces/Expense"; // Importar la interfaz Expense

import { useDispatch } from "react-redux"; // Importar el hook useDispatch
import { setTotal } from "../redux/totalsSlice";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const ExpenseList = () => {
  const dispatch = useDispatch(); 
  const {user} = useSelector((state: RootState) => state.totals);

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Expense | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses(user); // Usar la función getExpenses
        setExpenses(data);
        const total = data.reduce((sum, expense) => {
          const amount = expense.type === "Weekly" ? expense.amount * 4 : expense.amount;
          return sum + amount;
        }, 0);
        dispatch(setTotal(total));
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [user]);

  useEffect(() => {
    const total = expenses.reduce((sum, expense) => {
      const amount = expense.type === "Weekly" ? expense.amount * 4 : expense.amount;
      return sum + amount;
    }, 0);
    dispatch(setTotal(total));
  }, [expenses]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const handleDialogOpen = (expense?: Expense) => {
    setFormData(expense ? { ...expense } : { id: 0, name: '', type: ExpenseType.Monthly, amount: 0, note: '', user : user, created_at: '' });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setFormData(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => prev ? { ...prev, [name]: value } : null);
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => prev ? { ...prev, [name]: value } : null);
  };


  const handleSubmit = async () => {
    if (formData) {
      if (formData.id) {
        // Editar registro existente
        await updateExpense(formData.id, formData);
      } else {
        // Crear nuevo registro
        await createExpense(formData);
      }
      setExpenses(await getExpenses(user)); // Actualizar la lista de gastos
      handleDialogClose();
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este gasto?")) {
      await deleteExpense(id);
      setExpenses(await getExpenses(user)); // Actualizar la lista después de eliminar
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ color: 'black' }}>
        Gastos Mensuales
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleDialogOpen()}>
        Agregar Nuevo Gasto
      </Button>
      <List>
        {expenses.map((expense) => (
          <ListItem key={expense.id}>
            <ListItemText
              primary={<Typography variant="body1" sx={{ color: 'black' }}>{expense.name}</Typography>}
              secondary={`${expense.type} - $${expense.amount} ${expense.note ? `(${expense.note})` : ''}`}
            />
            <Button variant="outlined" onClick={() => handleDialogOpen(expense)}>Editar</Button>
            <Button variant="outlined" color="error" onClick={() => handleDelete(expense.id)}>Eliminar</Button>
          </ListItem>
        ))}
      </List>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{formData?.id ? "Editar Gasto" : "Agregar Nuevo Gasto"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nombre"
            type="text"
            fullWidth
            variant="outlined"
            value={formData?.name || ''}
            onChange={handleFormChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="expense-type-label">Tipo</InputLabel>
            <Select
              labelId="expense-type-label"
              name="type"
              value={formData?.type || ''}
              onChange={handleSelectChange}
              variant="outlined"
            >
              <MenuItem value={ExpenseType.Weekly}>{ExpenseType.Weekly}</MenuItem>
              <MenuItem value={ExpenseType.Monthly}>{ExpenseType.Monthly}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="amount"
            label="Monto"
            type="number"
            fullWidth
            variant="outlined"
            value={formData?.amount == 0 ? null : formData?.amount}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="note"
            label="Nota"
            type="text"
            fullWidth
            variant="outlined"
            value={formData?.note || ''}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {formData?.id ? "Guardar" : "Agregar"}
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default ExpenseList;
