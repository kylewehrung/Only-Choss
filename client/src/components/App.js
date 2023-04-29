import React, { useEffect, useState, createContext, useContext } from "react";
import { UserContext } from "./context";
import { Switch, Route, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";
import Home from "./Home";
import NavBar from "./NavBar";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import BoulderList from "./BoulderList";
import BoulderPage from "./BoulderPage";
import AddChoss from "./AddChoss";
import EditChoss from "./EditChoss";




function App() {

	const [user, setUser] = useState(null);
	const [showLogin, setShowLogin] = useState(true);
	const history = useHistory();

	useEffect(() => {
		fetch("/check_session").then((r) => {
			if (r.ok) {
				r.json().then((user) => setUser(user));
			}
		});
	}, []);


	const handleLogin = (user) => {
		setUser(user);
		history.push("/");
	};



	if (!user) return (
		<Wrapper>
			<Logo>Only Choss</Logo>
			{showLogin ? (
				<>
					<LoginForm onLogin={handleLogin} />
					<Divider />
					<p>
						Not an Only Choss member? &nbsp;
						<Button color="secondary" onClick={() => setShowLogin(false)}>
							Sign Up
						</Button>
					</p>
				</>
			) : (
				<>
					<SignUpForm onLogin={handleLogin} />
					<Divider />
					<p>
						Already a Choss Member? &nbsp;
						<Button color="secondary" onClick={() => setShowLogin(true)} >
							Log In
						</Button>
					</p>
				</>
			)}
		</Wrapper>
	);




  return (
	<AppWrapper>
	 <UserContext.Provider value={{ user, setUser }}>
      
		<NavBar user={user} setUser={setUser} />
		<MainContainer>
			<Switch>
				{/* <Route path="/boulders/:area/:boulderId/:edit-choss">
					<EditChoss />
				</Route> */}
				<Route path="/boulders/:area/:boulderId/:add-choss">
					<AddChoss />
				</Route>
				<Route path="/boulders/:area/:boulderId">
					<BoulderPage />
				</Route>
				<Route path="/boulders/:area">
					<BoulderList />
				</Route>
				<Route path="/">
					<Home user={user} />
				</Route>
			</Switch>
		</MainContainer>
		</UserContext.Provider>
	</AppWrapper>
  );
}




//App 


const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AppWrapper = styled.div`
  height: 100%;
`;



//Login 

const Logo = styled.h1`
  font-family: 'cascadia';
  font-size: 4rem;
  color: #f8f0e3;
  position: absolute;
  top: 25px;
`;

const Wrapper = styled.section`
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover; /* cover entire background */
  background-position: center; /* center the image */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.9;
  overflow: hidden; /* hide any overflow content, including the white border */

  & > form {
    position: relative;
    width: 400px;
    margin-top: 30px;
  }

  & > p {
    color: #fff; /* change font color to white */
  }
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
`;




export default App;
