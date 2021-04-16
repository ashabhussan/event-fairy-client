import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const AddService = () => {
    const [serviceData, setServiceData] = useState({})
    const [file, setFile] = useState(null);

    const handleFileChange = e => {
        const newFile = e.target.files[0];
        setFile(newFile);
    }

    const handleBlur = e => {
        const newData = { ...serviceData };
        newData[e.target.name] = e.target.value;
        setServiceData(newData);
    }
    // console.log(serviceData);

    const handleSubmit = e => {
        const formData = new FormData();
        // console.log(serviceData);
        formData.append('description', serviceData.description);
        formData.append('price', serviceData.price);
        formData.append('file', file);
        formData.append('title', serviceData.title)

        fetch('http://localhost:5000/addService', {
            method: 'POST',
            body: formData

        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data) {
                    alert("Service added successfully!")
                }
            })
            .catch(error => {
                console.error(error)
            })



        e.preventDefault()
    }


    return (
        <div className='d-flex justify-content-center'>
            <Form className='w-75 mt-5' onSubmit={handleSubmit}>

                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control onBlur={handleBlur} type="text" name='title' placeholder="Enter title" />
                </Form.Group>



                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onBlur={handleBlur} as="textarea" type="text" name='description' placeholder="Enter your message" />
                </Form.Group>

                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control onBlur={handleBlur} type="number" name='price' placeholder="Enter price in dollar" />
                </Form.Group>

                <Form.Group controlId="file">
                    <Form.Label>Image</Form.Label>
                    <Form.Control onBlur={handleFileChange} type="file" name='' placeholder="Upload image" />
                </Form.Group>

                <div className="d-flex justify-content-center">
                    <Button className='' variant="primary" type="submit">Submit</Button>
                </div>

            </Form>
        </div>
    );
};

export default AddService;