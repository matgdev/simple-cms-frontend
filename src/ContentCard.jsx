import { Card, Container, Ratio, Row, Spinner } from "react-bootstrap";
import { ISOToLocaleDateTimeString as dateToString } from "./DateFormatter";
import { useContext, useState } from "react";
import { ManagementContext, ManagementButtons } from "./ManagementMode";
import { formatContentBreaks } from "./formatContent";

export function ContentCard({ content, onClick }) {
    const managementMode = useContext(ManagementContext);
    const description = formatContentBreaks(content.content);
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <Card onClick={onClick} className="h-100 clickableCard">
            {imageLoaded === false && <Ratio aspectRatio="4x3"><div className="align-items-center justify-content-center d-flex">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading thumbnail...</span>
                </Spinner></div></Ratio>}
            <Ratio aspectRatio="4x3" className={`${!imageLoaded ? "visually-hidden" : ""}`}><Card.Img variant="top" src={content.thumbnail} onLoad={()=>setImageLoaded(true)}/></Ratio>
            <Card.Body>
                <Card.Title className="text-truncate">{content.title}</Card.Title>
                <Card.Text className="description-box">{description}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Container>
                    <Row className="p-0"><Card.Text className="m-0 p-0">By @{content.author}</Card.Text></Row>
                    <Row className="p-0"><Card.Text className="m-0 p-0">{dateToString(content.date)}</Card.Text></Row>
                    {managementMode && <ManagementButtons contentId={content.id} />}
                </Container>
            </Card.Footer>
        </Card>
    );
}