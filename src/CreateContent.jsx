import { useState } from "react";
import {Button, Form, Row } from "react-bootstrap";
import { useFetcher, useSubmit } from "react-router-dom";
import { ContentForm } from "./ContentForm";

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
        <ContentForm onChange={handleChange} onSubmit={handleSubmit} formValues={formData}/>
        
    )
}