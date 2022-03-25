import { boardService } from '../../services/board-service.js';
import { utilService } from '../../services/utils-service.js';
export default {
  state: {
    boards: [],
    filterBy: { name: '', sortBy: '' },
    currentBoard: null,
    currentGroup: null,
    currentTask: null,
  },
  getters: {
    boards({ boards }) {
      return boards;
    },
    boardsToShow({ boards, filterBy }) {
      const copyBoards = JSON.parse(JSON.stringify(boards));
      return copyBoards;
    },
    currBoard({ currentBoard }) {
      return currentBoard;
    },
    boardGroups({ currentBoard }) {
      return currentBoard?.groups;
    },
    currGroup({ currentGroup }) {
      return currentGroup;
    },
    currTask({ currentTask }) {
      return currentTask;
    },
  },
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards;
    },
    saveBoard(state, { board }) {
      const idx = state.boards.findIndex(t => t._id === board._id);
      if (idx !== -1) state.boards.splice(idx, 1, board);
      else state.boards.push(board);
    },
    removeBoard(state, { boardId }) {
      const idx = state.boards.findIndex(board => board._id === boardId);
      state.boards.splice(idx, 1);
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    setCurrGroup(state, { group }) {
      state.currentGroup = group;
    },
    setCurrTask(state, { task }) {
      state.currentTask = task;
    },
    setSort(state, { sortBy }) {
      state.sortBy = sortBy;
    },
    setCurrentBoard(state, { board }) {
      state.currentBoard = board;
    },
    addGroup(state, { group }) {
      state.currentBoard.groups.push(group);
    },
    setCurrGroups(state, { groups }) {
      state.currentBoard.groups = groups;
    },
    setGroup(state, { groupIdx, newGroup }) {
      state.currentBoard.groups.splice(groupIdx, 1, newGroup);
    },
    setTask(state, { groupId, task }) {
      if (state.currentGroup) groupId = state.currentGroup._id;
      const groupIdx = state.currentBoard.groups.findIndex(
        group => group._id === groupId
      );
      if (task._id) {
        const taskIdx = state.currentBoard.groups[groupIdx].tasks.findIndex(
          currTask => currTask._id === task._id
        );
        state.currentBoard.groups[groupIdx].tasks.splice(taskIdx, 1, task);
      } else {
        console.log('new task');
        task._id = utilService.makeId();
        state.currentBoard.groups[groupIdx].tasks.push(task);
      }
    },
    removeTask(state, { task }) {
      const taskIdx = state.currentBoard.groups[task.groupIdx].tasks.findIndex(
        currTask => currTask._id === task.taskId
      );
      state.currentBoard.groups[task.groupIdx].tasks.splice(taskIdx, 1);
    },
  },
  actions: {
    async loadBoards({ commit, state }) {
      try {
        const boards = await boardService.getBoards(state.filterBy);
        commit({ type: 'setBoards', boards });
      } catch (err) {
        console.log(err);
      }
    },
    async saveBoard({ getters, commit }, { board }) {
      if (!board._id) {
        board.createdBy = getters.miniUser;
        board.members = [getters.miniUser];
        board.createdAt = Date.now(); // should come from server later
      }
      try {
        const savedBoard = await boardService.saveBoard(board);
        commit({
          type: 'saveBoard',
          board: JSON.parse(JSON.stringify(savedBoard)),
        });
        return savedBoard;
      } catch (err) {
        console.log(err);
      }
    },
    async removeBoard({ commit }, { boardId }) {
      try {
        await boardService.removeBoard(boardId);
        commit({ type: 'removeBoard', boardId });
      } catch (err) {
        console.log(err);
      }
    },
    async setCurrentBoard({ commit }, { boardId }) {
      try {
        const board = await boardService.getBoardById(boardId);
        commit({ type: 'setCurrentBoard', board });
      } catch {
        console.log(err);
      }
    },
    async setBoardPrefs({ state, commit, dispatch }, { key, val }) {
      try {
        const savedBoard = await boardService.setBoardPrefs(
          state.currentBoard._id,
          key,
          val
        );
        commit({ type: 'setCurrentBoard', board: savedBoard });
        await dispatch({ type: 'saveBoard', board: state.currentBoard });
      } catch (err) {
        console.log(err);
      }
    },
    async addGroup({ state, commit, dispatch }, { groupTitle }) {
      try {
        const group = boardService.getEmptyGroup(groupTitle);
        commit({ type: 'addGroup', group });
        await dispatch({
          type: 'saveBoard',
          board: state.currentBoard,
        });
      } catch (err) {
        console.log(err);
      }
    },
    async setGroups({ state, commit, dispatch }, { groups }) {
      try {
        commit({ type: 'setCurrGroups', groups });
        await dispatch({ type: 'saveBoard', board: state.currentBoard });
      } catch (err) {
        console.log(err);
      }
    },
    async removeGroup({ state, commit, dispatch }, { groupId }) {
      try {
        const board = await boardService.removeGroup(
          state.currentBoard,
          groupId
        );
        commit({ type: 'setCurrentBoard', board });
        await dispatch({ type: 'saveBoard', board });
      } catch {
        console.log(err);
      }
    },
    async setGroup({ state, commit, dispatch }, { groupIdx, newGroup }) {
      try {
        commit({ type: 'setGroup', groupIdx, newGroup });
        await dispatch({ type: 'saveBoard', board: state.currentBoard });
      } catch (err) {
        console.log(err);
      }
    },
    setTask({ commit, state, dispatch }, { groupId, task }) {
      console.log(groupId, task);
      commit({ type: 'setTask', groupId, task });
      dispatch({ type: 'saveBoard', board: state.currentBoard });
    },
    removeTask({ commit, state, dispatch }, { task }) {
      const groupIdx = state.currentBoard.groups.findIndex(
        group => group._id === task.groupId
      );
      commit({ type: 'removeTask', task: { groupIdx, taskId: task.taskId } });
      dispatch({ type: 'saveBoard', board: state.currentBoard });
    },
    setFilter({ dispatch, commit }, { filterBy }) {
      commit({ type: 'setFilter', filterBy });
      dispatch({ type: 'loadBoards' });
    },
  },
};
