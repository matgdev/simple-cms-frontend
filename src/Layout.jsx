import { Container, Row } from "react-bootstrap";
import { NavigationBar } from "./NavigationBar";
import { Outlet, useLocation } from "react-router-dom";
import { useRef } from "react";

export function Layout(){
    const location = useLocation();
    const ref = useRef(null);
    
    return(
        <Container ref={ref}>
            <Row>
                <NavigationBar activeKey={location.pathname}/>
            </Row>
            <Outlet context={{ref: ref}}/>
        </Container>
        
    );
}

