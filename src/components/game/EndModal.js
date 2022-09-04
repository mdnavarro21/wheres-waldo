import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function EndModal({ showModal, time, addToLeaderboard, handleChange }) {

    return (
    <>
        <Modal show={ showModal }>
        <Modal.Header>
            <Modal.Title >Your Score is          
                 <div className="numbers">
                    <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                    <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
                    {" seconds!"}
                </div>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body >
            <p>Enter your name to add it to the Leaderboards!</p>
            <form onSubmit={ addToLeaderboard }>
                <input type = 'text' name = 'name' onChange={ handleChange }/>
                <Button type = 'submit'>Submit</Button>                              
            </form>


        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
        </Modal>
    </>
    )
}