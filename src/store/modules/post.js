export default {
	actions: {

		// context // the object or data that we transfer
		async fetchPosts(ctx, limit = 3) {
			const res = await fetch(
				"https://jsonplaceholder.typicode.com/posts?_limit=" + limit
			);
			const posts = await res.json();
			this.posts = posts;
			// mutations name // mutations second parameter
			ctx.commit('updatePosts', posts)
		}

		// another use case for actions
		// async fetchPosts({ commit, getters, dispatch }, limit = 3) {
		// 	dispatch('sayHello')
		// 	commit('updatePosts', posts)
		// },
		// sayHello() { }

	},

	mutations: {
		// state // what we transfer to State
		updatePosts(state, posts) {
			state.posts = posts
		},
		createPost(state, newPost) {
			state.posts.unshift(newPost)
		}
	},
	state: {
		posts: []
	},
	getters: {
		validPost(state) {
			return state.posts.filter(p => {
				return p.title && p.body
			})
		},
		allPosts(state) {
			return state.posts
		},
		postsCount(state, getters) {
			return getters.validPost.length
		}
	},
}