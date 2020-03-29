import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import TopNew from './components/TopNew'
import UserStories from './components/UserStories'
import { BrowserRouter as Router, Route } from 'react-router-dom'
//import { ThemeProvider } from './contexts/theme'

class App extends React.Component {
/*
	constructor(props) {
		super(props)

		this.state = {
			theme: 'light',
			toggleTheme: () => {
				this.setState(({ theme }) => ({
					theme: theme === 'light' ? 'dark' : 'light'
				}))
			}
		}
	}
*/
	render() {
		return (
				<React.Fragment>
					<div>
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