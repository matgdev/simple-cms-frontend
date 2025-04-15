import Modal from 'react-bootstrap/Modal';
import { Container, Image, Row, Col } from 'react-bootstrap';
import { ISOToLocaleDateTimeString as dateToString } from "./DateFormatter";
import { useLoaderData, useNavigate } from 'react-router-dom';
import { formatContentBreaks } from './formatContent';

export function ContentView() {

    const navigate = useNavigate();
    const { content } = useLoaderData();
    const onHide = () => navigate(-1);

    const textContent = formatContentBreaks(content.content);

    return (
        <Modal show={true} onHide={onHide} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title className='ms-3 me-2'>{content.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='my-3'>
                <Container>
                    <Row>
                        <Col><Image src={content.image} className='mw-100' /></Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col>
                            {textContent}
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