import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import { ISOToLocaleDateTimeString as dateToString} from "./DateFormatter";



export function ContentCard({content, onClick}){
    return (
        <Card onClick={onClick} className="h-100 clickableCard">
            <Card.Img variant="top" src={content.thumbnail} />
            <Card.Body>
                <Card.Title className="text-truncate">{content.title}</Card.Title>
                <Card.Text>{content.content}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Container>
                    <Row className="p-0"><Card.Text className="m-0 p-0">By @{content.author}</Card.Text></Row>
                    <Row className="p-0"><Card.Text className="m-0 p-0">{dateToString(content.date)}</Card.Text></Row>
                </Container>
            </Card.Footer>
        </Card>
    );
}