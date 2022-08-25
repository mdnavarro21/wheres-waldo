import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function BountyList({ characters }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className= "sticky-top" variant="dark" onClick={handleShow}>
        Character List
      </Button>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title>Characters to Find</Modal.Title>
        </Modal.Header>
        <Modal.Body className = 'd-flex justify-content-around'>
            {

                characters.map((character) => {
                    return (
                        <div key = { character.id } className= {'character-container ' + (character.found === true ? 'transparent' : '')}>
                            <h2>{character.name}</h2>
                            <img src = { require(`../assets/characters/${character.url}.png`)} alt = {character.name}/>
                        </div>
                    )
                })
            }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
