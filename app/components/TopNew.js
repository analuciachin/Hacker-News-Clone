import React from 'react'
import { fetchTopStoryIds, fetchNewStoryIds, fetchItemInfo, fetchUserStoryIds } from '../utils/api'
import ShowStories from './ShowStories'
import UserStories from './UserStories'
import StoryComments from './StoryComments'
import Loading from './Loading'
import Nav from './Nav'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { ThemeProvider } from '../contexts/theme'


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
			loading_stories: true,
			loading_user: true,
			loading_comments: true,
			error: null,
			theme: 'light',
			toggleTheme: () => {
				this.setState(({ theme }) => ({
					theme: theme === 'light' ? 'dark' : 'light'
				}))
			}
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

		if(selectedStory === 'Top') {
			console.log('Top')
			fetchTopStoryIds()
				.then((data) => this.setState({
					stories_ids: data,
					story_info: [],
					loading_stories: false,
					error: null
				}, () => { 
									console.log(this.state.stories_ids)
									for (let i=0; i<50; i++) {
										fetchItemInfo(this.state.stories_ids[i])
											.then((data) => this.setState({
												story_info:[...this.state.story_info, data]
											}//, () => console.log(this.state.story_info)
											))
											.catch((error) => {
												console.warn('Error fetching top stories data: ', error)
											})
									}
								}
				))
				.catch((error) => {
					console.warn('Error fetching top stories data: ', error)
				})
		}
		else {
			console.log('New')
			fetchNewStoryIds()
				.then((data) => this.setState({
						stories_ids: data,
						story_info: [],
						loading_stories: false,
						error: null
					}, () => { 
										console.log(this.state.stories_ids)
										for (let i=0; i<50; i++) {
											fetchItemInfo(this.state.stories_ids[i])
												.then((data) => this.setState({
													story_info:[...this.state.story_info, data]
												}//, () => console.log(this.state.story_info)
												))
												.catch((error) => {
													console.warn('Error fetching new stories data: ', error)
												})
										}
									}
					))
					.catch((error) => {
						console.warn('Error fetching new stories data: ', error)
					})
		}
	}


	getUserItems(username) {
		fetchUserStoryIds(username)
			.then((data) => this.setState({
				user_info: data,
				user_items: [],
				loading_user: false
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
				story_comments: [],
				loading_comments: false
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
						<ThemeProvider value={this.state}>
							<Route exact path='/' render={() => (
								<div className={this.state.theme}>
									<div className='container'>
										<Nav onUpdateStory={this.updateStory} />
										{this.state.loading_stories &&
											<Loading />
										}
										<ShowStories
											stories={this.state.story_info}
											getUserIds={this.getUserItems}
											getDateTime = {this.convertDate}
											getComments = {this.getStoryComments}
										/>
									</div>
								</div>
							)} />
							</ThemeProvider>

						<ThemeProvider value={this.state}>
							<Route exact path='/new' render={() => (
								<div className={this.state.theme}>
									<div className='container'>
										<Nav onUpdateStory={this.updateStory} />
										{this.state.loading_stories &&
											<Loading />
										}
										<ShowStories
											stories={this.state.story_info}
											getUserIds={this.getUserItems}
											getDateTime = {this.convertDate}
											getComments = {this.getStoryComments}
										/>
									</div>
								</div>
							)} />
						</ThemeProvider>

						<ThemeProvider value={this.state}>
							<Route path='/user' render={() => (
								<div className={this.state.theme}>
									<div className='container'>
										<Nav onUpdateStory={this.updateStory} />
										{this.state.loading_user &&
											<Loading text='Fetching user'/>
										}
										<UserStories
											user={this.state.user_info}
											userItems={this.state.user_items}
											formatDate={this.convertDate}
											getUserIds={this.getUserItems}
											getComments={this.getStoryComments}
										/>
									</div>
								</div>
							)} />
						</ThemeProvider>

						<ThemeProvider value={this.state}>
							<Route path='/post' render={() => (
								<div className={this.state.theme}>
									<div className='container'>
										<Nav onUpdateStory={this.updateStory} />
										{this.state.loading_comments &&
											<Loading text='Fetching comments'/>
										}
										<StoryComments
											story={this.state.story}
											comments={this.state.story_comments}
											formatDate={this.convertDate}
											getUserIds={this.getUserItems}
											getComments={this.getStoryComments}
										/>
									</div>
								</div>
							)} />
						</ThemeProvider>

					</Router>
				</React.Fragment>
		)
	}

}