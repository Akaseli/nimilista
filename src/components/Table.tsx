import React, { useEffect, useState } from 'react'
import { Person, Sort } from '../interfaces';
import { Edit } from './Edit';
import './table.css'
import arrow from './arrow.svg'

interface Props {
    people: Person[]
    handleRemove(arg0: number): void
    handleEdit(arg0: number, arg1: Person): void
    changeSort(arg0: Sort): void
}

export const Table: React.FC<Props> = ({ people, handleRemove, handleEdit, changeSort }) => {

    const [editPerson, setEditPerson] = useState<Person>({id: 0, firstname: '', lastname: '', age: 0 });
    const [personIndex, setPersonIndex] = useState(0);
    const [editShown, changeEditVisibility] = useState(false);

    function changeVisibility() {
        changeEditVisibility(!editShown);
    }

    const [sort, setSort] = useState<Sort>({ reverse: false, sort: null });

    useEffect(() => {
        changeSort(sort)
    }, [sort]);

    function handleSortChange(origin: "firstname" | "lastname" | "age") {
        switch (origin) {
            case 'firstname':
                if (sort.sort === 'firstname') {
                    if (sort.reverse) {
                        setSort({ reverse: false, sort: null });
                        return
                    }
                    else {
                        setSort({ ...sort, reverse: true });
                        return
                    }
                }
                else {
                    setSort({ reverse: false, sort: 'firstname' });
                    return
                }
            case 'lastname':
                if (sort.sort === 'lastname') {
                    if (sort.reverse) {
                        setSort({ reverse: false, sort: null });
                        return
                    }
                    else {
                        setSort({ ...sort, reverse: true });
                        return
                    }
                }
                else {
                    setSort({ reverse: false, sort: 'lastname' });
                    return
                }
            case 'age':
                if (sort.sort === 'age') {
                    if (sort.reverse) {
                        setSort({ reverse: false, sort: null });
                        return
                    }
                    else {
                        setSort({ ...sort, reverse: true });
                        return
                    }
                }
                else {
                    setSort({ reverse: false, sort: 'age' });
                    return
                }

        }
    }

    const tableData = people.map((person, index) => {
        return (
            <tr key={index}>
                <td>{person.firstname}</td>
                <td>{person.lastname}</td>
                <td>{person.age}</td>
                <td className='control'>
                    <button onClick={() => handleRemove(person.id)}>
                        Poista
                    </button>

                    <button onClick={() => {
                        setEditPerson(person);
                        setPersonIndex(person.id); 
                        changeEditVisibility(!editShown);
                    }}>
                        Muokkaa
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <div>
            {editShown ? <Edit index={personIndex} person={editPerson} changeVisibility={changeVisibility} handleEdit={handleEdit} /> : <div />}

            <table className='table'>
                <thead>
                    <tr>
                        <th onClick={() => {
                            handleSortChange("firstname")
                        }} className={sort.sort === "firstname" ? "sorted" : "unsorted"}>
                            Etunimi

                            {sort.sort === "firstname" && !sort.reverse? <img className='sort' src={arrow}/> : null}

                            {sort.sort === "firstname" && sort.reverse ? <img className='sortReverse' src={arrow}/> : null}
                        </th>

                        <th onClick={() => {
                            handleSortChange("lastname")
                        }} className={sort.sort === "lastname" ? "sorted" : "unsorted"}>
                            Sukunimi
                            {sort.sort === "lastname" && !sort.reverse? <img className='sort' src={arrow}/> : null}

                            {sort.sort === "lastname" && sort.reverse ? <img className='sortReverse' src={arrow}/> : null}
                        </th>

                        <th onClick={() => {
                            handleSortChange("age")
                        }} className={sort.sort === "age" ? "sorted" : "unsorted"}>
                            Ikä

                            {sort.sort === "age" && !sort.reverse? <img className='sort' src={arrow}/> : null}

                            {sort.sort === "age" && sort.reverse ? <img className='sortReverse' src={arrow}/> : null}
                        </th>

                        {/*Muokkaus nappuloille sarake*/}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {tableData}
                </tbody>
            </table>
        </div>
    );
}