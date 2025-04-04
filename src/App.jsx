import { useState, useEffect } from 'react'
import './App.css'
import { Layout } from './Layout';
import { ContentView } from './ContentView';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [viewContent, setViewContent] = useState(0);

  useEffect(setColorMode, [])

  return (
    <Container>
      <Layout setViewContent={setViewContent} />
      {viewContent > 0 && <ContentView contentId={viewContent} onHide={() => setViewContent(0)}/>}
    </Container>
      
  );
}

function setColorMode() {
    const colorMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', colorMode);
}

export default App
