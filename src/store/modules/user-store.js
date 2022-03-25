import { userService } from '../../services/user-service';
import { userManageService } from '../../services/user-manage-service';
import { utilService } from '../../services/utils-service';

export default {
  state: {
    loggedinUser: {
      _id: 'hgfd43',
      fullname: 'Guest',
      username: 'Guest',
      password: 'guest',
      imgUrl: 'http://some-img.jpg',
      mentions: [],
      allUsers: [],
    },
  },
  getters: {
    user(state) {
      return state.loggedinUser;
    },
    getAllUsers(state) {
      return state.allUsers;
    },
    miniUser({ loggedinUser }) {
      const miniUser = {
        _id: loggedinUser._id,
        fullname: loggedinUser.fullname,
        username: loggedinUser.username,
        imgUrl: loggedinUser.imgUrl,
      };
      return miniUser;
    },
  },
  mutations: {
    setUser(state, { user }) {
      state.loggedinUser = user;
    },
    setUsers(state, { users }) {
      state.allUsers = users;
    },
  },
  actions: {
    async loadUsers({ commit, state }) {
      const users = await userManageService.query();
      commit({ type: 'setUsers', users });
    },
    async login({ commit }, { cred }) {
      try {
        const user = await userService.login(cred);
        commit({ type: 'setUser', user });
        utilService.saveToSessionStorage('user', user);
      } catch (err) {
        console.log(err);
      }
    },
    async signup({ commit }, { cred }) {
      try {
        const user = await userService.signup(cred);
        commit({ type: 'setUser', user });
        utilService.saveToSessionStorage('user', user);
      } catch (err) {
        console.log(err);
      }
    },
    async logout({ commit }) {
      try {
        await userService.logout();
        commit({ type: 'setUser', user: null });
        sessionStorage.removeItem('user');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
