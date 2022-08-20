import React, { useState, useRef, useEffect } from 'react';
import waldoMap from '../assets/wheres-waldo.jpeg';
import BountyList from './BountyList';
import { db } from '../firebase-config';
import { collection, getDocs } from "firebase/firestore";
import styled from 'styled-components';

export default function Game() {
    const [clickLocation, setClickLocation] = useState([]);
    const [isGuessing, setIsGuessing] = useState(false);
    const [correctGuesses, setCorrectGuesses] = useState([]);
    const [characters, setCharacters] = useState([]);

    const targetingDivRef = useRef();

    useEffect(() => {
        async function fetchData() {
            const querySnapshot = await getDocs(collection(db, "character-coordinates"));
            querySnapshot.forEach((doc) => {
                const character = {
                    id: doc.id,
                    ...doc.data(),
                    found: false,
                }
                setCharacters(prev => {
                    return [...prev, character];
                })
            });            
        }
        fetchData();
    },[]);

    const getClickCoordinates = (event) => {
        let e = event.currentTarget;
        let dim = e.getBoundingClientRect();
        let x = ((event.clientX - dim.left)/dim.width)*100;
        let y = ((event.clientY - dim.top)/dim.height)*100;
        return [x,y];
        };
    
    const handleClick = (event) => {
        if (isGuessing === false) {
            const clickCoordinates = getClickCoordinates(event);
            setClickLocation(clickCoordinates);
            setIsGuessing(true);
            targetingDivRef.current.style.display = 'block'
        }
        else {
            setIsGuessing(false);
            targetingDivRef.current.style.display = 'none';
        }
    }

    const handleGuess = async (event) => {
        event.stopPropagation();
        const userGuess = characters.find((character) => character.id === event.currentTarget.id);
        const characterCoordinates = userGuess.coordinates;
        if ((clickLocation[0] >= characterCoordinates[0].x_left && clickLocation[0]<=characterCoordinates[0].x_right) 
        && (clickLocation[1] >= characterCoordinates[1].y_top && clickLocation[1] <= characterCoordinates[1].y_bottom)) {
            setCorrectGuesses(prevGuesses => [...prevGuesses, [clickLocation[0],clickLocation[1]]]);
            setCharacters(previousArray => {
                return previousArray.map((character) => {
                    if (character.id === userGuess.id) {
                        return {
                            ...character,
                            found: true
                        }
                    }
                    return character;
                })
            })
        }
        else {
            console.log('Incorrect');
        }
        targetingDivRef.current.style.display = 'none';
        setIsGuessing(false);
    }

    return (
        <>  
            <BountyList characters = {characters}/>       
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

        </>
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


