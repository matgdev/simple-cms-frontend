import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import { ISOToLocaleDateTimeString as dateToString} from "./DateFormatter";
import { useContext } from "react";
import { ManagementContext, ManagementButtons } from "./ManagementMode";



export function ContentCard({content, onClick}){
    const managementMode = useContext(ManagementContext);
    return (
        <Card onClick={onClick} className="h-100 clickableCard">
            <Card.Img variant="top" src={content.thumbnail} />
            <Card.Body>
                <Card.Title className="text-truncate">{content.title}</Card.Title>
                <Card.Text className="description-box">{content.content}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Container>
                    <Row className="p-0"><Card.Text className="m-0 p-0">By @{content.author}</Card.Text></Row>
                    <Row className="p-0"><Card.Text className="m-0 p-0">{dateToString(content.date)}</Card.Text></Row>
                    {managementMode && <ManagementButtons contentId={content.id}/>}
                </Container>
            </Card.Footer>
        </Card>
    );
}