import { useSelector } from "react-redux";

export default function ProtectedEnrollment({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  if (currentUser && currentUser.role === 'STUDENT') {
    return children;
  }

  return null;
}