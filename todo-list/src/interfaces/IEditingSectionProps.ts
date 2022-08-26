import { StatusType } from "../types/StatusType";
import { ITodo } from "./ITodo";

export interface IEditingSectionProps {
  todo: ITodo, 
  setEditedTodo: React.Dispatch<React.SetStateAction<ITodo>>, 
  onChangeStatus: (todo: ITodo, status: StatusType) => void, 
  onApprove: (todo: ITodo) => void, 
  widthValue: string
}