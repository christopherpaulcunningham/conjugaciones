import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
	return (
		<div className="container">
			<Router>
				<Header />
				<Footer />
			</Router>
		</div>
	);
}

export default App;
