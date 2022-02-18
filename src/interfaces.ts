export interface Person {
    id: number,
    firstname: string,
    lastname: string,
    age: number
}

export interface Sort{
    reverse: boolean,
    sort:  null | "firstname" | "lastname" | "age"
}