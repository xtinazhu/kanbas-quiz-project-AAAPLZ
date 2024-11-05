import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
export default function AssignmentControlButtons() {
  return (
    <div className="float-end d-flex align-items-center">
      <div className="kb-rounded-corners-all-around 
        kb-border-thin wd-border-solid 
        kb-padding-fat me-2">
        40% of Total
      </div>
      <FaPlus className="me-2" />&nbsp;&nbsp;
      <IoEllipsisVertical className="fs-4" />
    </div>
);}