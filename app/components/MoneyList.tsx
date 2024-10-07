// components/MoneyList.tsx

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
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { getMoneyEntries, createMoneyEntry, updateMoneyEntry, deleteMoneyEntry } from "../utils/api"; // Importar las funciones necesarias
import { Money, MoneyType } from "../interfaces/Money"; // Importar la interfaz Money

import { useDispatch } from "react-redux"; // Importar el hook useDispatch
import { setEarningsTotal } from "../redux/totalsSlice";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const MoneyList = () => {
  const dispatch = useDispatch(); 
  const {user} = useSelector((state: RootState) => state.totals);

  const [moneyEntries, setMoneyEntries] = useState<Money[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Money | null>(null);

  useEffect(() => {
    const fetchMoneyEntries = async () => {
      try {
        const data = await getMoneyEntries(user); // Usar la función getMoneyEntries
        setMoneyEntries(data);
        const total = data.reduce((sum, money) => {
          if (money.type === MoneyType.Debt) {
            return sum - money.amount;
          }
          return sum + money.amount;
        }, 0);
        dispatch(setEarningsTotal(total));

      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchMoneyEntries();
  }, [user,dispatch]);

  useEffect(() => {
    const total = moneyEntries.reduce((sum, money) => {
      if (money.type === MoneyType.Debt) {
        return sum - money.amount;
      }
      return sum + money.amount;
    }, 0);
    dispatch(setEarningsTotal(total));    
  }, [moneyEntries,dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const handleDialogOpen = (entry?: Money) => {
    setFormData(entry ? { ...entry } : { id: 0, name: '', type: MoneyType.Personal, amount: 0, note: '', user : user, created_at: '' });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setFormData(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => prev ? { ...prev, [name]: value } : null);
  };


  const handleSubmit = async () => {
    if (formData) {
      if (formData.id) {
        // Editar registro existente
        await updateMoneyEntry(formData.id, formData);
      } else {
        // Crear nuevo registro
        await createMoneyEntry(formData);
      }
      setMoneyEntries(await getMoneyEntries(user)); // Actualizar la lista de entradas de dinero
      handleDialogClose();
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta entrada de dinero?")) {
      await deleteMoneyEntry(id);
      setMoneyEntries(await getMoneyEntries(user)); // Actualizar la lista después de eliminar
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ color: 'black' }}>
        Lista de Cuentas
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleDialogOpen()}>
        Agregar Nueva Cuenta
      </Button>
      <List>
        {moneyEntries.map((entry) => (
          <ListItem key={entry.id}>
            <ListItemText
              primary={<Typography variant="body1" sx={{ color: 'black' }}>{entry.name}</Typography>}
              secondary={
                <>
                  <Typography
                    variant="body1"
                    sx={{ color: entry.type == MoneyType.Debt ? 'red' : 'inherit' }}
                  >
                    {`${entry.type} - $${entry.amount} ${entry.note ? `(${entry.note})` : ''}`}
                  </Typography>
                </>
              }
            />
            <Button variant="outlined" onClick={() => handleDialogOpen(entry)}>Editar</Button>
            <Button variant="outlined" color="error" onClick={() => handleDelete(entry.id)}>Eliminar</Button>
          </ListItem>
        ))}
      </List>

      {/* Diálogo para agregar/editar entrada de dinero */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{formData?.id ? "Editar Cuenta" : "Agregar Nueva Cuenta"}</DialogTitle>
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
              <MenuItem value={MoneyType.Personal}>{MoneyType.Personal}</MenuItem>
              <MenuItem value={MoneyType.Debt}>{MoneyType.Debt}</MenuItem>
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

export default MoneyList;
