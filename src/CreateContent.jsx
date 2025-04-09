import { useState } from "react";
import {Button, Form, Row } from "react-bootstrap";
import { useFetcher, useSubmit } from "react-router-dom";

export function CreateContent(){

    const [formData, setFormData] = useState({title: "", image: null, content: ""});

    function handleChange(e){
        setFormData((d) => {
            const newData = {...d};
            if (e.target.id === "image"){
                const file = e.target.files[0];
                newData[e.target.id] = file ? file : null;
            }
            else newData[e.target.id] = e.target.value;
            return newData;
        });
    }

    const submit = useSubmit();

    function handleSubmit(e) {
        const fd = new FormData();
        for (let key of Object.keys(formData)) fd.append(key, formData[key]);
        submit(fd, {action: "submit",  method: "POST", encType: "multipart/form-data"});
    }


    return(
        <Row className="p-2">
            <Form action={handleSubmit}>
                <Form.Group controlId="title" className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" required onChange={handleChange}/>
                </Form.Group>
                
                <Form.Group controlId="image" className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" required accept="image/*" onChange={handleChange}/>
                </Form.Group>

                <Form.Group controlId="content" className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows={7} required onChange={handleChange}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Publish
                </Button>
            </Form>
        </Row>
        
    )
}