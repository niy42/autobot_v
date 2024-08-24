// src/store/index.js
import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        totalAutobots: 0,
        autobotCount: 0,
        autobots: [],
        selectedAutobot: null,
        posts: [],
        comments: [],
        errorMessage: null
    },
    mutations: {
        setAutobots(state, autobots) {
            state.autobots = autobots;
        },
        setTotalAutobots(state, total) {
            state.totalAutobots = total;
        },
        setAutobotCount(state, count) {
            state.autobotCount = count;
        },
        setSelectedAutobot(state, autobot) {
            state.selectedAutobot = autobot;
        },
        setPosts(state, posts) {
            state.posts = posts;
        },
        setComments(state, comments) {
            state.comments = comments;
        },
        setErrorMessage(state, message) {
            state.errorMessage = message;
        }
    },
    actions: {
        async updateAutobotCount({ commit }, count) {
            commit('setAutobotCount', count);
        },
        async fetchAutobots({ commit }, { page, limit }) {
            try {
                const response = await axios.get('http://localhost:3000/api/autobots', {
                    params: { page, limit }
                });
                const autobots = response.data.data || [];
                const totalItems = response.data.totalItems || 0;
                commit('setAutobots', autobots);
                commit('setTotalAutobots', totalItems);
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    commit('setErrorMessage', error.response.data);
                    setTimeout(() => commit('setErrorMessage', null), 5000);
                } else {
                    console.error('Error fetching Autobots:', error);
                    commit('setErrorMessage', 'Error fetching Autobots');
                }
            }
        },
        async fetchPosts({ commit }, autobotId) {
            try {
                const response = await axios.get(`http://localhost:3000/api/autobots/${autobotId}/posts`);
                commit('setPosts', response.data.data || response.data);
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    commit('setErrorMessage', error.response.data);
                    setTimeout(() => commit('setErrorMessage', null), 5000);
                } else {
                    console.error('Error fetching Autobots:', error);
                    commit('setErrorMessage', 'Error fetching Autobots');
                }
            }
        },
        async fetchComments({ commit }, postId) {
            try {
                const response = await axios.get(`http://localhost:3000/api/posts/${postId}/comments`); // Fixed URL syntax
                commit('setComments', response.data.data || response.data);
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    commit('setErrorMessage', error.response.data);
                    setTimeout(() => commit('setErrorMessage', null), 5000);
                } else {
                    console.error('Error fetching Autobots:', error);
                    commit('setErrorMessage', 'Error fetching Autobots');
                }
            }
        }
    },
    getters: {
        autobots: state => state.autobots,
        selectedAutobot: state => state.selectedAutobot,
        posts: state => state.posts,
        comments: state => state.comments,
        autobotCount: state => state.autobotCount,
        errorMessage: state => state.errorMessage,
        totalAutobots: state => state.totalAutobots
    }
});
