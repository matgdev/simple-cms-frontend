import { createContext } from "react";
import { ContentFeed } from "./ContentFeed";
import { Button, Row, Stack } from "react-bootstrap";
import { useNavigate, useSubmit } from "react-router-dom";

export function ManagementMode() {
    return <ContentFeed managementMode={true} />;
}

export function ManagementButtons({ contentId }) {
    const submit = useSubmit();
    const navigate = useNavigate();

    function handleEdit(event) {
        event.stopPropagation();
        navigate("/edit/" + contentId);
    }

    function handleDelete(event) {
        event.stopPropagation();
        submit({ cid: contentId }, { action: "remove", navigate: false, method: "POST" });
    }

    return (
        <Row className="my-1 p-0">
            <Stack direction="horizontal" className="justify-content-end m-0 p-0 w-100" gap={2}>
                <Button className="flex-grow-1 flex-lg-grow-0" onClick={handleEdit}>Edit</Button>
                <Button className="flex-grow-1 flex-lg-grow-0" variant="outline-danger" onClick={handleDelete}>Delete</Button>
            </Stack>
        </Row>
    );
}

export const ManagementContext = createContext(true);