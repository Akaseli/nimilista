export interface Person {
    firstName: string,
    lastName: string,
    age: number
}

export interface SortedPeople{
    person: Person,
    mainIndex: number
}

export interface Sort{
    reverse: boolean,
    sort:  null | "firstName" | "lastName" | "age"
}