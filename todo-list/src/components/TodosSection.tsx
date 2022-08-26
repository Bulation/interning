import { ITodosSectionProps } from "../interfaces/ITodosSectionProps";
import { useRef } from "react";
import AddingTodo from "./AddingTodo";
import TodoList from "./TodoList";

export default function TodosSection(props: ITodosSectionProps) {
  const { todoValue, setTodoValue, submitTodo, todos, editTodo, deleteTodo, searchValue, widthValue } = props;
  const todosEl = useRef<HTMLElement>(null); //реф для секции со списком тудушек
  window.addEventListener('resize', () => { 
    if (window.matchMedia("(max-width: 1024px)").matches && todosEl.current) { //выставляем ширину секции в 100% для мобилок
      todosEl.current.style.width = '100%';
    } else if (todosEl.current) {
      todosEl.current.style.width = widthValue;
    }
  })
  return (
    <section ref={todosEl} className='todos-section' style={{ width: widthValue }}>
      <h2>List of todos</h2>
      <AddingTodo
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        submitTodo={submitTodo}
      />
      <TodoList
        todos={todos}
        title="Waiting"
        todoKey="isWaiting"
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        searchValue={searchValue}
      />
      <TodoList
        todos={todos}
        title="In progress"
        todoKey="isProgress"
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        searchValue={searchValue}
      />
      <TodoList
        todos={todos}
        title="Completed"
        todoKey="isCompleted"
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        searchValue={searchValue}
      />
    </section>
  )
}