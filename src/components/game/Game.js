import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase-config';
import { collection, getDocs, addDoc } from "firebase/firestore";

import BountyList from './BountyList';
import Timer from './Timer';
import WaldoMap from './WaldoMap';
import StartModal from './StartModal';
import EndModal from './EndModal';

export default function Game() {
    const [clickLocation, setClickLocation] = useState([]);
    const [time, setTime] = useState(0);
    const [userName, setUserName ] = useState('');
    const [isGuessing, setIsGuessing] = useState(false);
    const [correctGuesses, setCorrectGuesses] = useState([]);

    const [characters, setCharacters] = useState([]);

    const [gameHasStarted, setGameHasStarted] = useState(false);
    const [gameHasEnded, setGameHasEnded] = useState(false);

    const targetingDivRef = useRef();
    
    const navigate = useNavigate();

    useEffect(() => {
      let interval;
      if (gameHasStarted) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 10);
        }, 10);
      } else if (!gameHasStarted) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [gameHasStarted]);

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

    useEffect(() => {
        if (correctGuesses.length === 3) {
            setGameHasStarted(false);
            setGameHasEnded(true);
        }
    }, [correctGuesses.length, time])

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

    const handleChange = (event) => {
        setUserName(event.target.value);
    }
    const addToLeaderboard = async (event) => {
        console.log(time);
        console.log(userName);
        event.preventDefault();
        await addDoc(collection(db, "leaderboards"), {
            name: userName,
            time: time
        })
        navigate('/leaderboards');

    }
    const cmpProps = {
        handleClick, 
        clickLocation, 
        correctGuesses, 
        characters, 
        handleGuess, 
        targetingDivRef
    }

    return (
        <>  
            <StartModal handleStart = { () => { setGameHasStarted(true)} } />
            <div className='sticky'>
                <Timer time = { time }/>
                <BountyList characters = {characters}/> 
            </div>
            <WaldoMap { ...cmpProps }/>
            <EndModal showModal = { gameHasEnded } time = { time } addToLeaderboard={ addToLeaderboard } handleChange={ handleChange }/>
        </>
    )
}


