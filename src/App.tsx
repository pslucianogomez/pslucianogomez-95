import { styleReset } from 'react95';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

/* Pick a theme of your choice */
import original from 'react95/dist/themes/original';

/* Original Windows95 font (optional) */
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';
import { Layout } from './pages/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login/index';
import { ExperienceList } from './pages/experience/ExperienceList';
import { Profile } from './pages/profile';
import { ExperiencePage } from './pages/experience/ExperiencePage';
import { ContactPage } from './pages/contact';
import { LanguageProvider } from './contexts/LanguageContext';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body, input, select, textarea {
    font-family: 'ms_sans_serif';
  }
`;

const App = () => (
  <div>
    <GlobalStyles />
    <ThemeProvider theme={original}>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Layout element={<div>not found</div>} />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="/">
              <Route index element={<Layout element={null} />} />
              <Route path="experience">
                <Route index element={<Layout element={<ExperienceList />} />} />
                <Route path=":id" element={<ExperiencePage />} />
              </Route>
              <Route path="profile">
                <Route index element={<Layout element={<Profile />} />} />
              </Route>
              <Route path="contact">
                <Route index element={<Layout element={<ContactPage />} />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  </div>
);

export default App;



