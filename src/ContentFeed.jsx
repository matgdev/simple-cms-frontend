import { useEffect, useState } from "react";
import { getContentList, getNumberOfPages } from "./dataAccess";
import { ContentCard } from "./ContentCard";
import { Row, Col } from "react-bootstrap";
import { PaginationBar } from "./PaginationBar";
import { Outlet, useLoaderData, useNavigate, useOutletContext, useSubmit } from "react-router-dom";
import { ManagementContext } from "./ManagementMode";

export function ContentFeed({managementMode = false}){
    const context = useOutletContext();
    const navigate = useNavigate();
    const submit = useSubmit();
    
    const ref = context.ref;

    const {contentList, maxPageNumber, currentPage, currentUrlParams} = useLoaderData();

    const onClick = (id) => navigate(`/content/${id}?${currentUrlParams}`);

    const children = contentList.map((content) => {
        return (
        <Col key={content.id} className="my-2">
            <ContentCard  content={content} onClick={() => onClick(content.id)} />
        </Col>)
    });

    function handlePageChange(n){
        submit({page: n, limit: 9}, {method:"GET"});
        ref.current?.scrollIntoView({behavior: "smooth"});
    }

    return (
    <>
        <Outlet />
        <Row xs={1} md={3}>
            {children.length === 0 && <Col className="w-100 text-center mt-3 fs-2">There is no content yet. Create one or check back soon.</Col>}
            <ManagementContext value={managementMode}>
                {children}
            </ManagementContext>
        </Row>
        <Row className="my-2">
            {children.length > 0 && <PaginationBar onChange={(n) => handlePageChange(n)} lastPage={maxPageNumber} currentPage={currentPage}></PaginationBar>}
        </Row>
    </>);
}