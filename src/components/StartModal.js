import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function StartModal({ handleStart }) {
    const [show, setShow] = useState(true);
    return (
    <>

        <Modal show={show}>
        <Modal.Header className = 'd-flex justify-content-center'>
            <Modal.Title >Welcome to Where's Waldo!</Modal.Title>
        </Modal.Header>
        <Modal.Body >
            <p>Find the characters in the character list as fast as possible. Click on the map to make your guess and catch the culprit. Your time will be added to the leaderboards! </p>
            <h2 className = 'text-center'>Good Luck!</h2>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-center lead'>
            <Button variant = 'warning'onClick={() => { 
                        handleStart();
                        setShow(false);
                    }
                }>
            Start Game
            </Button>
        </Modal.Footer>
        </Modal>
    </>
    )
}
