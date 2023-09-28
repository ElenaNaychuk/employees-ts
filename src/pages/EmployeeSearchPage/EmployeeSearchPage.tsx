import {Header} from "../../components/Header/Header";
import style from "./EmployeeSearchPage.module.scss";
import {Sidebar} from "../../components/Sidebar/Sidebar";
import React, {useState} from "react";
import {EmployeeInfo} from "../../components/EmployeeInfo/EmployeeInfo";
import {IEmployee} from "../../domain/IEmployee";

const EmployeeSearchPage:React.FC = () => {
    const [selectedCard, setSelectedCard] = useState<IEmployee | undefined>(undefined);

    return(
        <div className={style.container}>
            <Header/>
            <section className={style.content}>
                <Sidebar
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                />
                <EmployeeInfo selectedEmployee={selectedCard}/>
            </section>
        </div>
    )
}
export {EmployeeSearchPage};