import React, { useEffect, useState } from 'react'
import { Person, Sort, SortedPeople } from '../interfaces';
import { Edit } from './Edit';
import './table.css'
import arrow from './arrow.svg'

interface Props {
    people: SortedPeople[]
    handleRemove(arg0: number): void
    handleEdit(arg0: number, arg1: Person): void
    changeSort(arg0: Sort): void
}

export const Table: React.FC<Props> = ({ people, handleRemove, handleEdit, changeSort }) => {

    const [editPerson, setEditPerson] = useState<Person>({ firstName: '', lastName: '', age: 0 });
    const [personIndex, setPersonIndex] = useState(0);
    const [editShown, changeEditVisibility] = useState(false);

    function changeVisibility() {
        changeEditVisibility(!editShown);
    }

    const [sort, setSort] = useState<Sort>({ reverse: false, sort: null });

    useEffect(() => {
        changeSort(sort)
    }, [sort]);

    function handleSortChange(origin: "firstName" | "lastName" | "age") {
        switch (origin) {
            case 'firstName':
                if (sort.sort === 'firstName') {
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
                    setSort({ reverse: false, sort: 'firstName' })
                    return
                }
            case 'lastName':
                if (sort.sort === 'lastName') {
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
                    setSort({ reverse: false, sort: 'lastName' })
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
                    setSort({ reverse: false, sort: 'age' })
                    return
                }

        }
    }

    const tableData = people.map((person, index) => {
        return (
            <tr key={index}>
                <td>{person.person.firstName}</td>
                <td>{person.person.lastName}</td>
                <td>{person.person.age}</td>
                <td className='control'>
                    <button onClick={() => handleRemove(index)}>
                        Poista
                    </button>

                    <button onClick={() => {
                        setEditPerson(people[index].person);
                        setPersonIndex(person.mainIndex);
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
                            handleSortChange("firstName")
                        }} className={sort.sort === "firstName" ? "sorted" : "unsorted"}>
                            Etunimi

                            {sort.sort === "firstName" && !sort.reverse? <img className='sortReverse' src={arrow}/> : null}

                            {sort.sort === "firstName" && sort.reverse ? <img className='sort' src={arrow}/> : null}
                        </th>

                        <th onClick={() => {
                            handleSortChange("lastName")
                        }} className={sort.sort === "lastName" ? "sorted" : "unsorted"}>
                            Sukunimi
                            {sort.sort === "lastName" && !sort.reverse? <img className='sortReverse' src={arrow}/> : null}

                            {sort.sort === "lastName" && sort.reverse ? <img className='sort' src={arrow}/> : null}
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