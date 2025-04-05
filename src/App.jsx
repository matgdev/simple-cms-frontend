import { useState, useEffect } from 'react'
import './App.css'
import { Layout } from './Layout';
import { ContentView } from './ContentView';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSearchParams } from 'react-router-dom';
import { isValidId } from './dataAccess';

function App() {

  useEffect(setColorMode, []);

  const [contentParam, setContentParam] = useSearchParams();
  const [contentId, setContentId] = useState(0);
  
  const setViewContent = (id) => setContentParam({"cid": id});

  const handleHideContent = () =>{
      setContentParam((params) => {
        params.delete("cid");
        return params;
      });
  };

  useEffect(() => {
    const cid = Number(contentParam.get("cid")) || 0;
    if (contentParam.has("cid") && isContentNotValid(cid)) {
      handleHideContent();
      setContentId(0);
    } else setContentId(cid);
  }, [contentParam]);

  return (
    <Container>
      <Layout setViewContent={setViewContent} />
      {contentId > 0 && <ContentView contentId={contentId} onHide={handleHideContent}/>}
    </Container>
      
  );
}

function setColorMode() {
    const colorMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', colorMode);
}

function isContentNotValid(id) {
    return !id || id <= 0 || !isValidId(id);
}

export default App
