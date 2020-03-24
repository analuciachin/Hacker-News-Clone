import React from 'react'
import { fetchTopStoryIds, fetchNewStoryIds, fetchItemInfo, fetchUserStoryIds } from '../utils/api'
import UserStories from './UserStories'
import StoryComments from './StoryComments'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


function StoriesNav({ selected, onUpdateStory }) {
//	const stories = ['Top', 'New']

/*
					<button 
						className='btn-clear nav-link'
						style={story === selected ? { color: 'rgb(187,46,31)' } : null }
						onClick={() => onUpdateStory(story)}>
						{story}
					</button>

return(
		<ul className='flex-center'>
			{stories.map((story) => (
				<li key={story}>
					<Link 
						to='/'
						className='btn-clear nav-link'
						style={story === selected ? { color: 'rgb(187,46,31)' } : null }
						onClick={() => onUpdateStory(story)}>
						{story}
					</Link>
					
				</li>
			))}
		</ul>
	)


*/
//	console.log('selected story: ', selected)
		return(
		<ul className='flex-center'>
			<li key='Top'>
				<Link 
					to='/'
					className='btn-clear nav-link'
					style={'Top' === selected ? { color: 'rgb(187,46,31)' } : null }
					onClick={() => onUpdateStory('Top')}>
					Top
				</Link>
			</li>
			<li key='New'>
				<Link 
					to='/new'
					className='btn-clear nav-link'
					style={'New' === selected ? { color: 'rgb(187,46,31)' } : null }
					onClick={() => onUpdateStory('New')}>
					New
				</Link>
			</li>
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



export default class TopNew extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedStory: 'Top',
			stories_ids: [],
			story: [],
			story_comments:[],
			story_info: [],
			user_info: [],
			user_items: [],
			error: null
		}

		this.updateStory = this.updateStory.bind(this)
		this.getUserItems = this.getUserItems.bind(this)
		this.convertDate = this.convertDate.bind(this)
		this.getStoryComments = this.getStoryComments.bind(this)
		this.getStory = this.getStory.bind(this)
	}


	componentDidMount () {
		this.updateStory(this.state.selectedStory)
	}

	updateStory(selectedStory) {
		this.setState({
			selectedStory,
			error: null,
		}, this.getStory)
	}

	getStory() {
		if(this.state.selectedStory === 'Top') {
			console.log('Top')
			fetchTopStoryIds()
				.then((data) => this.setState({
					stories_ids: data,
					story_info: []
				}, () => { 
									console.log(this.state.stories_ids)
									for (let i=0; i<50; i++) {
										fetchItemInfo(this.state.stories_ids[i])
											.then((data) => this.setState({
												story_info:[...this.state.story_info, data]
											}//, () => console.log(this.state.story_info)
											))
									}
								}
				))
				.catch((error) => {
					console.warn('Error fetching story info: ', error)
				})
		}
		else {
			console.log('New')
			fetchNewStoryIds()
				.then((data) => this.setState({
						stories_ids: data,
						story_info: []
					}, () => { 
										console.log(this.state.stories_ids)
										for (let i=0; i<50; i++) {
											fetchItemInfo(this.state.stories_ids[i])
												.then((data) => this.setState({
													story_info:[...this.state.story_info, data]
												}//, () => console.log(this.state.story_info)
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
									if(this.state.story.kids) {
										for (let i=0; i<Math.min(this.state.story.kids.length, 20); i++) {
											fetchItemInfo(this.state.story.kids[i])
												.then((data) => this.setState({
													story_comments:[...this.state.story_comments, data]
												}, () => console.log(this.state.story_comments)))
										}
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
								onUpdateStory={this.updateStory}
							/>
							<ShowStories
								stories={this.state.story_info}
								getUserIds={this.getUserItems}
								getDateTime = {this.convertDate}
								getComments = {this.getStoryComments}
							/>
						</div>
					)} />

					<Route exact path='/new' render={() => (
						<div>
							<StoriesNav
								selected={this.state.selectedStory}
								onUpdateStory={this.updateStory}
							/>
							<ShowStories
								stories={this.state.story_info}
								getUserIds={this.getUserItems}
								getDateTime = {this.convertDate}
								getComments = {this.getStoryComments}
							/>
						</div>
					)} />

						<Route path='/user' render={() => (
							<div>
								<StoriesNav
									selected={this.state.selectedStory}
									onUpdateStory={this.updateStory}
								/>
								<UserStories
									user={this.state.user_info}
									userItems={this.state.user_items}
									formatDate={this.convertDate}
									getUserIds={this.getUserItems}
									getComments={this.getStoryComments}
								/>
							</div>
						)} />
					
						<Route path='/post' render={() => (
							<div>
								<StoriesNav
									selected={this.state.selectedStory}
									onUpdateStory={this.updateStory}
								/>
								<StoryComments
									story={this.state.story}
									comments={this.state.story_comments}
									formatDate={this.convertDate}
									getUserIds={this.getUserItems}
									getComments={this.getStoryComments}
								/>
							</div>
						)} />

					</Router>
				{/*}	<div dangerouslySetInnerHTML={this.createMarkup()} />*/}
				{/*<pre>{JSON.stringify(this.state.top_stories, null, 2)}</pre>*/}
				</React.Fragment>
		)
	}

}