import { useRef } from "react";
import { IEditingSectionProps } from "../interfaces/IEditingSectionProps";

export default function EditingSection(props: IEditingSectionProps) {
  const { todo, setEditedTodo, onChangeStatus, onApprove, widthValue } = props;
  const editingSection = useRef<HTMLElement>(null); //реф для секции редактирования тудушек
  window.addEventListener('resize', () => {
    if (window.matchMedia("(max-width: 1024px)").matches && editingSection.current) { //выставляем ширину секции в 100% для мобилок
      editingSection.current.style.width = '100%';
    } else if (editingSection.current) {
      editingSection.current.style.width = `${100 - parseFloat(widthValue)}%`;
    }
  })
  return (
    <section ref={editingSection} className="edit-todos" style={{ width: `${100 - parseFloat(widthValue)}` }}>
      <h2>Edit todo</h2>
      {
        todo.text && <div>
          <input className="edit-todos__edit-input" type="text" value={todo.text} onChange={(e) => setEditedTodo({ ...todo, text: e.target.value })} />
          <button onClick={() => { onChangeStatus(todo, 'isWaiting'); onApprove(todo) }}>Move to Waiting</button>
          <button onClick={() => { onChangeStatus(todo, 'isProgress'); onApprove(todo) }}>Move to In Progress</button>
          <button onClick={() => { onChangeStatus(todo, 'isCompleted'); onApprove(todo) }}>Move to Completed</button>
          <button onClick={() => onApprove(todo)}>Approve</button>
        </div>
      }

    </section>
  )
}