import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { margin: 0; padding: 0; height: 100%; }
  body {
    font-family: ${({ theme }) => theme.fontFamily.body};
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.colors.ink};
    background: ${({ theme }) => theme.colors.paper};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fontFamily.display};
    margin: 0;
    font-weight: 900;
  }
  button { font-family: inherit; cursor: crosshair; }
  a { color: inherit; }
  input, textarea, select { font-family: inherit; }
  ::selection { background: ${({ theme }) => theme.colors.btc}; color: ${({ theme }) => theme.colors.ink}; }
`;
