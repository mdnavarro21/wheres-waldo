import React, { useState, useRef } from 'react';
import waldoMap from '../assets/wheres-waldo.jpeg'


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
            setClickLocation(coords);
            setIsGuessing(true);
            targetingDivRef.current.style.display = 'block'
        }
        else {
            setIsGuessing(false);
            targetingDivRef.current.style.display = 'none';
        }
    }

    const handleButtonClick = (event) => {
        event.stopPropagation();
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
                        <li><button onClick={handleButtonClick}>Waldo</button></li>
                        <li><button onClick={handleButtonClick}>IronMan</button></li>
                        <li><button onClick={handleButtonClick}>Thor</button></li>
                    </ul>
                </div>
            </div>
        </>
    )
}



