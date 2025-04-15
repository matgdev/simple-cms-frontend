import { useEffect } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CMSRouterProvider } from './Routing';

function App() {

  useEffect(setColorMode, []);

  return (
    <Container>
      <CMSRouterProvider />
    </Container>

  );
}

function setColorMode() {
  const colorMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-bs-theme', colorMode);
}

export default App
