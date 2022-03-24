import { boardService } from '../../services/board-service.js';
import { utilService } from '../../services/utils-service.js';

export default {
  state: {
    boards: [],
    filterBy: { name: '', sortBy: '' },
    currentBoard: null,
    currentGroup: null,
    currentTask: null,
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
      console.log(group);
      state.currentGroup = group;
    },
    setCurrTask(state, { task }) {
      state.currentTask = task;
      console.log(state.currentTask);
    },
    setSort(state, { sortBy }) {
      state.sortBy = sortBy;
    },
    setCurrentBoard(state, { board }) {
      state.currentBoard = board;
    },
    groupDND(state, { idx, newColumn }) {
      state.currentBoard.groups.splice(idx, 1, newColumn);
    },
    addGroup(state, { group }) {
      state.currentBoard.groups.push(group);
    },
    setCurrGroups(state, { groups }) {
      state.currentBoard.groups = [...groups];
    },
    addTask(state, { task }) {
      var newTask = {
        _id: utilService.makeId(),
        title: task.title,
      }
      state.currentBoard.groups[task.groupIdx].tasks.push(newTask)
    },
    updateTask(state, { task }) {
      const taskIdx = state.currentBoard.groups[task.groupIdx].tasks.findIndex(
        (currTask) => currTask._id === task.taskId)
      state.currentBoard.groups[task.groupIdx].tasks.splice(taskIdx, 1 , task)
    },
    removeTask(state, { task }) {
      const taskIdx = state.currentBoard.groups[task.groupIdx].tasks.findIndex(
        (currTask) => currTask._id === task.taskId
      )
      state.currentBoard.groups[task.groupIdx].tasks.splice(taskIdx, 1)
    },
  },
  actions: {
    loadBoards({ commit, state }) {
      boardService.query(state.filterBy).then(boards => {
        commit({ type: 'setBoards', boards });
      });
    },
    saveBoard({ commit }, { board }) {
      return boardService.save(board).then(savedboard => {
        commit({
          type: 'saveBoard',
          board: JSON.parse(JSON.stringify(savedboard)),
        });
        return savedboard;
      });
    },
    removeBoard({ commit }, { boardId }) {
      boardService.remove(boardId).then(() => {
        commit({ type: 'removeBoard', boardId });
      });
    },
    setFilter({ dispatch, commit }, { filterBy }) {
      commit({ type: 'setFilter', filterBy });
      dispatch({ type: 'loadBoards' });
    },
    setCurrentBoard({ commit }, { boardId }) {
      boardService
        .getById(boardId)
        .then(board => commit({ type: 'setCurrentBoard', board }));
    },
    groupDND({ state, commit, dispatch }, { idx, newColumn }) {
      commit({ type: 'groupDND', idx, newColumn });
      dispatch({ type: 'saveBoard', board: state.currentBoard });
    },
    setCurrGroups({ state, commit, dispatch }, { groups }) {
      commit({ type: 'setCurrGroups', groups });
      dispatch({ type: 'saveBoard', board: state.currentBoard });
    },
    addGroup({ state, commit, dispatch }, { groupTitle }) {
      const group = boardService.getEmptyGroup(groupTitle);
      commit({ type: 'addGroup', group });
      dispatch({
        type: 'saveBoard',
        board: JSON.parse(JSON.stringify(state.currentBoard)),
      });
    },
    setTask({ commit, state, dispatch }, { task }) {
      var groupIdx = state.currentBoard.groups.findIndex((group) => group._id === task.groupId)
      
      if (!task.taskId) {
        commit({ type: 'addTask', task: { groupIdx, title:task.title } })
      } else {
        commit({ type: 'updateTask', task: { groupIdx, task } })
      }
      dispatch({ type: 'saveBoard', board: state.currentBoard })
    },
    removeTask({ commit, state, dispatch }, { task }) {
      var groupIdx = state.currentBoard.groups.findIndex((group) => group._id === task.groupId)
      commit({ type: 'removeTask', task: { groupIdx, taskId: task.taskId } })
      dispatch({ type: 'saveBoard', board: state.currentBoard })
    },
    
  },
};
