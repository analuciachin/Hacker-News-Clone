import React from 'react'
import { Link } from 'react-router-dom'
import { ThemeConsumer } from '../contexts/theme'

export default function StoryComments({ story, comments, formatDate, getUserIds, getComments }) {
	return (
		<ThemeConsumer>
		{({ theme }) => (
			<div>
				<h1 className={`story-title-color-${theme}`}>{story.title}</h1>
				<label className='desc'>by </label><Link to='/user' onClick={() => getUserIds(story.by)} className={`story-desc-link-${theme}`}>{story.by}</Link><label className='desc'> on {formatDate(story.time)} has </label><Link to='/post' onClick={() => getComments(story.id)} className={`story-desc-link-${theme}`}>{story.descendants}</Link><label className='desc'> comments</label>

				{story.descendants > 0 && (
					<ul> 
						{comments.map((comment, index) => (!comment.deleted && (
							<li key={index} className={`comment-list-${theme}`}>
								<div className='comment-desc-padding'><label className='desc'>by </label><Link to='/user' onClick={() => getUserIds(comment.by)} 
										className={`story-desc-link-${theme}`}>{comment.by}</Link><label className='desc'> on {formatDate(comment.time)}</label></div>
								<div dangerouslySetInnerHTML={{ __html: comment.text }} className={`comment-${theme}`}/>
							</li>
							)
						))}
					</ul>
				)}
			</div>
		)}
		</ThemeConsumer>
	)
}