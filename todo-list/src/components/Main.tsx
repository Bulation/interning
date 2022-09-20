import { IMainProps } from "../interfaces/IMainProps";
import { useState, useEffect, useRef, useCallback } from "react";
import { ITodo } from "../interfaces/ITodo";
import TodosSection from "./TodosSection";
import EditingSection from "./EditingSection";
import { StatusType } from "../types/StatusType";

export default function Main(props: IMainProps) {
  const { searchValue } = props;
  const [todos, setTodos] = useState(Array<ITodo>); //использую стейт для хранения тудушек
  window.addEventListener('beforeunload', () => localStorage.setItem('todos', JSON.stringify(todos))); //перед закрытием страницы добавляю тудушки в сторедж
  useEffect(() => {
    const todosFromStorage = localStorage.getItem('todos');
    if (todosFromStorage !== null) {
      setTodos(JSON.parse(todosFromStorage));
    }
  }, []); //загружаю тудушки из стореджа при первой загрузке страницы
  const [todoValue, setTodoValue] = useState(''); //стейт для хранения значения в инпуте, в котором создается тудушка
  const clientWidth = document.body.clientWidth < 1024 ? '100%' : '25%'; //установление начальной ширины в зависимости от разрешения экрана
  const [widthValue, setWidthValue] = useState(clientWidth); //стейт для хранения значения ширины секции со списком тудушек
  const submitTodo = useCallback((todoValue: string) => { //функция для создания новой тудушки
    if (todoValue === '') { //если пользователь пытается создать тудушку с пустым именем, то выходим из функции
      return;
    }
    const newTodo = {
      id: Math.random().toString(),
      text: todoValue,
      isWaiting: true,
      isProgress: false,
      isCompleted: false
    }
    setTodos([...todos, newTodo]);
    setTodoValue(''); //очищаю инпут добавления тудушки
  }, [todos]);
  const [editedTodo, setEditedTodo] = useState({ //стейт для хранения тудушки, которую нужно перевести в режим редактирования
    id: '',
    text: '',
    isWaiting: false,
    isProgress: false,
    isCompleted: false
  });

  const editTodo = useCallback((id: string) => { //функция для перевода тудушки в режим редактирования
    const todoForEdit = todos.find((todo) => todo.id === id);
    if (todoForEdit) {
      setEditedTodo(todoForEdit);
    }
  }, [todos]);

  const deleteTodo = useCallback((id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    if (editedTodo.id === id) { //если удаляемая тудушка находилась в режиме редактирования, то убираем ее оттуда
      setEditedTodo({
        id: '',
        text: '',
        isWaiting: false,
        isProgress: false,
        isCompleted: false
      })
    }
  }, [todos, editedTodo]);

  const onChangeStatus = useCallback((todo: ITodo, status: StatusType) => { //функция перевода тудушки из одного статуса в другой
    setTodos(todos.map((item) => {
      if (item.id === todo.id) {
        item.isCompleted = false;
        item.isProgress = false;
        item.isWaiting = false;
        item[status] = !item[status];
      }
      return item;
    }));
  }, [todos]);

  const onApprove = useCallback((todo: ITodo) => {
    setTodos(todos.map((item) => { //меняем текст тудушки и очищаем режим редактирования при сохранении изменения
      if (item.id === todo.id) {
        item.text = todo.text;
      }
      return item;
    }));
    setEditedTodo({
      id: '',
      text: '',
      isWaiting: false,
      isProgress: false,
      isCompleted: false
    });
  }, [todos]);
  const mainEl = useRef<HTMLElement>(null); //реф для тега main
  const changeWidth = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (mainEl.current) {
      const widthValue = (e.pageX - mainEl.current.getBoundingClientRect().left) / mainEl.current.clientWidth * 100; //значение ширины в процентах для секции списка тудушек
      if (widthValue < 15) { //минимальное и максимальное значение ширины для секции установлены в 15% и 90% соответственно
        setWidthValue(`15%`);
      } else if (widthValue > 90) {
        setWidthValue(`90%`);
      } else {
        setWidthValue(`${widthValue}%`); 
      }
    }
  }
  return (
    <main ref={mainEl} className='main'>
      <TodosSection
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        submitTodo={submitTodo}
        todos={todos}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        searchValue={searchValue}
        widthValue={widthValue}
      />
      <div draggable="true" className="width-changing-slider" 
          style={{ left: widthValue }} 
          onDrag={(e) => changeWidth(e)} 
          onDragEnd={(e) => changeWidth(e)}>
      </div>
      <EditingSection
        todo={editedTodo}
        setEditedTodo={setEditedTodo}
        onChangeStatus={onChangeStatus}
        onApprove={onApprove}
        widthValue={widthValue}
      />
    </main>
  )
}