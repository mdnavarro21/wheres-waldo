import React, { useState, useRef } from 'react';
import waldoMap from '../assets/wheres-waldo.jpeg';
import { db } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';

export default function Game() {
    const [clickLocation, setClickLocation] = useState([]);
    const [isGuessing, setIsGuessing] = useState(false);
    const targetingDivRef = useRef();

    const getClickCoords = (event) => {
        // from: https://stackoverflow.com/a/29296049/14198287
        let e = event.currentTarget;
        let dim = e.getBoundingClientRect();
        let x = event.clientX - dim.left;
        let y = event.clientY - dim.top;
        return [x,y];
        };
    
    const handleClick = (event) => {
        const coords = getClickCoords(event);
        if (isGuessing === false) {
            console.log(coords);
            setClickLocation(coords);
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
        const docRef = doc(db, "character-coordinates", event.currentTarget.id);
        const docSnap = await getDoc(docRef);
        const charCoords = docSnap.data().coordinates;   
        const [userGuess_x, userGuess_y] = clickLocation;

        if ((userGuess_x >= charCoords[0].x_left && userGuess_x <=charCoords[0].x_right) && (userGuess_y >= charCoords[1].y_top && userGuess_y <= charCoords[1].y_bottom)) {
            console.log('Correct!');
        }
        else {
            console.log('Incorrect');
        }
    }

    return (
        <>
            <div className='image-container' onClick={ handleClick }>
                <img src={ waldoMap } alt = 'wheres-waldo'/>
                <div className = 'targeting-div' ref = {targetingDivRef}  style = {{
                    position: 'absolute',
                    left: `${clickLocation[0] - 18}px`,
                    top: `${clickLocation[1] - 19}px`,
                    height: '100px',
                    width: '100px',
                    display: 'none',
                }}>
                    <div className='circle-marker'></div>
                    <ul className='character-list'>
                        <li><button onClick={handleGuess} id = 'character-1'>Red Soldier</button></li>
                        <li><button onClick={handleGuess} id = 'character-2'>Blue Soldier</button></li>
                        <li><button onClick={handleGuess}>Thor</button></li>
                    </ul>
                </div>
            </div>
        </>
    )
}



