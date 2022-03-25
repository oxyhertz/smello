import { utilService } from './utils-service.js';
import { storageService } from './storage-service.js';

const BOARD_KEY = 'boardDB';
_createBoards();

export const boardService = {
  getBoards,
  removeBoard,
  saveBoard,
  getBoardById,
  setBoardPrefs,
  getEmptyBoard,
  getGroups,
  getGroupById,
  removeGroup,
  getEmptyGroup,
  getTasks,
  getTaskById,
  removeTask,
};

function getBoards(filterBy) {
  return storageService.query(BOARD_KEY);
}

function removeBoard(boardId) {
  return storageService.remove(BOARD_KEY, boardId);
}

function getBoardById(boardId) {
  return storageService.get(BOARD_KEY, boardId);
}

function saveBoard(board) {
  if (board._id) return storageService.put(BOARD_KEY, board);
  else return storageService.post(BOARD_KEY, board);
}

function setBoardPrefs(boardId, key, val) {
  return getBoardById(boardId).then(board => {
    board[key] = val;
    return board;
  });
}

function getGroups(boardId) {
  return getBoardById(boardId).then(board => board.groups);
}

function removeGroup(currBoard, groupId) {
  const idx = currBoard.groups.findIndex(group => group._id === groupId);
  currBoard.groups.splice(idx, 1);
  return Promise.resolve(currBoard);
}

function getGroupById(currBoard, groupId) {
  return Promise.resolve(currBoard.find(group => group._id === groupId));
}

function getTasks(currBoard, groupId) {
  return getGroupById(currBoard, groupId).then(group => group.tasks);
}

function getTaskById(currBoard, groupId, taskId) {
  return getTasks(currBoard, groupId).then(tasks =>
    tasks.find(task => task._id === taskId)
  );
}

function removeTask(currGroup, taskId) {
  const idx = currGroup.findIndex(task => task._id === taskId);
  currGroup.tasks.splice(idx, 1);
  return currGroup;
}

function getEmptyGroup(title = '', tasks = []) {
  return {
    _id: utilService.makeId(),
    title,
    tasks,
  };
}

function getEmptyBoard() {
  return Promise.resolve({
    title: '',
    isFavorite: false,
    createdBy: '',
    style: {
      bgColor: '#cacabb',
    },
    labels: [
        {
          _id: 'l101',
          title: 'Done',
          color: '#61bd4f',
        },
        {
          _id: 'l102',
          title: 'Progress',
          color: '#61bd33',
        },
        {
          _id: 'l103',
          title: 'ASAP',
          color: '#f0f0f0',
        },
    ],
    members: [],
    groups: [
      {
        _id: utilService.makeId(),
        title: 'New List',
        tasks: [],
      },
    ],
  });
}

