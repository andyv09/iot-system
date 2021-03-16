
import * as ReactBootStrap from 'react-bootstrap';

const Header = (props) => {
    return (
        <ReactBootStrap.Navbar bg="dark" variant="primary">
            <ReactBootStrap.Navbar.Brand href="/">IoT-Dashboard</ReactBootStrap.Navbar.Brand>
            <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
            <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
                <ReactBootStrap.Nav className="mr-auto">
                <ReactBootStrap.Nav.Link href="/devices">Devices</ReactBootStrap.Nav.Link>
                <ReactBootStrap.Nav.Link href="/stats">Stats</ReactBootStrap.Nav.Link>
                </ReactBootStrap.Nav>
                <ReactBootStrap.Button onClick={props.logoutFunc} variant="outline-primary"><b>Logout</b></ReactBootStrap.Button>
            </ReactBootStrap.Navbar.Collapse>
        </ReactBootStrap.Navbar>
        )
}

export default Header
