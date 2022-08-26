import { ITodoListProps } from '../interfaces/ITodoListProps';

export default function TodoList(props: ITodoListProps) {
  const { todos, title, todoKey, editTodo, deleteTodo, searchValue } = props;
  return (
    <div className="todos-container">
      <h3>{title}</h3>
      <ul className="todos">
        {todos.filter((todo) => todo[todoKey as keyof typeof todo]) //фильтруем тудушки по статусу для текущего листа
          .filter((todo) => {
            if (searchValue === '') { 
              return todo;
            } else if (todo.text.trim().toLowerCase().includes(searchValue)) { //если был поиск по тудушкам и там вписано какое-то значение, то фильтруем тудушки по тому тексту, который соответствует введенному значению
              return todo;
            }
            return false;
          })
          .map((todo) => <li key={todo.id} className="todo">
            <p className='todo__text'>{todo.text}</p>
            <button className="todo__edit-button" onClick={() => editTodo(todo.id)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>)}
      </ul>
    </div>
  )
}