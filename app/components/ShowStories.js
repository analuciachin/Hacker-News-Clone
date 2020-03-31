import React from 'react'
import { Link } from 'react-router-dom'
import { ThemeConsumer } from '../contexts/theme'


export default function ShowStories({ stories, getUserIds, getDateTime, getComments }) {
	return (
		<ThemeConsumer>
		{({ theme }) => (
			<ul>
				{stories.map((story, index) => (
					<li key={index} className='story-list'>
						<p><a href={story.url} className={`story-title story-title-color-${theme}`}>{story.title}</a></p>
						<label className='desc'>by </label>
						<Link to={{
											pathname: '/user',
											search: `?id=${story.by}`
											}}
									onClick={() => getUserIds(story.by)}
									className={`story-desc-link-${theme}`}>
									{story.by}
						</Link> 
						<label className='desc'> on {getDateTime(story.time)} with </label>
						<Link to={{
										pathname: '/post',
										search: `?id=${story.id}`}}
									onClick={() => getComments(story.id)} 
									className={`story-desc-link-${theme}`}>
									{story.descendants}
						</Link>
						<label className='desc'> comments</label>
					</li>
				))}
			</ul>
		)}
		</ThemeConsumer>
	)
}