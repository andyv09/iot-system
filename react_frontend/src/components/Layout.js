import React from 'react'
import { Container, Row} from 'react-bootstrap'

export const Layout = (props) => (
    <Container fluid>
        {props.children}
    </Container>
)
