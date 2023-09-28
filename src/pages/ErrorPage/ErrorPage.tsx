import {Header} from "../../components/Header/Header";
import style from "./ErrorPage.module.scss";

const ErrorPage = () => {
    return(
        <div className={style.container}>
            <Header/>
            <p className={style.message}>Упс... Страницы не существует.</p>
        </div>
    )
}
export {ErrorPage};