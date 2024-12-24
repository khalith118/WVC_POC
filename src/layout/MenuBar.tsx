import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useUserProfile } from '../provider/UserProvider';
import { FormButton } from '../common/FormButton';
import globe from '../assets/Global_Language_Nav.svg';
export const MenuBar = () => {
    const lefMenu = [
        { name: 'Home', to: '/' },
        { name: 'Learn', to: '/' },
        { name: 'Ways To Give', to: '/' },
    ]
    const menus = [
        { name: 'Login', to: '/login' },
    ];
    const { profile, setProfile } = useUserProfile();
    console.log(profile)
    const logout = () => setProfile(null);
    return (
        <header className='menubar'>
            <div className="menubox">
                <ul className='menuitem'>
                    {lefMenu.map(
                        (menu, i) =>
                        (
                            <li key={i}>
                                <NavLink to={menu.to} className='link'>
                                    <span>{menu.name}</span >
                                </NavLink >
                            </li>
                        )
                    )}
                </ul>
            </div>
            <Link to={'/'} className="logo">
                <img src={logo} alt="" />
            </Link>
            <div className="menubox">
                <ul className="menuitem">
                    <li><FormButton className='form-button btn-empty'><img src={globe} alt="" /></FormButton></li>
                    <li><FormButton className='form-button btn-w-auto mx-1'>Take Action</FormButton></li>
                    {(profile && profile.firstName) ?
                        (
                            <li>
                                <NavLink to='/login' onClick={logout} className='link'><div className="userProfileBox">{profile?.firstName.charAt(0).toUpperCase() + (profile?.lastName??'').charAt(0).toUpperCase()}</div></NavLink>
                            </li>

                        ) : (<>
                            {menus.map(
                                (menu, i) =>
                                (
                                    <li key={i}>
                                        <NavLink to={menu.to} className='link'>
                                            <span>{menu.name}</span >
                                        </NavLink >
                                    </li>
                                )
                            )}
                        </>)}
                </ul>
            </div>

        </header>
    );
};