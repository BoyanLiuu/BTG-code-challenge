import Home from "./pages/Home";
import { GlobalStyle, lightTheme, darkTheme } from "./Theme";
import { ThemeProvider } from "styled-components";
import { Header } from "./components/index";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
	//check localstorage and see if we store dark/light
	const themeFlag = () => {
		if (localStorage.mode) {
			return localStorage.mode === "true";
		}
		return true;
	};
	const [theme, setTheme] = useState(themeFlag());
	// handle switch light them, dark them.
	const themeToggler = () => {
		setTheme(!theme);
	};

	// update localstorage whenever we switch theme
	useEffect(() => {
		localStorage.setItem("mode", theme);
	}, [theme]);

	return (
		<Router>
			<ThemeProvider theme={theme ? lightTheme : darkTheme}>
				<GlobalStyle />
				<Header themeToggler={themeToggler} />
				<main>
					<Switch>
						<Route path='/' exact component={Home} />
					</Switch>
				</main>
			</ThemeProvider>
		</Router>
	);
}

export default App;
