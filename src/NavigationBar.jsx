import { Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export function NavigationBar(){
    const currentLocation = useLocation();
    const activeKey = currentLocation.pathname;
    return (
        <Navbar>
            <Nav variant="pills" activeKey={activeKey} className="flex-column flex-md-row w-100 px-1">
                <NavItem name={"Home"} path={"/"} />
                <NavItem name={"Create"} path={"/create"} />
                <NavItem name={"Manage"} path={"/manage"} />
            </Nav>
        </Navbar>
    );
}

function NavItem({name, path}){
    return (
        <Nav.Item>
            <Link to={path} className="nav-link">
                <Nav.Link eventKey={path} as="span">
                    {name}
                </Nav.Link>
            </Link>             
        </Nav.Item>
    );
}