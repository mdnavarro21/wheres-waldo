import React from 'react'
import waldoMap from '../../assets/wheres-waldo.jpeg';
import styled from 'styled-components';

export default function WaldoMap(props) {
    const {handleClick, clickLocation, correctGuesses, characters, handleGuess, targetingDivRef} = props;
    
  return (
    <div className='image-container' onClick={ handleClick }>
        <img src={ waldoMap } alt = 'wheres-waldo'/>

        {correctGuesses.map((guess, index) => {
                return <CircleMarker key = {index} coordinates = {[guess[0],guess[1]]} />
        })}

        <TargetingDiv ref = {targetingDivRef} clickCoordinates= {[clickLocation[0],clickLocation[1]]}>
            <CircleMarker />
            <ul className='character-list'>
                { 
                    characters.map((character) => {
                        return (
                            <li key = { character.id }>
                                <input 
                                    type = 'button' 
                                    id = { character.id } 
                                    value = { character.name } 
                                    onClick={ handleGuess } 
                                    disabled={ character.found } />
                            </li>
                        )
                    })
                }
            </ul>                    
        </TargetingDiv>
    </div>
  )
}

const TargetingDiv = styled.div`
    position: absolute;
    height: 100px;
    width: 100px;
    display: none;    
    left: ${props => props.clickCoordinates[0] - 1}%;
    top: ${props => props.clickCoordinates[1] - 2}%;
`

const CircleMarker = styled.div`
    border: 4px solid red;
    width: 4vh;
    height: 4vh;
    color: white;
    border-radius: 50%;
    ${props => props.coordinates && `
        border: 4px solid black;
        position: absolute;
        top: ${props.coordinates[1]-2}%;
        left: ${props.coordinates[0]-1}%;
    `}
`
