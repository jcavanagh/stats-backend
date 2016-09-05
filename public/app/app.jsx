import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, Link, browserHistory } from 'react-router';

import Login from './login/login.jsx';
import Home from './home/home.jsx';

let store = createStore((state, action) => {
	//TODO: Actions
	return state;
});

//Init app
class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Router history={browserHistory}>
					<Route path='/' component={Home}>

					</Route>
					<Route path='login' component={Login} />
				</Router>
			</Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
