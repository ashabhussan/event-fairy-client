import { Button } from 'react-bootstrap';
import React from 'react';
import { Card } from 'react-bootstrap';



const ServiceCard = (props) => {
    const { title, description, image, price } = props.service;
    return (
        <Card style={{ width: '18rem' }} className='m-3'>
            <Card.Img variant="top" src={`data:image/png;base64,${props.service.image.img}`} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <h6>Only in ${price}</h6>
                <Button variant="primary">Get Booking</Button>
            </Card.Body>
        </Card>
    );
};

export default ServiceCard;