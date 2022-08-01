import React, { useState} from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorMessage, setErrorMessage ] = useState('');
    const [loading, setLoading] = useState(false)

    const { userSignUp } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            setErrorMessage('');
            setLoading(true);
            await userSignUp(email, password);
        }
        catch {
            setErrorMessage('Failed to create an account. Please try again.');
        }
        setLoading(false);
    }
    return (
        <div className='signup-page'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label >
                    Email:
                    <input type = "email" name = "email" onChange={e => setEmail(e.currentTarget.value)}/>
                </label>
                <label >
                    Password:
                    <input type = "password" name = "password" onChange={ e => setPassword(e.currentTarget.value) }/>
                </label>
                <label >
                    Confirm Password:
                    <input type = "password" name = "passwordConfirm" onChange={ e => setPasswordConfirm(e.currentTarget.value) }/>
                </label>
                <button disabled = {loading} type = "submit">Submit</button>
            </form>
            {errorMessage && <div>{ errorMessage }</div>}
            <div>Already have an account? Login here</div>
        </div>
    )
}
