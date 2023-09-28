import {IEmployee} from "../domain/IEmployee";

const URL = 'https://jsonplaceholder.typicode.com/users';

export const findEmployees = async (value: string): Promise<{ success: boolean, user?: IEmployee }> => {
    try {
        // if(typeof value === "number") {
        //     const response = await fetch(`${URL}/${value}`);
        //     return await response.json();
        // }
        const response = await fetch(`${URL}?username=${value}`);
        const [user] = await response.json();
        return {
            success: true,
            ...user && {user},
        }
    } catch (error) {
        console.log(`Error: ${error}`);
        return {success: false};
    }
}
