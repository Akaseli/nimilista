import React, { useEffect, useState } from 'react'
import { Edit } from '../components/Edit';
import { Form } from '../components/Form';
import { Table } from '../components/Table';
import { Person, Sort, SortedPeople } from '../interfaces';
import './main.css'



export const MainPage: React.FC = () => {
    const [people, setPeople] = useState<Person[]>([]);
    const [sort, setSort] = useState<Sort>({reverse: false, sort: null});

    const [sortedPeople, setSortedPeople] = useState<SortedPeople[]>([]);

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
    function changeSort(value:Sort){
        setSort(value);
    }

    useEffect(() => {
        const temp:SortedPeople[] = people.map((person, index) => {
            return({mainIndex: index, person: person})
        })
        if(sort.sort === null){
            setSortedPeople(temp);
            return;
        };
        const sortVal = sort.sort;

        temp.sort((a, b) => {
            if(a.person[sortVal] > b.person[sortVal]){
                return -1;
            }
            if(a.person[sortVal] < b.person[sortVal]){
                return 1;
            }
            return 0;
        })

        if(sort.reverse){
            setSortedPeople(temp.reverse());
        }
        setSortedPeople(temp);
        
    }, [people, sort]);

     return(
         <div>
             <h3>Lisää henkilö</h3>
            <Form onSubmit={addPeople}/>
            <Table changeSort={changeSort} handleRemove={removePerson} handleEdit={handleEdit} people={sortedPeople}/>
         </div>
     );
}