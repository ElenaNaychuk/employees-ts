import style from './Header.module.scss';
import {Link} from "react-router-dom";
import {employeePath, homePath} from "../../App";

const Header = () => {
    return(
        <header className={style.container}>
            <Link to={homePath} className={`${style.homeLink} ${style.link}`}>Жилфонд</Link>
            <Link to={employeePath} className={`${style.employeeLink} ${style.link}`}>Сотрудники</Link>
        </header>
    )
}
export {Header};