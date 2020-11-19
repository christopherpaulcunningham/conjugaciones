import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Options from "./components/Options/Options";
import Game from "./components/Game/Game";
import Footer from './components/Footer/Footer';

function App() {
	return (
		<div className="container">
			<Router>
				<Header />
				<Switch>
					<Route path="/" exact component={Options} />
					<Route path="/game" component={Game} />
				</Switch>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
