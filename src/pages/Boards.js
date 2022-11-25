import { Container } from "@mui/material";
import Board from "../components/BoardsPage.js/Board";
import NavTabs from "../components/BoardsPage.js/Tabs";

export default function Boards() {
  return (
    <>
      <Container maxWidth="xl">
        <NavTabs></NavTabs>
        <Board></Board>
      </Container>
    </>
  );
}
