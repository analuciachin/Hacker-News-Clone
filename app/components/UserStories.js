import React from 'react'
import { Link } from 'react-router-dom'
import { ThemeConsumer } from '../contexts/theme'

export default function UserStories({ user, userItems, formatDate, getUserIds, getComments }) {
	return (
		<ThemeConsumer>
		{({ theme }) => (
			<div>
				<h1>{user.id}</h1>
				<p className='desc'>joined {formatDate(user.created)} has {user.karma} karma</p>
				{user.about &&
					<div dangerouslySetInnerHTML={{ __html: user.about }} className='desc' />
				}
				<h2>Posts</h2>
				<ul>
					{userItems.map((userItem, index) => (userItem.type === 'story' && userItem.by) && (
						<li key={index} className='story-list'>
							<p><a href={userItem.url} 
										className={`story-title story-title-color-${theme}`}>{userItem.title}</a></p>
							<label>by </label><Link to='/user' onClick={() => getUserIds(userItem.by)} className={`story-desc-link-${theme}`}>{userItem.by}</Link><label> on {formatDate(userItem.time)} with </label><Link to='/post' onClick={() => getComments(userItem.id)} className={`story-desc-link-${theme}`}>{userItem.descendants}</Link> <label>comments</label>
						</li>
					))}
					{console.log(userItems)}
				</ul>
			</div>
		)}
		</ThemeConsumer>
	)
}