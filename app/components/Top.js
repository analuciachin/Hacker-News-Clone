import React from 'react'
import { fetchStoryIds, fetchItemInfo, fetchUserStoryIds } from '../utils/api'
import UserStories from './UserStories'
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

function ShowStories({ stories, getUserIds, getDateTime }) {
	return (
		<ul>
			{stories.map((story) => (
				<li key={story.title}>
					<p><a href={story.url}>{story.title}</a></p>
					<p>by <Link to='/user' onClick={() => getUserIds(story.by)}>{story.by}</Link></p>
{/*					<p>by <a href='#' onClick={() => getUserIds(story.by)}>{story.by}</a> on {getDateTime(story.time)} with <a href='#'>{story.descendants}</a> comments</p>
*/}
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
			top_stories: [],
			user_info: [],
			user_items: [],
			error: null
		}

		this.updateStory = this.updateStory.bind(this)
		//this.getStoryInformation = this.getStoryInformation.bind(this)
		this.createMarkup = this.createMarkup.bind(this)
		this.getUserItems = this.getUserItems.bind(this)
		this.convertDate = this.convertDate.bind(this)
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
									for (let i=0; i<30; i++) {
										fetchItemInfo(this.state.stories_ids[i])
											.then((data) => this.setState({
												top_stories:[...this.state.top_stories, data]
											}, () => console.log(this.state.top_stories)))
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
				user_info: data
			}, () => {
								console.log(this.state.user_info)
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

	convertDate(unixTimestamp) {
		const theDate = new Date(unixTimestamp * 1000)
		const dateString = theDate.toGMTString()
		return dateString
	}


	createMarkup() {
		return {
			__html: "<h1>This is example for dangerouslySetInnerHTML attribute.</h1>"
		}
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
						/>
						</div>
					)} />

{/*					{ this.state.user_items.length > 0 && */}
						<Route path='/user' render={() => (
							<UserStories
								user={this.state.user_info}
								userItems={this.state.user_items}
							/>
						)} />
					

					</Router>
				{/*}	<div dangerouslySetInnerHTML={this.createMarkup()} />*/}
				{/*<pre>{JSON.stringify(this.state.top_stories, null, 2)}</pre>*/}
				</React.Fragment>
		)
	}

}