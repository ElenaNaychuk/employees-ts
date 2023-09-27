import {Header} from "../../components/Header/Header";
import style from "./EmployeeSearchPage.module.scss";
import {Sidebar} from "../../components/Sidebar/Sidebar";
import React from "react";
import {EmployeeInfo} from "../../components/EmployeeInfo/EmployeeInfo";

const EmployeeSearchPage:React.FC = () => {
    return(
        <div className={style.container}>
            <Header/>
            <section className={style.content}>
                <Sidebar/>
                <EmployeeInfo/>
            </section>
        </div>
    )
}
export {EmployeeSearchPage};