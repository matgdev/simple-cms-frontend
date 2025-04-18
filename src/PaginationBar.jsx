import { Container, Pagination, Stack } from "react-bootstrap";

const halfNumberOfPages = 3; // pages shown = 2 * halfNumberOfPages + 1 + [2*Ellipses + firstPage + lastPage]

export function PaginationBar({ onChange, lastPage, currentPage }) {

    const pages = [];
    const left = currentPage + halfNumberOfPages >= lastPage ? Math.max(lastPage - 2 * halfNumberOfPages - 1, 1) : Math.max(currentPage - halfNumberOfPages, 1);
    const right = Math.min(left + 2 * halfNumberOfPages + (left === 1 ? 1 : 0), lastPage);

    if (left > 1) pushPage(1);

    if (left > 2) pages.push(<Pagination.Ellipsis key={"el1"} />);

    for (let i = left; i <= right; i++) {
        pushPage(i);
    }

    if (right < lastPage - 1) pages.push(<Pagination.Ellipsis key={"el2"} />);

    if (right < lastPage) pushPage(lastPage);

    function handleClick(number) {
        onChange(number);
    }

    function pushPage(number) {
        pages.push(<Pagination.Item key={number} active={number === currentPage} onClick={() => handleClick(number)}>{number}</Pagination.Item>);
    }

    return (
        <Container>
            <Pagination className="justify-content-center mx-auto my-0 w-100 p-0">
                <Stack direction="horizontal" className="flex-wrap w-100 justify-content-center m-0 p-0">
                    <Pagination.First onClick={() => handleClick(1)} />
                    <Pagination.Prev onClick={() => handleClick(Math.max(currentPage - 1, 1))} />
                    {pages}
                    <Pagination.Next onClick={() => handleClick(Math.min(currentPage + 1, lastPage))} />
                    <Pagination.Last onClick={() => handleClick(lastPage)} />
                </Stack>
            </Pagination>
        </Container>
    );
}