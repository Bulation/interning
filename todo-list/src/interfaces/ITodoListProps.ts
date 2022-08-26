import { ITodo } from "./ITodo"
export interface ITodoListProps { 
  todos: ITodo[], 
  title: string, 
  todoKey: string,
  editTodo: (id: string) => void,
  deleteTodo: (id: string) => void, 
  searchValue: string 
}