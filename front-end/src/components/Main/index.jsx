import styles from "./styles.module.css";
import { Link} from 'react-router-dom'
import Shortener from "../Shortener";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>URL Shortener</h1>
				<ul>
            <li>
              
              <Link to="/">Home</Link>
            </li>
            <li>
              
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              
              <Link to="/urls">URLs</Link>
            </li>
            
          </ul>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			 
		</div>
	);
};

export default Main;