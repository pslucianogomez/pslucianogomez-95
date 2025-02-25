import { Divider, styleReset } from 'react95';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

/* Pick a theme of your choice */
import original from 'react95/dist/themes/original';

/* Original Windows95 font (optional) */
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';
import { Layout } from './pages/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login/index';
import { ExperienceList } from './pages/experience/list';
import { Profile } from './pages/profile';
import { Show11 } from './pages/experience/show11';
import { Show10 } from './pages/experience/show10';
import { Show9 } from './pages/experience/show9';
import { Show8 } from './pages/experience/show8';
import { Show7 } from './pages/experience/show7';

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
      <BrowserRouter>

        <Routes>
          <Route path="*" element={<Layout element=
            {
              <div>
                {"not found"}
              </div>
            } />
          } />
          <Route path="login" element={<LoginPage />} />
          <Route path="/">
            <Route index element={<Layout element={null} />} />
            <Route path="experience">
              <Route index element={<Layout element={<ExperienceList />} />} />
              <Route path="11" index element={<Layout element={<Show11 />} />} />
              <Route path="10" index element={<Layout element={<Show10 />} />} />
              <Route path="9" index element={<Layout element={<Show9 />} />} />
              <Route path="8" index element={<Layout element={<Show8 />} />} />
              <Route path="7" index element={<Layout element={<Show7 />} />} />
            </Route>
            <Route path="profile">
              <Route index element={<Layout element={<Profile />} />} />
            </Route>
          </Route>
        </Routes>

      </BrowserRouter>
    </ThemeProvider>

  </div>
);

export default App;



