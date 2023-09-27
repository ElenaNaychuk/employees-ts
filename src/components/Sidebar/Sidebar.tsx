import style from "./Sidebar.module.scss";
import React, {useState} from "react";
import {findEmployees} from "../../jsonPlaceholderServer/EmployeeRepository";
import {IEmployee} from "../../domain/IEmployee";

const Sidebar: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [foundUsers, setFoundUsers] = useState<IEmployee[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        setIsLoading(true);

        const result = await findEmployees(inputValue);
        if(result.success) {
            setFoundUsers([...foundUsers, result.user as IEmployee]);
            setInputValue('');
        } else {
            setLoadingError(true);
        }

        setIsLoading(false);
    }

    return (
        <aside className={style.container}>
            <p className={style.subtitle}>Поиск сотрудников</p>
            <form
                className={style.form}
                onSubmit={(e) => handleSubmit(e)}
            >
                <input
                    className={style.input}
                    placeholder="Введите имя или id"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </form>
            <p className={style.subtitle}>Результаты</p>
            {!foundUsers.length && !isLoading &&
                <p className={style.text}>Начните поиск</p>
            }
            {isLoading &&
                <p className={style.text}>Loading...</p>
            }
            {foundUsers.map(user =>
                <p key={user.id} className={style.text}>{user.username}</p>
            )}

        </aside>
    )
}
export {Sidebar};