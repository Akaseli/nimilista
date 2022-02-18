import React, { useEffect, useState } from 'react'
import { Person } from '../interfaces'
import './edit.css'

interface Props {
    person: Person
    index: number
    changeVisibility(): void
    handleEdit(arg0: number, arg1: Person): void
}

export const Edit: React.FC<Props> = ({person, index, changeVisibility, handleEdit}) => {
    const [currentInput, setInput] = useState(person);

    useEffect(() => {
        setInput(person);
    }, [person])

    return (
        <div>
            <div className='overlay' onClick={changeVisibility}></div>
            <div className='edit'>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleEdit(index, currentInput);
                    changeVisibility();
                    
                }}>
                    <label>
                        Etunimi
                        <input required name='firstName' defaultValue={person.firstname} onChange={(e) => {
                            setInput({
                                ...currentInput,
                                firstname: e.target.value
                            });
                        }}></input>
                    </label>


                    <label>
                        Sukunimi
                        <input required name='lastName' defaultValue={person.lastname} onChange={(e) => {
                            setInput({
                                ...currentInput,
                                lastname: e.target.value
                            });
                        }}></input>
                    </label>


                    <label>
                        Ikä
                        <input required name='age' type={'number'} defaultValue={person.age} onChange={(e) => {
                            setInput({
                                ...currentInput,
                                age: parseInt(e.target.value)
                            });
                        }}></input>
                    </label>

                    <br/>

                    <button type='submit'>Muokkaa</button>
                </form>
            </div>
        </div>
    );
}