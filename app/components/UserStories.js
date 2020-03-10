import React from 'react'


export default function UserStories({ user, userItems }) {
	return (
		<div>
			<h2>{user.id}</h2>
			<p>joined {user.created} has {user.karma} karma</p>
			<ul>
				{userItems.map((userItem) => (userItem.type === 'story' && userItem.by) && (
					<li key={userItem.title}>
						<p><a href={userItem.url}>{userItem.title}</a></p>
						<p>by <a href='#'>{userItem.by}</a> on {userItem.time} with <a href='#'>{userItem.descendants}</a> comments</p>
					</li>
				))}
				{console.log(userItems)}
			</ul>
		</div>
	)
}