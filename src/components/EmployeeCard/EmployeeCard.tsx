import React from "react";
import {IEmployee} from "../../domain/IEmployee";
import style from "./EmployeeCard.module.scss";

type employeeCardProps = {
    user: IEmployee;
    isSelectedCard: boolean;
    selectCard: (user: IEmployee) => void;
}

const EmployeeCard: React.FC<employeeCardProps> = ({user, isSelectedCard, selectCard}) => {

    const isSelected = isSelectedCard ? style.isSelected : '';

    return (
        <div className={style.container}>
            <div className={style.avatar}/>
            <div
                className={`${style.userInfo} ${isSelected}`}
                onClick={() => selectCard(user)}
            >
                <p className={style.userName}>{user.username}</p>
                <p className={style.userEmail}>{user.email}</p>
            </div>
        </div>
    )
}
export {EmployeeCard};