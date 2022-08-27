import { IMainProps } from "../interfaces/IMainProps";
import { useState, useEffect, useRef } from "react";
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
  const [todoValue, setTodoValue] = useState(''); //стейт для хранения значения в инпуте создания тудушки
  const [widthValue, setWidthValue] = useState('25%'); //стейт для хранения значения ширины секции со списком тудушек
  const submitTodo = (todoValue: string) => { //функция для создания новой тудушки
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
  }
  const [editedTodo, setEditedTodo] = useState({ //стейт для хранения тудушки, которую нужно перевести в режим редактирования
    id: '',
    text: '',
    isWaiting: false,
    isProgress: false,
    isCompleted: false
  });

  const editTodo = (id: string) => { //функция для перевода тудушки в режим редактирования
    const todoForEdit = todos.find((todo) => todo.id === id);
    if (todoForEdit) {
      setEditedTodo(todoForEdit);
    }
  }

  const deleteTodo = (id: string) => {
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
  }

  const onChangeStatus = (todo: ITodo, status: StatusType) => { //функция перевода тудушки из одного статуса в другой
    setTodos(todos.map((item) => {
      if (item.id === todo.id) {
        item.isCompleted = false;
        item.isProgress = false;
        item.isWaiting = false;
        item[status] = !item[status];
      }
      return item;
    }));
  }

  const onApprove = (todo: ITodo) => {
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
  }
  let mousedown: boolean = false; //переменная для определения, зажата ли кнопка мыши на диве с классом width-changing-slider
  const isMouseDown = (value: boolean) => {
    mousedown = value;
  }
  window.addEventListener('mousemove', (e) => mousedown && changeWidth(e)); //если зажата кнопка мыши на диве и мышь перемещается, то менеяем ширину секций
  const mainEl = useRef<HTMLElement>(null); //реф для тега main
  const changeWidth = (e: MouseEvent) => {
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
  window.addEventListener('mouseup', () => isMouseDown(false));
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
      <div className="width-changing-slider" style={{ left: widthValue }} onMouseDown={() => isMouseDown(true)}></div>
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