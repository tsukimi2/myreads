import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import './App.css';
import BooklistContainer from './BooklistContainer';
import Search from './Search';

class App extends Component {
	render() {
		return(
			<BrowserRouter history={createBrowserHistory()}>
				<div className="app">		
					<Route exact={true} path="/" component={BooklistContainer} />
					<Route path="/mybooks" component={BooklistContainer} />
					<Route path="/search" component={Search} />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
