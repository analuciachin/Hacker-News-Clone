import React from 'react'


export default function StoryComments({ story, comments, formatDate }) {
	return (
		<div>
			<h1 className='story-title-color'>{story.title}</h1>
			<label className='desc'>by </label><a href='#' className='story-desc-link'>{story.by}</a><label className='desc'> on {formatDate(story.time)} has </label><a href='#' className='story-desc-link'>{story.descendants}</a><label className='desc'> comments</label>
			<ul> 
				{comments.map((comment, index) => (
					<li key={index} className='comment-list'>
						<div className='comment-desc-padding'><label className='desc'>by </label><a href='#' className='story-desc-link'>{comment.by}</a><label className='desc'> on {formatDate(comment.time)}</label></div>
						<div dangerouslySetInnerHTML={{ __html: comment.text }} />
					</li>
				))}
			</ul>
		</div>
	)
}