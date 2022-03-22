import { utilService } from './utils-service.js';
import { storageService } from './storage-service.js';

const BOARD_KEY = 'boardDB';
_createBoards();

export const boardService = {
  query,
  remove,
  save,
  getById,
  getEmptyGroup
};

function query(filterBy) {
  return storageService.query(BOARD_KEY);
}

function remove(boardId) {
  return storageService.remove(BOARD_KEY, boardId);
}

function getById(boardId) {
  return storageService.get(BOARD_KEY, boardId);
}

function save(board) {
  if (board._id) return storageService.put(BOARD_KEY, board);
  else return storageService.post(BOARD_KEY, board);
}

function getEmptyGroup(title = '', tasks = []) {
  return {
    _id: utilService.makeId(),
    title,
    tasks
  }
}

function _createBoards() {
  let boards = utilService.loadFromStorage(BOARD_KEY);
  if (!boards || !boards.length) {
    boards = [
      {
        _id: 'b101',
        title: 'Robot dev proj',
        createdAt: 1589983468418,
        createdBy: {
          _id: 'u101',
          fullname: 'Abi Abambi',
          imgUrl: 'http://some-img',
        },
        style: {},
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
    ];
    utilService.saveToStorage(BOARD_KEY, boards);
  }
  return boards;
}