function _createBoards() {
  let boards = utilService.loadFromStorage(BOARD_KEY);
  if (!boards || !boards.length) {
    boards = [
      {
        _id: 'b101',
        title: 'trello copy project',
        createdAt: 1589983468418,
        isFavorite: false,
        createdBy: {
          _id: 'u101',
          fullname: 'Abi Abambi',
          imgUrl: 'http://some-img',
        },
        style: {
          bgColor: '#26de81',
          bgImg:
            'https://images.unsplash.com/photo-1647735282508-1ad1d771f9be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        },
        labels: [
          {
            _id: 'l101',
            title: 'Done',
            color: '#61bd4f',
          },
          {
            _id: 'l102',
            title: 'Progress',
            color: '#61bd33',
          },
        ],
        members: [
          {
            _id: 'u101',
            fullname: 'Tal Tarablus',
            imgUrl: 'https://www.google.com',
          },
        ],
        groups: [
          {
            _id: 'g101',
            title: 'Group 1',
            tasks: [
              {
                _id: 'c101',
                title: 'Replace logo',
              },
              {
                _id: 'c102',
                title: 'Add Samples',
              },
            ],
            style: {},
          },
          {
            _id: 'g102',
            title: 'Group 2',
            tasks: [
              // CARD
              {
                _id: 'c103',
                title: 'Do that',
              },
              {
                _id: 'c104',
                title: 'Help me',
                status: 'in-progress',
                description: 'description',
                comments: [
                  {
                    _id: 'ZdPnm',
                    txt: 'also @yaronb please CR this',
                    createdAt: 1590999817436.0,
                    byMember: {
                      _id: 'u101',
                      fullname: 'Tal Tarablus',
                      imgUrl:
                        'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                    },
                  },
                ],
                checklists: [
                  {
                    _id: 'YEhmF',
                    title: 'Checklist',
                    todos: [
                      {
                        _id: '212jX',
                        title: 'To Do 1',
                        isDone: false,
                      },
                    ],
                  },
                ],
                members: [
                  {
                    _id: 'u101',
                    username: 'Tal',
                    fullname: 'Tal Tarablus',
                    imgUrl:
                      'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                ],
                labelIds: ['l101', 'l102'],
                createdAt: 1590999730348,
                dueDate: 16156215211,
                byMember: {
                  _id: 'u101',
                  username: 'Tal',
                  fullname: 'Tal Tarablus',
                  imgUrl:
                    'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
                style: {
                  bgColor: '#26de81',
                },
              },
            ],
            style: {},
          },
        ],
        activities: [
          {
            _id: 'a101',
            txt: 'Changed Color',
            createdAt: 154514,
            byMember: {
              _id: 'u101',
              fullname: 'Abi Abambi',
              imgUrl: 'http://some-img',
            },
            task: {
              _id: 'c101',
              title: 'Replace Logo',
            },
          },
        ],
      },
      {
        _id: 'b132',
        title: 'Trello sprint proj',
        createdAt: 1589923468418,
        isFavorite: true,
        createdBy: {
          _id: 'u101',
          fullname: 'Admin  ',
          imgUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
        },
        style: {
          bgColor: '#fafaf2',
        },
        labels: [
          {
            _id: 'l101',
            title: 'Done',
            color: '#61bd4f',
          },
          {
            _id: 'l102',
            title: 'Progress',
            color: '#61bd33',
          },
          {
            _id: 'l103',
            title: 'ASAP',
            color: '#f0f0f0',
          },
        ],
        members: [
          {
            _id: 'u101',
            fullname: 'Dima Pol',
            imgUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
          },
          {
            _id: 'u101',
            fullname: 'Admin  ',
            imgUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
          },
        ],
        groups: [
          {
            _id: 'g121',
            title: 'Group 1',
            tasks: [
              {
                _id: 'c121',
                title: 'Change header color',
              },
              {
                _id: 'c122',
                title: 'Add task input',
              },
              {
                _id: 'c123e',
                title: 'Change bg color',
              },
            ],
            style: {},
          },
          {
            _id: '21a321gad',
            title: 'Go to production',
            tasks: [
              {
                _id: 'c1233',
                title: 'Upload patch',
              },
              {
                _id: 'c123104',
                title: 'Help me',
                status: 'in-progress',
                description: 'description',
                comments: [
                  {
                    _id: 'ZdPnm',
                    txt: 'also @yaronb please CR this',
                    createdAt: 1590999780000,
                    byMember: {
                      _id: 'u101',
                      fullname: 'Dima pol',
                      imgUrl:
                        'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                    },
                  },
                ],
                checklists: [
                  {
                    _id: 'YEh2mF',
                    title: 'Checklist',
                    todos: [
                      {
                        _id: '212jX',
                        title: 'To Do 1',
                        isDone: false,
                      },
                    ],
                  },
                ],
                members: [
                  {
                    _id: 'u101',
                    username: 'Tal',
                    fullname: 'Tal Tarablus',
                    imgUrl:
                      'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                ],
                labelIds: ['l101', 'l102'],
                createdAt: 1590999730348,
                dueDate: 17156215211,
                byMember: {
                  _id: 'u101',
                  username: 'Tal',
                  fullname: 'Tal Tarablus',
                  imgUrl:
                    'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
                style: {
                  bgColor: '#26de81',
                },
              },
            ],
            style: {},
          },
        ],
        activities: [
          {
            _id: 'a101',
            txt: 'Changed Color',
            createdAt: 154514,
            byMember: {
              _id: 'u101',
              fullname: 'Abi Abambi',
              imgUrl: 'http://some-img',
            },
            task: {
              _id: 'c101',
              title: 'Replace Logo',
            },
          },
        ],
      },
    ];
    utilService.saveToStorage(BOARD_KEY, boards);
  }
  return boards;
}
