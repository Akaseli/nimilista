import React, { useState } from 'react'
import { Person } from '../interfaces';
import './form.css'

interface Props {
    onSubmit(arg0: Person): void
}

export const Form: React.FC<Props> = ({onSubmit}) => {
    const [currentInput, setInput] = useState<Person>({id: 0, firstname: '', lastname: '', age: 0});

    const formRef = React.createRef<HTMLFormElement>();

    return (
        <form ref={formRef} onSubmit={(e) => {
            e.preventDefault();
            onSubmit(currentInput);
            formRef.current?.reset()
        }}>
            <label>
                Etunimi
                <input required name='firstName' onChange={(e) => {
                    setInput({
                        ...currentInput,
                        firstname: e.target.value
                    });
                }}></input>
            </label>
            

            <label>
                Sukunimi
                <input required name='lastName' onChange={(e) => {
                    setInput({
                        ...currentInput,
                        lastname: e.target.value
                    });
                }}></input>
            </label>


            <label>
                Ikä
                <input  required name='age' type={'number'} onChange={(e) => {
                    setInput({
                        ...currentInput,
                        age: parseInt(e.target.value)
                    });
                }}></input>
            </label>
            
            <button type='submit'>Lisää</button>
        </form>
    );
}