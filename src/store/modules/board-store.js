import { boardService } from '../../services/board-service.js';
export default {
  state: {
    boards: [],
    filterBy: { name: '', sortBy: '' },
    currentBoard: null,
  },
  getters: {
    boards({ boards }) {
      return boards;
    },
    boardsToShow({ boards, filterBy }) {
      const copyBoards = JSON.parse(JSON.stringify(boards));
      return copyBoards;
    },
    boardGroups({ currentBoard }) {
      return currentBoard?.groups;
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
    setSort(state, { sortBy }) {
      state.sortBy = sortBy;
    },
    setCurrentBoard(state, { board }) {
      state.currentBoard = board;
    },
    groupDND(state, { idx, newColumn }) {
      state.currentBoard.groups.splice(idx, 1, newColumn);
    },
  },
  actions: {
    loadBoards({ commit, state }) {
      boardService.query(state.filterBy).then(boards => {
        commit({ type: 'setBoards', boards });
      });
    },
    saveBoard({ commit }, { board }) {
      boardService.save(board).then(savedboard => {
        commit({ type: 'saveBoard', board: savedboard });
      });
    },
    removeBoard({ commit }, { boardId }) {
      boardService.remove(boardId).then(() => {
        commit({ type: 'removeboard', boardId });
      });
    },
    setFilter({ dispatch, commit }, { filterBy }) {
      commit({ type: 'setFilter', filterBy });
      dispatch({ type: 'loadboards' });
    },
    setCurrentBoard({ commit }, { boardId }) {
      boardService
        .getById(boardId)
        .then(board => commit({ type: 'setCurrentBoard', board }));
    },
    groupDND({ commit }, { idx, newColumn }) {
      commit({ type: 'groupDND', idx, newColumn });
    },
  },
};
