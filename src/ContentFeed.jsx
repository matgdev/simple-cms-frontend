import { useEffect, useState } from "react";
import { getContentList, getNumberOfPages } from "./dataAccess";
import { ContentCard } from "./ContentCard";
import { Row, Col } from "react-bootstrap";
import { PaginationBar } from "./PaginationBar";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";

export function ContentFeed(){
    const context = useOutletContext();
    const navigate = useNavigate();
    const onClick = (id) => navigate(`/content/${id}`);
    const ref = context.ref;

    
    const [page, setPage] = useState(1);
    const [maxPageNumber, setMaxPageNumber] = useState(1);
    const [contentList, setContentList] = useState([]);

    useEffect(() => {
        setContentList(getContentList(9, page - 1));
        setMaxPageNumber(getNumberOfPages(9));
    }, [page]);

    const children = contentList.map((content) => {
        return (
        <Col key={content.id} className="my-2">
            <ContentCard  content={content} onClick={() => onClick(content.id)} />
        </Col>)
    });

    function handlePageChange(n){
        setPage(n);
        ref.current?.scrollIntoView({behavior: "smooth"});
    }

    return (
    <>
        <Outlet />
        <Row xs={1} md={3}>
            {children}    
        </Row>
        <Row className="my-2">
            <PaginationBar onChange={(n) => handlePageChange(n)} lastPage={maxPageNumber}></PaginationBar>
        </Row>
    </>);
}