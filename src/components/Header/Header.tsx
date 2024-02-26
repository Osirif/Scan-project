import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchAccountInfo } from '../../store/slice/accountInfoSlice';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../../store/slice/authorizationSlice';
import { HeaderBurger } from '../HeaderBurger/HeaderBurger';
import { AccountInfo } from './AccountInfo';

import styles from './header.module.scss';
import logo from '../../assets/icons/header-logo.svg';
import userImg from '../../assets/images/userImg.jpg';


export const Header: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLogged = useAppSelector((state) => state.auth.isLogged);
    const accessToken = useAppSelector((state) => state.auth.accessToken);

    useEffect(() => {
        if (isLogged) {
            dispatch(fetchAccountInfo(accessToken));
        }
    }, [dispatch, isLogged, accessToken])

    function handleLogOut() {
        dispatch(logOut());
        navigate("/");
    }

    return (
        <header className={styles.header}>
            <div className='container'>
                
                <div className={styles.header__content}>

                    <div className={styles.header__logo}>
                        <img src={logo} alt='' />
                    </div>

                    <div className={styles.header__nav}>
                        <Link to="/" className={styles.header__nav_item}>Главная</Link>
                        <Link to="/" className={styles.header__nav_item}>Тарифы</Link>
                        <Link to="/" className={styles.header__nav_item}>FAQ</Link>
                    </div>

                    {
                        isLogged ?
                            <div className={styles.isLogged__wrapper}>
                                <AccountInfo />

                                <div className={styles.header__user_info_wrapper}>
                                    <div className={styles.user__info}>
                                        <span className={styles.user__name}>Алексей А.</span>
                                        <button onClick={handleLogOut} className={styles.logout__button}>Выйти</button>
                                    </div>
                                    <div>
                                        <img src={userImg} className={styles.user__logo} alt="фото"/>
                                    </div>
                                </div>
                            </div>
                        :
                            <div className={styles.header__login_wrapper}>
                                <span className={styles.header__register_link}>Зарегистрироваться</span>
                                <span className={styles.header__login_line}></span>
                                <Link to="/login" className={styles.header__login_button}>Войти</Link>
                            </div>
                    }

                    <div className={styles.header__burger_wrapper}>
                        <HeaderBurger />
                    </div>

                </div>

            </div>
        </header>
    )
}