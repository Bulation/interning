import { IAddingTodoProps } from '../interfaces/IAddingTodoProps';

export default function AddingTodo(props: IAddingTodoProps) {
  const { todoValue, setTodoValue, submitTodo } = props;
  return (
    <div className='add-todo-container'>
      <input value={todoValue}
        onChange={(e) => setTodoValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            submitTodo(todoValue);
          }
        }}
        type="text"
        placeholder='Add todo' />
      <button onClick={() => {
        submitTodo(todoValue);
      }}>Add</button>
    </div>
  )
}