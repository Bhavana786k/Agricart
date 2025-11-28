import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Home() {
    return (
        <div>
            <header className="bg-dark text-white py-5">
                <Container>
                    <Row>
                        <Col>
                            <h1>Welcome to The Farmers' Market</h1>
                            <p className="lead">Everything From Farm To Home</p>
                            <Button variant="primary">Get Started</Button>
                        </Col>
                    </Row>
                </Container>
            </header>

            <section className="py-5">
                <Container>
                    <Row>
                        <Col md={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Discover</Card.Title>
                                    <Card.Text>Explore a wide range of music genres and artists.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Listen</Card.Title>
                                    <Card.Text>Stream your favorite songs and albums of wide varieties.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Enjoy</Card.Title>
                                    <Card.Text>Immerse yourself in the world of music and enjoy the experience.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="bg-light py-5">
                <Container>
                    <Row>
                        <Col>
                            <h2>Unlock Premium Features!</h2>
                            <p>Buy the premium subscription for just Rs.99 to unlock unlimited streaming of your favorite songs!</p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
}

export default Home;
