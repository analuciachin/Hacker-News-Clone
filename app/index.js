import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import TopNew from './components/TopNew'
import UserStories from './components/UserStories'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {
	render() {
		return (
			<React.Fragment>
			<div className='container'>
				<TopNew />
			</div>
			</React.Fragment>
		)
	}
}


ReactDOM.render(
	<App />,
	document.getElementById('app')
)