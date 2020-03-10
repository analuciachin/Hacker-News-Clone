import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Top from './components/Top'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Router>
					<Route exact path='/' component={Top} />
				</Router>
			</React.Fragment>
		)
	}
}


ReactDOM.render(
	<App />,
	document.getElementById('app')
)