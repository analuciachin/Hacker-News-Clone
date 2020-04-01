import React from 'react'
import { ThemeConsumer } from '../contexts/theme'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'


const activeStyle = {
	color: 'rgb(187, 46, 31)'
}


export default function Nav({ onUpdateStory }) {
	return (
		<ThemeConsumer>
			{({ theme, toggleTheme }) => (
				<nav className='row space-between'>
					<ul className='row nav'>
						<li>
							<NavLink
								to='/'
								exact
								activeStyle={activeStyle}
								className='nav-link'
								onClick={() => onUpdateStory('Top')}>
									Top
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/new'
								activeStyle={activeStyle}
								className='nav-link'
								onClick={() => onUpdateStory('New')}>
									New
							</NavLink>
						</li>
					</ul>
					<button
						style={{fontSize: 30}}
						className='btn-clear'
						onClick={toggleTheme}
					>
						{theme === 'light' ? '🔦' : '💡'}
					</button>
				</nav>
			)}
		</ThemeConsumer>
	)
}

Nav.propTypes = {
	onUpdateStory: PropTypes.func.isRequired
}