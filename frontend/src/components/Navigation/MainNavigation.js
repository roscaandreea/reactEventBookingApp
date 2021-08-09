import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavigation.css';
import AuthContext from '../../context/auth_context';


const MainNavigation = props => {
		return(
            <AuthContext.Consumer>
             {(context) => {
                return(
			<header className="main_nav">
		    <div className="main_nav_logo">
			  <h1>Magic Stuff</h1>
		    </div>
		    <nav className="main_nav_items">
			 <ul>
             {!context.token && (
				<li>
					<NavLink to="/auth">Authenticate</NavLink>
                </li>)}
				<li>
					<NavLink to="/events">Events</NavLink>
				</li>
                {context.token && (
                <React.Fragment>
				<li>
					<NavLink to="/bookings">Bookings</NavLink>
                </li>
                <li>
                <button onClick={context.logout}>LogOut</button>
                </li>
                </React.Fragment>)}
			</ul>
		</nav>
    </header>
     );
    }}             
    
    </AuthContext.Consumer>
  );
}

export default MainNavigation;




