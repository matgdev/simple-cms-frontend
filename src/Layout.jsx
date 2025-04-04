import { useEffect, useState } from "react";
import { getContentList } from "./dataAccess";
import { ContentCard } from "./ContentCard";
import { Container, Row, Col } from "react-bootstrap";

export function Layout({setViewContent}){
    const [page, setPage] = useState(1);
    const [contentList, setContentList] = useState([]);

    useEffect(() => {
        setContentList(getContentList(9, page - 1));
    }, [page]);

    const children = contentList.map((content) => {
        return (
        <Col key={content.id}>
            <ContentCard  content={content} onClick={() => setViewContent(content.id)} />
        </Col>)
    });
    
    return(
        <Container>
            <Row xs={1} md={3}>
                {children}    
            </Row>
        </Container>
        
    );
}