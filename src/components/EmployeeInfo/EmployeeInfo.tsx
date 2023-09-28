import React from "react";
import style from "./EmployeeInfo.module.scss"
import {IEmployee} from "../../domain/IEmployee";
import bigDefaultAvatar from "../../assets/images/bigDefaultAvatar.png"

type employeeInfoProps = {
    selectedEmployee: IEmployee | undefined;
}

const EmployeeInfo: React.FC<employeeInfoProps> = ({selectedEmployee}) => {
    if (!selectedEmployee) {
        return <p className={style.defaultText}>Выберите сотрудника, чтобы посмотреть его профиль</p>
    }
    return <div className={style.container}>
        <div className={style.info}>
            <img
                className={style.photo}
                src={bigDefaultAvatar}
                alt="avatar"
            />
            <div className={style.content}>
                <h4 className={style.title}>{selectedEmployee?.name}</h4>
                <p className={style.text}>
                    <span className={style.selectedText}>email: </span>{selectedEmployee?.email}
                </p>
                <p className={style.text}>
                    <span className={style.selectedText}>phone: </span>{selectedEmployee?.phone}
                </p>
                <h4 className={style.title}>О себе:</h4>
                <p className={style.text}> {/* заглушка так как таких данных у фейкового API нет*/}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>
    </div>
}
export {EmployeeInfo};