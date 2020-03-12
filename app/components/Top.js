import React from 'react'
import { fetchStoryIds, fetchItemInfo, fetchUserStoryIds } from '../utils/api'
import UserStories from './UserStories'
import StoryComments from './StoryComments'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


function StoriesNav({ selected, onUpdateLanguage }) {
	const stories = ['Top', 'New']

	return(
		<ul className='flex-center'>
			{stories.map((story) => (
				<li key={story}>
					<button 
						className='btn-clear nav-link'
						style={story === selected ? { color: 'rgb(187,46,31)' } : null }
						onClick={() => onUpdateLanguage(story)}>
						{story}
					</button>
					
				</li>
			))}
		</ul>
	)
}

function ShowStories({ stories, getUserIds, getDateTime, getComments }) {
	return (
		<ul>
			{stories.map((story, index) => (
				<li key={index} className='story-list'>
					<p><a href={story.url} className='story-title story-title-color'>{story.title}</a></p>
					<label className='desc'>by</label> <Link to='/user' onClick={() => getUserIds(story.by)} className='story-desc-link'>{story.by}</Link> <label className='desc'>on {getDateTime(story.time)} with</label> <Link to='/post' onClick={() => getComments(story.id)} className='story-desc-link'>{story.descendants}</Link> <label className='desc'>comments</label>
				</li>
			))}
		</ul>
	)
}



export default class Top extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedStory: 'Top',
			stories_ids: [],
			story: [],
			story_comments:[],
			top_stories: [],
			user_info: [],
			user_items: [],
			error: null
		}

		this.updateStory = this.updateStory.bind(this)
		this.getUserItems = this.getUserItems.bind(this)
		this.convertDate = this.convertDate.bind(this)
		this.getStoryComments = this.getStoryComments.bind(this)
	}


	componentDidMount () {
		this.updateStory(this.state.selectedStory)
	}

	updateStory(selectedStory) {
		this.setState({
			selectedStory,
			error: null,
		})

		if(this.state.selectedStory === 'Top') {
			fetchStoryIds()
				.then((data) => this.setState({
					stories_ids: data
				}, () => { 
									console.log(this.state.stories_ids)
									for (let i=0; i<9; i++) {
										fetchItemInfo(this.state.stories_ids[i])
											.then((data) => this.setState({
												top_stories:[...this.state.top_stories, data]
											}, () => console.log(this.state.top_stories)
											))
									}
								}
				))
				.catch((error) => {
					console.warn('Error fetching story info: ', error)
				})
		}
	}


	getUserItems(username) {
		fetchUserStoryIds(username)
			.then((data) => this.setState({
				user_info: data,
				user_items: []
			}, () => {
								//console.log(this.state.user_info)
								for(let i=0; i<Math.min(this.state.user_info.submitted.length, 30); i++) {
									console.log(i)
									fetchItemInfo(this.state.user_info.submitted[i])
										.then((data) => this.setState({
											user_items:[...this.state.user_items, data]
										}))
								}
							}
			))
	}


	getStoryComments(id) {
		console.log(id)
		fetchItemInfo(id)
			.then((data) => this.setState({
				story: data,
				story_comments: []
			}, () => {	console.log(this.state.story.kids)
									for (let i=0; i<Math.min(this.state.story.kids.length, 20); i++) {
										fetchItemInfo(this.state.story.kids[i])
											.then((data) => this.setState({
												story_comments:[...this.state.story_comments, data]
											}, () => console.log(this.state.story_comments)))
									}
								}))
	}


	convertDate(unixTimestamp) {
		const theDate = new Date(unixTimestamp * 1000)
		const dateString = theDate.toGMTString()
		return dateString
	}


	render() {
		return (
				<React.Fragment>
				<Router>
					<Route exact path='/' render={() => (
						<div>
						<StoriesNav
							selected={this.state.selectedStory}
							onUpdateLanguage={this.updateStory}
						/>
						<ShowStories
							stories={this.state.top_stories}
							getUserIds={this.getUserItems}
							getDateTime = {this.convertDate}
							getComments = {this.getStoryComments}
						/>
						</div>
					)} />

						<Route path='/user' render={() => (
							<UserStories
								user={this.state.user_info}
								userItems={this.state.user_items}
								formatDate={this.convertDate}
							/>
						)} />
					
						<Route path='/post' render={() => (
							<StoryComments
								story={this.state.story}
								comments={this.state.story_comments}
								formatDate={this.convertDate}
							/>
						)} />

					</Router>
				{/*}	<div dangerouslySetInnerHTML={this.createMarkup()} />*/}
				{/*<pre>{JSON.stringify(this.state.top_stories, null, 2)}</pre>*/}
				</React.Fragment>
		)
	}

}