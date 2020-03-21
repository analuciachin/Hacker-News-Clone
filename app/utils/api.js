export function fetchTopStoryIds () {

	const endpoint = window.encodeURI(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`)

	return fetch(endpoint)
		.then(response => {
			if(!response.ok) {
				throw new Error();
			}
			return response.json();
		})
}


export function fetchNewStoryIds () {

	const endpoint = window.encodeURI(`https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`)

	return fetch(endpoint)
		.then(response => {
			if(!response.ok) {
				throw new Error();
			}
			return response.json();
		})

}

export function fetchItemInfo(id) {

	const endpoint = window.encodeURI(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)

	return fetch(endpoint)
		.then(response => {
			if(!response.ok) {
				throw new Error();
			}
			return response.json();
		})
}


export function fetchUserStoryIds(username) {
	const endpoint = window.encodeURI(`https://hacker-news.firebaseio.com/v0/user/${username}.json?print=pretty`)

	return fetch(endpoint)
		.then(response => {
			if(!response.ok) {
				throw new Error();
			}
			return response.json();
		})
}


