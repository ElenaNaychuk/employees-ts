import {IEmployee} from "../domain/IEmployee";

const URL = 'https://jsonplaceholder.typicode.com/users';

const getByUserId = async (id: string): Promise<IEmployee> => {
    let url = `${URL}/${id}`;
    const response = await fetch(url);
    const user = await response.json();
    return user;
}

const getByUserName = async (name: string): Promise<IEmployee> => {
    let url = `${URL}?username=${name}`;
    const response = await fetch(url);
    const [user] = await response.json();
    return user;
}

export const findEmployee = async (searchText: string): Promise<{ success: boolean, user?: IEmployee }> => {
    try {
        const user = await (
            !isNaN(Number(searchText))
                ? getByUserId(searchText)
                : getByUserName(searchText)
        );
        return {
            success: true,
            ...user && {user},
        };
    } catch (error) {
        console.log('Error:', {error});
        return {success: false};
    }
}
