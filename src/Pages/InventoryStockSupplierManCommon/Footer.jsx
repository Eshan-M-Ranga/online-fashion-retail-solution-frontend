import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
    return (
        <footer className="bg-dark text-light py-3" style={{marginTop: "25px"}}>
            <Container>
                <Row>
                    <Col>
                        <p className="text-center">Powered By SLIIT</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;