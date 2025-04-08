import { useEffect, useRef, useState } from "react";
import { getContentList, getNumberOfPages } from "./dataAccess";
import { ContentCard } from "./ContentCard";
import { Container, Row, Col } from "react-bootstrap";
import { PaginationBar } from "./PaginationBar";
import { NavigationBar } from "./NavigationBar";

export function Layout({setViewContent}){
    const [page, setPage] = useState(1);
    const [maxPageNumber, setMaxPageNumber] = useState(1);
    const [contentList, setContentList] = useState([]);
    const ref = useRef(null);

    useEffect(() => {
        setContentList(getContentList(9, page - 1));
        setMaxPageNumber(getNumberOfPages(9));
    }, [page]);

    const children = contentList.map((content) => {
        return (
        <Col key={content.id} className="my-2">
            <ContentCard  content={content} onClick={() => setViewContent(content.id)} />
        </Col>)
    });

    function handlePageChange(n){
        setPage(n);
        ref.current?.scrollIntoView({behavior: "smooth"});
    }
    
    return(
        <Container ref={ref}>
            <Row>
                <NavigationBar />
            </Row>
            <Row xs={1} md={3}>
                {children}    
            </Row>
            <Row className="my-2">
                <PaginationBar onChange={(n) => handlePageChange(n)} lastPage={maxPageNumber}></PaginationBar>
            </Row>
        </Container>
        
    );
}