import { Container } from "@mui/material";
import { useQuery } from "react-query";
import BoardsNavBar from "../components/BoardsPage/BoardsNavBar";

const fetchBoards = () => {
  return fetch("http://localhost:3001/api/boards").then((resp) => resp.json());
};

export default function Boards() {
  const { data, isLoading, error } = useQuery("getBoards", fetchBoards);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.log(error);
    return <h2>{error}</h2>;
  }

  return (
    <Container maxWidth="xl">
      <BoardsNavBar boards={data}></BoardsNavBar>
    </Container>
  );
}
