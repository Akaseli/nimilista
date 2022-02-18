import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form } from '../components/Form';
import { Table } from '../components/Table';
import { Person, Sort } from '../interfaces';
import './main.css'

export const MainPage: React.FC = () => {
    const [people, setPeople] = useState<Person[]>([]);
    const [sort, setSort] = useState<Sort>({reverse: false, sort: null});

    const [sortedPeople, setSortedPeople] = useState<Person[]>([]);

    useEffect(() => {
        axios.get("/people").then((response) => {
            if(response.status == 200){
                setPeople(response.data);
            }
        });
    }, [])

    function addPeople(person:Person){
        axios.post("/addPerson", {"firstName" : person.firstname, "lastName" : person.lastname, "age" : person.age})
        .then((response) => {
            setPeople([...people, {id: response.data.id, firstname: person.firstname, lastname: person.lastname, age: person.age}]);
        });
    }

    function removePerson(id:number){
        axios.delete(`/delete/${id}`);
        const temp = [...people];
        setPeople(temp.filter((person) => person.id != id));
    }

    function handleEdit(id: number, newData:Person){
        axios.put(`/people/modify/${id}`,  {"firstName" : newData.firstname, "lastName" : newData.lastname, "age" : newData.age})

        const temp = [...people]

        const index = temp.map((person) => {return person.id}).indexOf(id)
        temp[index] = newData
        setPeople(temp)
    }

    function changeSort(value:Sort){
        setSort(value);
    }

    useEffect(() => {
        const temp:Person[] = [...people];

        if(sort.sort === null){
            setSortedPeople(temp.reverse());
            return;
        };

        //Iän mukaan
        if(sort.sort == "age"){
            temp.sort((a, b) => {
                return b.age - a.age;
            });
        }
        
        //Etu/sukunimen mukaan
        else{
            temp.sort((a, b) => {
                if(sort.sort == "firstname"){
                    const result = a.firstname.localeCompare(b.firstname);
                    
                    return result !== 0 ? result : a.lastname.localeCompare(b.lastname);
                }

                if(sort.sort == "lastname"){
                    const result = a.lastname.localeCompare(b.lastname);

                    return result !== 0 ? result : a.firstname.localeCompare(b.firstname);
                }

                return 0;
            })
        }

       

        if(sort.reverse){
            setSortedPeople(temp.reverse());
        }
        setSortedPeople(temp);
        
    }, [people, sort]);

     return(
         <div>
             <h3>Lisää henkilö</h3>
            <Form onSubmit={addPeople}/>
            <p className='note'>Sarakkeita pystyy laittelemaan painamalla sarakkeen otsikkoa.</p>
            <Table changeSort={changeSort} handleRemove={removePerson} handleEdit={handleEdit} people={sortedPeople}/>
         </div>
     );
}