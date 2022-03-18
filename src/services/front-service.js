import { utilService } from './utils-service.js';
import { storageService } from './storage-service.js';


const TASK_KEY = 'tasksDB';
_createTasks();


export const frontService = {
  query,
  remove,
  save,
  get
}

function query() {
  return storageService.query(TASK_KEY);
}

function remove(taskId) {
  return storageService.remove(TASK_KEY, taskId);
}

function get(taskId) {
  return storageService.get(TASK_KEY, taskId);
}

function save(task) {
  if (task.id) return storageService.put(TASK_KEY, task);
  else return storageService.post(TASK_KEY, task);
}

// function _setNextPrevBookId(task) {
//   return storageService.query(BOOKS_KEY).then(books => {
//       const bookIdx = books.findIndex(currBook => currBook.id === book.id)
//       book.nextBookId = (books[bookIdx+1])? books[bookIdx+1].id : books[0].id
//       book.prevBookId = (books[bookIdx-1])? books[bookIdx-1].id : books[books.length-1].id
//       return book
//   })
//}

// function removeReview(taskId, reviewId) {
//   return get(taskId).then((task) => {
//     const reviewIdx = task.reviews.findIndex(review=> review.id === reviewId )
//     task.reviews.splice(reviewIdx,1)
//     return storageService.put(TASK_KEY, task)
//   })
// }

// function addReview(taskId, review) {
//   return get(taskId).then((task) => {
//     if (task.reviews) task.reviews.push(review)
//     else task.reviews = [review]
//     return storageService.put(TASK_KEY, task)
//   })
// }

function _createTasks() {
  let tasks = utilService.loadFromStorage(TASK_KEY);
  if (!tasks || !tasks.length) {
    //tasks  = []
    utilService.saveToStorage(TASK_KEY, tasks);
  }
  return tasks;
}
