import React from 'react'
import { Link } from 'react-router-dom'


export default function StoryComments({ story, comments, formatDate, getUserIds, getComments }) {
	return (
		<div>
			<h1 className='story-title-color'>{story.title}</h1>
			<label className='desc'>by </label><Link to='/user' onClick={() => getUserIds(story.by)} className='story-desc-link'>{story.by}</Link><label className='desc'> on {formatDate(story.time)} has </label><Link to='/post' onClick={() => getComments(story.id)} className='story-desc-link'>{story.descendants}</Link><label className='desc'> comments</label>
			<ul> 
				{comments.map((comment, index) => (
					<li key={index} className='comment-list'>
						<div className='comment-desc-padding'><label className='desc'>by </label><Link to='/user' onClick={() => getUserIds(comment.by)} className='story-desc-link'>{comment.by}</Link><label className='desc'> on {formatDate(comment.time)}</label></div>
						<div dangerouslySetInnerHTML={{ __html: comment.text }} />
					</li>
				))}
			</ul>
		</div>
	)
}