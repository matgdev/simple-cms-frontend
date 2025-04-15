import { Card, Container, Row } from "react-bootstrap";
import { NavigationBar } from "./NavigationBar";
import { Outlet, useLocation } from "react-router-dom";
import { useRef } from "react";

export function Layout(){
    const location = useLocation();
    const ref = useRef(null);
    
    return(
        <Container ref={ref}>
            <Row className="my-2">
                <Card className="p-0 bg-tertiary">
                    <Container className="px-0 fs-6 px-2 navtext">
                        <NavigationBar activeKey={location.pathname}/>
                    </Container>
                </Card>
            </Row>
            <Row className="my-2">
                <Card className="py-1 px-0">
                    <Container>
                        <Outlet context={{ref: ref}}/>
                    </Container>
                </Card>
            </Row>
        </Container>
        
    );
}

