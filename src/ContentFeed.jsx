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
            <ManagementContext value={managementMode}>
                {children}
            </ManagementContext>
        </Row>
        <Row className="my-2">
            <PaginationBar onChange={(n) => handlePageChange(n)} lastPage={maxPageNumber} currentPage={currentPage}></PaginationBar>
        </Row>
    </>);
}