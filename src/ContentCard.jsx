import { Card } from "react-bootstrap";

export function ContentCard({content, onClick}){
    return (
        <Card onClick={onClick}>
            <Card.Img variant="top" src={content.thumbnail} />
            <Card.Body>
                <Card.Title>{content.title}</Card.Title>
                <Card.Text>{content.content}</Card.Text>
            </Card.Body>
        </Card>
    );
}