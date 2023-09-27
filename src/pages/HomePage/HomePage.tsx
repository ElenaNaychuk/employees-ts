import {Header} from "../../components/Header/Header";
import style from "./HomePage.module.scss"

const HomePage = () => {
    return(
        <div className={style.container}>
            <Header/>
            <div className={style.text}>Тут будет контент...</div>
        </div>
    )
}
export {HomePage};