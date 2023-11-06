import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import Shortener from "./components/Shortener";
import Dashboard from "./components/Dashboard";
import Urls from "./components/Urls";


function App() {
	const user = localStorage.getItem("token");
    const ProtectedRoute = ({ children })=> {
		let token = localStorage.getItem("token");
		if (!token) {
			 return <Navigate to={`/login`} replace />;
		   }
		   return children;
	   
	   };
	return (
		
		<Routes>
			
		
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/password-reset/:id/:token" element={<PasswordReset />} />
			<Route path="/" exact element={<ProtectedRoute>
              <Shortener/>
            </ProtectedRoute>} />
           <Route path="/dashboard" exact element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }></Route>
          <Route path="/urls" exact element={
            <ProtectedRoute>
              <Urls/>
            </ProtectedRoute>
          }></Route>
		</Routes>
	);
}

export default App;