// libs/ui/src/theme.ts
import { createTheme } from '@mui/material/styles';

const genescoBlue = '#00559f';
const genescoOrange = '#fa7100';
const genescoGray = '#ececeb';

export const theme = createTheme({
  palette: {
    primary: { main: genescoBlue },
    secondary: { main: genescoOrange },
    background: { default: genescoGray, paper: '#fff' },
    text: { primary: '#232323', secondary: genescoBlue },
  },
  typography: {
    fontFamily: '"Segoe UI", Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
});
