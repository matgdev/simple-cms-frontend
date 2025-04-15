import {Button, Form, Row } from "react-bootstrap";

export function ContentForm({onSubmit, onChange, formValues, isEditing = false}){
    return(
        <Row className="p-2">
            <Form action={onSubmit}>
                <Form.Group controlId="title" className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" required onChange={onChange} value={formValues.title}/>
                </Form.Group>
                
                <Form.Group controlId="image" className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" required={!isEditing} accept="image/*" onChange={onChange} />
                    {isEditing === true && <Form.Text>Leave blank to use the previous image</Form.Text>}
                </Form.Group>

                <Form.Group controlId="content" className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows={7} required onChange={onChange} value={formValues.content}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    {isEditing ? "Update" : "Publish"}
                </Button>
            </Form>
        </Row>
        
    )
}