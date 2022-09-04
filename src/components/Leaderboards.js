import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { collection, query, getDocs, orderBy } from 'firebase/firestore'
import { Table, Button } from 'react-bootstrap';
import '../styles/leaderboards.css';

export default function Leaderboards() {
    const [leaderboard, setLeaderboard ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const q = query(collection(db, "leaderboards"), orderBy("time"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                const playerData = {
                    id: doc.id,
                    ...doc.data(),
                }
                setLeaderboard(prevData => {
                    return [...prevData, playerData]
                })
              });
        }

        fetchData();
    }, [])

    const playAgain = () => {
        navigate('/');
    }
    return (
        <>  
            <Button className='play-again' onClick={ playAgain }>Play Again</Button>
            <h2>Leaderboards</h2>            
            <Table className='table table-striped table-dark table-bordered'>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    { leaderboard.map((player, index) => {
                            const time = player.time;
                            return(
                                
                                <tr key = {player.id}>
                                    <td>{ index + 1}</td>
                                    <td>{ player.name }</td>  
                                    <td>                    
                                        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                                        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                                        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span></td>
                                    </tr>

                            )
                        })
                    }        
                </tbody>
            </Table>
        </>

    )
}
