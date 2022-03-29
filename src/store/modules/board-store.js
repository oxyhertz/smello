import { boardService } from '../../services/board-service.js';
import { utilService } from '../../services/utils-service.js';
import { socketService } from '../../services/socket-service.js';

export default {
  state: {
    boards: [],
    filterBy: { name: '', sortBy: '' },
    currentBoard: null,
    currentGroup: null,
    currentTask: null,
    openLabels: false
  },
  getters: {
    openLabel({ openLabels }) {
      return openLabels
    },
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
    toggleLabel(state) {
      // console.log('openLabel', openLabels)
      state.openLabels = !state.openLabels
      console.log('openLabel', state.openLabels)
    },
    setBoards(state, { boards }) {
      state.boards = boards;
    },
    saveBoard(state, { board }) {
      const idx = state.boards.findIndex(b => b._id === board._id);
      if (idx !== -1) state.boards.splice(idx, 1, board);
      else state.boards.push(board);
    },
    updateBoard(state, { key, val }) {
      state.currentBoard[key] = val;
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
    removeGroup(state, { groupId }) {
      const idx = state.currentBoard.groups.indexOf(group => group._id === groupId);
      state.currentBoard.groups.splice(idx, 1);
    },
    setCurrGroups(state, { groups }) {
      state.currentBoard.groups = groups;
    },
    setGroup(state, { groupIdx, newGroup }) {
      state.currentBoard.groups.splice(groupIdx, 1, newGroup);
    },
    setTask(state, { groupId, task }) {
      let groupIdx;
      if (state.currentGroup) groupId = state.currentGroup._id;

      if (groupId) {
        groupIdx = state.currentBoard.groups.findIndex(group => group._id === groupId);
      } else {
        groupIdx = state.currentBoard.groups.findIndex(group => {
          return (group.tasks.findIndex(t => t._id === task._id) !== -1)
        })
      }

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
        board.createdBy = getters.miniUser; // should come from server later?
        board.members = [getters.miniUser]; // should come from server later?
      }
      // socketService.emit('set board', board)


      try {
        const savedBoard = await boardService.saveBoard(board);
        commit({ type: 'saveBoard', board: JSON.parse(JSON.stringify(savedBoard)) });
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
        console.log('ddddddddddddddddd', boardId);
        const board = await boardService.getBoardById(boardId);
        commit({ type: 'setCurrentBoard', board });
      } catch (err) {
        console.log(err);
      }
    },
    async setBoardPrefs({ state, commit, dispatch }, { key, val }) {
      try {
        commit({ type: 'updateBoard', key, val });
        await dispatch({ type: 'saveBoard', board: state.currentBoard });
        // commit({ type: 'setCurrentBoard', board: savedBoard });
      } catch (err) {
        console.log(err);
      }
    },
    async addGroup({ state, commit, dispatch }, { groupTitle }) {
      try {
        const group = boardService.getEmptyGroup(groupTitle);
        console.log(group);
        commit({ type: 'addGroup', group });
        await dispatch({ type: 'saveBoard', board: state.currentBoard });
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
        // const board = await boardService.removeGroup(
        //   state.currentBoard,
        //   groupId
        // );
        commit({ type: 'removeGroup', groupId });
        // commit({ type: 'setCurrentBoard', board });
        await dispatch({ type: 'saveBoard', board: state.currentBoard });
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
    async setTask({ commit, state, dispatch }, { groupId, task }) {
      try {
        commit({ type: 'setTask', groupId, task });
        await dispatch({ type: 'saveBoard', board: state.currentBoard });
      } catch (err) {
        console.log(err);
      }
    },
    async removeTask({ commit, state, dispatch }, { task }) {
      try {
        const groupIdx = state.currentBoard.groups.findIndex(group => group._id === task.groupId);
        commit({ type: 'removeTask', task: { groupIdx, taskId: task.taskId } });
        await dispatch({ type: 'saveBoard', board: state.currentBoard });
      } catch (err) {
        console.log(err);
      }
    },
    setFilter({ dispatch, commit }, { filterBy }) {
      commit({ type: 'setFilter', filterBy });
      dispatch({ type: 'loadBoards' });
    },
  },
};
