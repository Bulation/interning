import { ITodo } from "./ITodo"

export interface ITodosSectionProps {
  todoValue: string,
  setTodoValue: React.Dispatch<React.SetStateAction<string>>,
  submitTodo: (val: string) => void,
  todos: ITodo[],
  editTodo: (id: string) => void,
  deleteTodo: (id: string) => void,
  searchValue: string,
  widthValue: string
}