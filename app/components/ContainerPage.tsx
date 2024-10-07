import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Importar el tipo RootState
import { Container, Typography, Grid, Box, Button } from "@mui/material";
import ExpenseList from "./ExpenseList";
import MoneyList from "./MoneyList";
import Totals from "./Totals";
import { useDispatch } from "react-redux"; 
import { setUser } from "../redux/totalsSlice";

const ContainerPage = () => {
  const dispatch = useDispatch(); 
  const {user} = useSelector((state: RootState) => state.totals);

  const handleUserSelection = (selectedUser: string) => {
    dispatch(setUser(selectedUser));
  };
  const handleUserSwitch = () => {
    const newUser = user === "Fabian" ? "Fernanda" : "Fabian";
    dispatch(setUser(newUser));
  };


  if (user === "") {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Selecciona tu usuario
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '100%', height: '150px', fontSize: '24px' }}
              onClick={() => handleUserSelection('Fabian')}
            >
              Fabimita
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: '100%', height: '150px', fontSize: '24px' }}
              onClick={() => handleUserSelection('Fernanda')}
            >
              Fernamita
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 4, textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom>
          Hola {user}
        </Typography>
        <Typography variant="h5" gutterBottom>
            <Button
            variant="contained"
            color={user === "Fernanda" ? "primary" : "secondary"}
            onClick={handleUserSwitch}
            >
            Cambiar a {user === "Fabian" ? "Fernanda" : "Fabian"}
            </Button>
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 3 }}>
            <ExpenseList />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 3 }}>
            <MoneyList />
          </Box>
        </Grid>
      </Grid>

      {/* Componente Totals que ocupa el ancho completo */}
      <Grid item xs={12} sx={{ mt: 4 }}>
        <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 3 }}>
          <Totals />
        </Box>
      </Grid>
    </Container>
  );
};

export default ContainerPage;
