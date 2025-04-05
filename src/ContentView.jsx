import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getContentById } from './dataAccess';
import { Container, Image, Row, Col } from 'react-bootstrap';
import { ISOToLocaleDateTimeString as dateToString} from "./DateFormatter";

export function ContentView({contentId, onHide}){
    const [content, setContent] = useState({title: "", date: Date.now()});

    useEffect(() => setContent(getContentById(contentId))
    , [contentId]);
    
    return (
        <Modal show={true} onHide={onHide} size='lg'>
            <Modal.Header closeButton>
            <Modal.Title className='ms-3 me-2'>{content.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='my-3'>
                <Container>
                    <Row>
                        <Col><Image src={content.image} className='mw-100'/></Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col>
                            {content.content}
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <p>By @{content.author}, </p>
                <p>Published on {dateToString(content.date)}</p>
            </Modal.Footer>
        </Modal>
    );
}