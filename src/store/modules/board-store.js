import { boardService } from '../../services/board-service.js';
export default {
  state: {
    boards: [],
    filterBy: { name: '', sortBy: '' },
  },
  getters: {
    boards({ boards }) {
      return boards;
    },
    boardsToShow({ boards, filterBy }) {
      const copyBoards = JSON.parse(JSON.stringify(boards));
      return copyBoards;
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
  },
  actions: {
    loadBoards({ commit, state }) {
      boardService.query(state.filterBy).then(boards => {
        commit({ type: 'setBoards', boards });
      });
    },
    saveBoard({ commit }, { board }) {
      boardService.save(board).then(savedboard => {
        commit({ type: 'saveboard', board: savedboard });
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
  },
};
