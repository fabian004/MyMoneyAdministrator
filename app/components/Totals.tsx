import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Importar el tipo RootState
import { Box, Divider, Typography } from '@mui/material';

const Totals = () => {
  const {user, total, earningsTotal, grandTotal} = useSelector((state: RootState) => state.totals); // Usar useSelector para obtener el total

  return (
    <Typography
      variant="h5"
      sx={{
        color: 'primary.main',
        backgroundColor: 'background.paper',
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        textAlign: 'center',
        border: 1,
        borderColor: 'primary.light',
        marginBottom: 4,
      }}
    >
      {/* Total de Gastos */}
      <Box sx={{ fontWeight: 'bold', color: 'error.main', fontSize: '1.3rem' }}>
        Total de Gastos:
      </Box>
      <Box sx={{ color: 'text.primary', fontSize: '1.2rem', mb: 2 }}>
        ${total}
      </Box>

      {/* Total de Cuentas */}
      <Box sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: '1.3rem' }}>
        Total de Cuentas:
      </Box>
      <Box sx={{ color: 'text.primary', fontSize: '1.2rem', mb: 2 }}>
        ${earningsTotal}
      </Box>

      {/* Separador */}
      <Divider sx={{ my: 2, borderColor: 'grey.500', width: '80%', mx: 'auto' }} />

      {/* Gran total */}
      <Box sx={{ fontWeight: 'bold', color: 'success.main', fontSize: '1.3rem' }}>
        Gran Total:
      </Box>
      <Box sx={{ color: 'text.primary', fontSize: '1.2rem', mb: 2 }}>
        ${grandTotal} (Total - Gastos)
      </Box>

      {/* Patrimonio */}
      {user === 'Fabian' && (
        <Box>
          <Box sx={{ fontWeight: 'bold', color: 'warning.main', fontSize: '1.3rem' }}>
            Patrimonio:
          </Box>
          <Box sx={{ color: 'text.primary', fontSize: '1.2rem' }}>
            ${grandTotal + 250000} (Gran Total + Carro)
          </Box>
        </Box>
      )}

    </Typography>

  );
};

export default Totals;
