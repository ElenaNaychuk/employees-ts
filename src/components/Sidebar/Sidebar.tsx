import style from "./Sidebar.module.scss";
import React, {useEffect, useState} from "react";
import {findEmployee} from "../../jsonPlaceholderServer/EmployeeRepository";
import {IEmployee} from "../../domain/IEmployee";
import {EmployeeCard} from "../EmployeeCard/EmployeeCard";

type sidebarProps = {
    selectedCard: IEmployee | undefined;
    setSelectedCard: (selectedCard: IEmployee) => void;
}

const Sidebar: React.FC<sidebarProps> = ({selectedCard, setSelectedCard}) => {
    const [searchText, setSearchText] = useState('');
    const [foundUsers, setFoundUsers] = useState<IEmployee[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);

    const fetchDataFromServer = async (): Promise<void> => {
        const searchStrings = searchText
            .split(',')
            .map(item => item.trim())
            .filter(item => item !== '')
        ;

        setFoundUsers([]);
        setMessages([]);
        setLoadingError(false);
        setIsLoading(true);

        const promises = searchStrings.map((string) => findEmployee(string));
        const results = await Promise.allSettled(promises);

        const users = [];
        const messages = [];
        for (const [index, result] of results.entries()) {
            if (result.status === 'rejected') {//never happens
                continue;
            }
            if (!result.value.success) {
                setLoadingError(true);
                continue;
            }
            if (!result.value.user) {
                messages.push(`Пользователь ${searchStrings[index]} не найден`);
                continue;
            }
            users.push(result.value.user);
        }
        setFoundUsers(users);
        setMessages(messages);
        setIsLoading(false);
    };

    useEffect(() => {
        if (!searchText) {
            return;
        }
        const timer = setTimeout(fetchDataFromServer, 1500);
        return () => clearTimeout(timer);
    }, [searchText]);

    const handleCardClick = (userCard: IEmployee): void => {
        setSelectedCard(userCard);
    };

    const noFoundUsers = !foundUsers.length && !isLoading && !messages.length;

    return (
        <aside className={style.container}>
            <h5 className={style.subtitle}>Поиск сотрудников</h5>
            {loadingError &&
                <p className={style.errorText}>При загрузке произошла ошибка...</p>
            }
            <form className={style.form}>
                <input
                    className={style.input}
                    placeholder="Введите id или имя"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    title="Вводите имена или id через запятую"
                />
            </form>
            <h5 className={style.subtitle}>Результаты</h5>
            {messages.map(message =>
                <p className={style.text} key={Date.now() - Math.random()}>
                    {message}
                </p>)
            }
            <div className={style.results}>
                {isLoading &&
                    <p className={style.text}>Loading...</p>
                }
                {noFoundUsers
                    ? <p className={style.text}>Начните поиск</p>
                    : foundUsers.map(user =>
                        <EmployeeCard
                            user={user}
                            isSelectedCard={selectedCard?.id === user.id}
                            key={user.id}
                            selectCard={() => handleCardClick(user)}
                        />
                    )
                }
            </div>
        </aside>
    )
}
export {Sidebar};