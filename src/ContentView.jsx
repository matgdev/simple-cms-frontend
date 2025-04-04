import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getContentById } from './dataAccess';
import { Container, Image, Row, Col } from 'react-bootstrap';

export function ContentView({contentId, onHide}){
    const [content, setContent] = useState({title: ""});

    useEffect(() => setContent(getContentById(contentId))
    , [contentId]);
    
    return (
        <Modal show={true} onHide={onHide} size='lg'>
            <Modal.Header closeButton>
            <Modal.Title>{content.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col><Image src={content.image} className='mw-100'/></Col>
                    </Row>
                    <Row>
                        <Col>
                            {content.content}
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}