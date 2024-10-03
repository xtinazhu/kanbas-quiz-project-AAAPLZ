import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
export default function AssignmentControlButtons() {
  return (
    <div className="float-end d-flex align-items-center">
      <div className="wd-rounded-corners-all-around 
        wd-border-thin wd-border-solid 
        wd-padding-fat me-2">
        40% of Total
      </div>
      <FaPlus className="me-2" />&nbsp;&nbsp;
      <IoEllipsisVertical className="fs-4" />
    </div>
);}