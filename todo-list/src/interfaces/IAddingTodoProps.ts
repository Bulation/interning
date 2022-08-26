export interface IAddingTodoProps {
  todoValue: string; 
  setTodoValue: React.Dispatch<React.SetStateAction<string>>; 
  submitTodo: (todoValue: string) => void;
}