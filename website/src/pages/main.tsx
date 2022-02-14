import React, { useEffect, useState } from 'react'
import { Edit } from '../components/Edit';
import { Form } from '../components/Form';
import { Table } from '../components/Table';
import { Person } from '../interfaces';
import './main.css'

export const MainPage: React.FC = () => {
    const [people, setPeople] = useState<Person[]>([]);

    useEffect(() => {
        setPeople([{firstName: "Testi", lastName: "Ukko", age: 0}, {firstName: "Ukko", lastName: "Testi", age: 1}])
    }, [])

    function addPeople(person:Person){
        setPeople([{firstName: person.firstName, lastName: person.lastName, age: person.age}, ...people])
    }

    function removePerson(index:number){
        const temp = [...people]
        temp.splice(index, 1)
        setPeople(temp)
    }

    function handleEdit(index: number, newData:Person){
        const temp = [...people]
        temp[index] = newData
        setPeople(temp)

    }

     return(
         <div>
            <Form onSubmit={addPeople}/>
            <Table handleRemove={removePerson} handleEdit={handleEdit} people={people}/>
         </div>
     );
}