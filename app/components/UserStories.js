import React from 'react'


export default function UserStories({ user, userItems, formatDate }) {
	return (
		<div>
			<h1>{user.id}</h1>
			<p className='desc'>joined {formatDate(user.created)} has {user.karma} karma</p>
			<h2>Posts</h2>
			<ul>
				{userItems.map((userItem, index) => (userItem.type === 'story' && userItem.by) && (
					<li key={index} className='story-list'>
						<p><a href={userItem.url} className='story-title story-title-color'>{userItem.title}</a></p>
						<p>by <a href='#'>{userItem.by}</a> on {formatDate(userItem.time)} with <a href='#'>{userItem.descendants}</a> comments</p>
					</li>
				))}
				{console.log(userItems)}
			</ul>
		</div>
	)
}