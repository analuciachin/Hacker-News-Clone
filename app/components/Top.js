import React from 'react'

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

export default class Top extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedStory: 'Top',
			all_stories: [],
			stories: [],
			error: null
		}

		this.updateStory = this.updateStory.bind(this)
		this.getStoryInformation = this.getStoryInformation.bind(this)
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
		const endpoint = window.encodeURI(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`)

		fetch(endpoint)
			.then(response => {
				if(!response.ok) {
					throw new Error();
				}
				return response.json();
			})
			.then((data) => this.setState({
				all_stories: data
			}, () => { 
								console.log(this.state.all_stories)
								for (let i=0; i<3; i++) {
									this.getStoryInformation(this.state.all_stories[i])
								}
								//this.getStoryInformation(22486548)
							}
			))
			.catch((error) => {
				console.warn('Error fetching weather info: ', error)

				this.setState ({
					error: `There was an error fetching the weather info.`,
					city:'',
					country:'',
					results:false
				})
			})
		}
	}

	getStoryInformation(id) {

		const endpoint = window.encodeURI(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)

		fetch(endpoint)
			.then(response => {
				if(!response.ok) {
					throw new Error();
				}
				return response.json();
			})
			.then((data) => this.setState({
				stories:[...this.state.stories, data]
			}, () => console.log(this.state.stories)))
/*			.then((data) => this.setState({
				stories: data
				}, () => console.log(this.state.stories)
			))
*/
/*
			.then((data) => {
				this.setState(({ stories }) => ({
					stories: {
						...stories,
						//[selectedStory]: data
					}
				}, () => console.log(this.state.stories)))
			})
*/
	}




	render() {
		return (
			<React.Fragment>
				<StoriesNav
					selected={this.state.selectedStory}
					onUpdateLanguage={this.updateStory}
				/>
			{/*<pre>{JSON.stringify(this.state.top_stories, null, 2)}</pre>*/}
			</React.Fragment>
		)
	}

}