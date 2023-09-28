import style from "./Sidebar.module.scss";
import React, {useEffect, useState} from "react";
import {findEmployees} from "../../jsonPlaceholderServer/EmployeeRepository";
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
        setIsLoading(true);

        const searchStrings = searchText
            .split(',')
            .map(item => item.trim())
            .filter(item => item !== '')
        ;

        const promises = searchStrings.map((string) => findEmployees(string));
        const results = await Promise.allSettled(promises);

        const users = [];
        const messages = [];
        for (const [index, result] of results.entries()) {
            if (result.status === 'rejected') {
                return;
            }
            if (!result.value.success) {
                setLoadingError(true);
                return;
            }
            if (result.value.user) {
                users.push(result.value.user);
            } else {
                messages.push(`Пользователь ${searchStrings[index]} не найден`);
            }
        }
        setFoundUsers(users);
        setMessages(messages);
        setIsLoading(false);
    };

    useEffect(() => {
        if (!searchText) {
            return;
        }
        const timer = setTimeout(() => {
            setFoundUsers([]);
            setMessages([]);
            setLoadingError(false);
            fetchDataFromServer();
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchText]);

    const handleCardClick = (userCard: IEmployee): void => {
        console.log(`Нажали на карточку: ${userCard.name}`);
        setSelectedCard(userCard);
    };

    return (
        <aside className={style.container}>
            <p className={style.subtitle}>Поиск сотрудников</p>
            {loadingError &&
                <p className={style.errorText}>При загрузке произошла ошибка...</p>
            }
            <form className={style.form}>
                <label>
                    <input
                        className={style.input}
                        placeholder="Введите id или имя"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        title="Вводите имена или id через запятую"
                    />
                </label>
            </form>
            <p className={style.subtitle}>Результаты</p>
            {messages.map(message =>
                <p
                    className={style.text}
                    key={Date.now() - Math.random()}
                >
                    {message}
                </p>)
            }
            <div className={style.results}>
                {isLoading &&
                    <p className={style.text}>Loading...</p>
                }
                {!foundUsers.length && !isLoading
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