import { useSelector } from "react-redux";

export default function ProtectedContent({ children, editComponents }: { children: any; editComponents?: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  if (currentUser && currentUser.role === 'FACULTY') {
    return children;
  }

  return;
}