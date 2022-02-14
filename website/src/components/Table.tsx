import React, { useState } from 'react'
import { Person } from '../interfaces';
import { Edit } from './Edit';
import './table.css'

interface Props {
    people: Person[]
    handleRemove(arg0: number): void
    handleEdit(arg0: number, arg1: Person): void
}

export const Table: React.FC<Props> = ({people, handleRemove, handleEdit}) => {

    const [editPerson, setEditPerson] = useState<Person>({firstName: '', lastName: '', age: 0});
    const [personIndex, setPersonIndex] = useState(0);
    const [editShown, changeEditVisibility] = useState(false);

    function changeVisibility() {
        changeEditVisibility(!editShown);
    }

    const tableData = people.map((person, index) => {
        return(
            <tr key={index}>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>{person.age}</td>
                <td className='control'>
                    <button onClick={() => handleRemove(index)}>
                        Poista
                    </button>

                    <button onClick={() => {
                        setEditPerson(people[index]);
                        setPersonIndex(index);
                        changeEditVisibility(!editShown);
                    }}>
                        Muokkaa
                    </button>
                </td>
            </tr>
        );
    });

     return(
         <div>
            {editShown ? <Edit index={personIndex} person={editPerson} changeVisibility={changeVisibility} handleEdit={handleEdit}/> : <div/>}
            
            <table className='table'>
                <thead>
                    <tr>
                        <th>Etunimi</th>
                        <th>Sukunimi</th>
                        <th>Ikä</th>
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