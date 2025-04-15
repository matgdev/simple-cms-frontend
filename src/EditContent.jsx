import { useLoaderData, useSubmit } from "react-router-dom";
import { ContentForm } from "./ContentForm";
import { useState } from "react";

export function EditContent(){
    const content = useLoaderData();

    const [formData, setFormData] = useState({title: content.title, image: content.image, content: content.content});

    function handleChange(e){
        setFormData((d) => {
            const newData = {...d};
            if (e.target.id === "image"){
                const file = e.target.files[0];
                newData[e.target.id] = file ? file : content.image;
            }
            else newData[e.target.id] = e.target.value;
            return newData;
        });
    }

    const submit = useSubmit();

    function handleSubmit(e) {
        const fd = new FormData();
        for (let key of Object.keys(formData)) fd.append(key, formData[key]);
        fd.append("id", content.id);
        submit(fd, {action: "submitChanges",  method: "POST", encType: "multipart/form-data"});
    }

    return (
        <ContentForm onSubmit={handleSubmit} onChange={handleChange} formValues={formData} isEditing={true}/>
    )
}