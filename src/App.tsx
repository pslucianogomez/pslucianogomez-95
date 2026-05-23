import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import { GlobalStyle } from './theme/GlobalStyle';
import { LanguageProvider } from './contexts/LanguageContext';
import { WindowsProvider } from './contexts/WindowsContext';
import { AppRoutes } from './routes';

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <LanguageProvider>
      <WindowsProvider>
        <AppRoutes />
      </WindowsProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
