import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavBar from "./NavBar";

export default function ProtectedLayout() {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <NavBar
        pages={[
          { label: "Boards", path: "/user/boards" },
          { label: "Settings", path: "/user/settings" },
        ]}
      />
      {outlet}
    </>
  );
}
