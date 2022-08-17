import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import BlueSoldier from '../assets/BlueSoldier.png'
import YellowSoldier from '../assets/YellowSoldier.png'
import RedSoldier from '../assets/RedSoldier.png'

export default function BountyList() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className= "sticky-top" variant="primary" onClick={handleShow}>
        Character List
      </Button>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title>Characters to Find</Modal.Title>
        </Modal.Header>
        <Modal.Body className = 'd-flex justify-content-around'>
            <div className={'character-container'}>
                <h2>Red Soldier</h2>
                <img src={ RedSoldier } alt='Red Soldier'/>
            </div>
            <div className='character-container'>
                <h2>Blue Soldier</h2>
                <img src={ BlueSoldier } alt = 'Blue Soldier'/>
            </div>
            <div className='character-container'>
                <h2>Yellow Soldier</h2>
                <img src={ YellowSoldier } alt = 'Yellow Soldier'/>
            </div>
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
