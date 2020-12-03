import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Header from './components/Header/Header';
import Options from './components/Options/Options';
import Game from './components/Game/Game';
import Feedback from './components/Feedback/Feedback';
import Footer from './components/Footer/Footer';

function useIsCurrentlyPlaying() {
	const currentlyPlaying = useSelector((state) => state.currentlyPlaying);
	return currentlyPlaying;
}

function App() {
	return (
		<div className="container">
			<Router>
				<Header />
				<Switch>
					<Route path="/" exact component={Options} />
					<PrivateRoute authenticated={useIsCurrentlyPlaying()} path="/game" component={Game}  />
					<PrivateRoute authenticated={useIsCurrentlyPlaying()} path="/feedback" component={Feedback} />
				</Switch>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
