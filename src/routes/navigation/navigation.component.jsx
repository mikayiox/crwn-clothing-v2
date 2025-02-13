import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './navigation.styles.scss';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

const Navigation = () => {
 return (
    <Fragment>
        <div className="navigation">
            <Link className="nav-link" to="/">
                 <div className="logo-container"> 
                     <CrwnLogo className="logo" />
                 </div>
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">
                    Shop
                </Link>
                <Link className="nav-link" to="/auth">
                    Sign in
                </Link>
            </div> 
        </div>
        <Outlet />
    </Fragment>
  );
}

export default Navigation;