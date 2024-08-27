import { shallowMount } from '@vue/test-utils';
import AutobotList from '../../src/components/AutobotList.vue';
import { createStore } from 'vuex';

// Create a mock store
const store = createStore({
  state: {
    autobots: [],
    selectedAutobot: null,
    posts: [],
    selectedPost: null,
    comments: [],
    errorMessage: null,
  },
  getters: {
    autobots: state => state.autobots,
    selectedAutobot: state => state.selectedAutobot,
    posts: state => state.posts,
    selectedPost: state => state.selectedPost,
    comments: state => state.comments,
    errorMessage: state => state.errorMessage,
  },
  actions: {
    fetchAutobots: jest.fn(),
    fetchPosts: jest.fn(),
    fetchComments: jest.fn(),
  },
  mutations: {
    setSelectedAutobot: jest.fn(),
    setSelectedPost: jest.fn(),
    setErrorMessage: jest.fn(),
  }
});

describe('AutobotList.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(AutobotList, { global: { plugins: [store] } });
    expect(wrapper.exists()).toBe(true);
  });

  it('calls selectAutobot when an autobot is clicked', async () => {
    // Spy on the selectAutobot mutation
    const commitSpy = jest.spyOn(store, 'commit');
    const wrapper = shallowMount(AutobotList, { global: { plugins: [store] } });
    const autobot = { id: 1, name: 'Autobot 1' };
    await wrapper.vm.selectAutobot(autobot);
    expect(commitSpy).toHaveBeenCalledWith('setSelectedAutobot', autobot);
  });

  // Add more tests for other functionalities
});
