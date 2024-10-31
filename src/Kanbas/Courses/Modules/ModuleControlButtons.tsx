import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";
import { FaPlus } from "react-icons/fa6";
export default function ModuleControlButtons(
  { moduleId, deleteModule }: { moduleId: string; deleteModule: (moduleId: string) => void; } ) {
  return (
    <div className="float-end">
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)}/>
      <GreenCheckmark />
      <FaPlus />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}
