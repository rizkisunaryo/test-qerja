export const apiGetTodoList = () => fetch('https://jsonplaceholder.typicode.com/todos')
  .then(resp => resp.json())
  .catch(err => console.error('Api:: getTodoList: ', err))
