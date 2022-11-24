import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavBar from "./NavBar";

export default function HomeLayout() {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (user) {
    return <Navigate to="/user/boards" replace />;
  }

  return (
    <>
      <NavBar pages={[{ label: "Home", path: "/" }]} />
      {outlet}
    </>
  );
}
