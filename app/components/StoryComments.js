import React from 'react'


export default function StoryComments({ story, comments, formatDate }) {
	return (
		<div>
			<h1 className='story-title-color'>{story.title}</h1>
			<label>by </label><a href='#'>{story.by}</a><label> on {formatDate(story.time)} has </label><a href='#'>{story.descendants}</a><label> comments</label>
			<ul> 
				{comments.map((comment, index) => (
					<li key={index}>
						<p>by <a href='#'>{comment.by}</a> on {comment.time}</p>
						<div dangerouslySetInnerHTML={{ __html: comment.text }} />
					</li>
				))}
			</ul>
		</div>
	)
}