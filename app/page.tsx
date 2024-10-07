// pages/index.tsx

"use client";


import { ThemeProvider } from '@mui/material/styles';
import theme from "./theme";
import { Provider } from 'react-redux';
import store from './redux/store';
import ContainerPage from './components/ContainerPage';

function MyApp() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ContainerPage/>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
