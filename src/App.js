import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomeLayout from "./components/HomeLayout";
import HomePage from "./pages/Home";
import LogIn from "./pages/LogIn";
import ProtectedLayout from "./components/ProtectedLayout";
import Boards from "./pages/Boards";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogIn />} />
      </Route>

      <Route path="/user" element={<ProtectedLayout />}>
        <Route path="boards" element={<Boards />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
