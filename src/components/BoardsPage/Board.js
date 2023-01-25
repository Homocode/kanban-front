import { Grid } from "@mui/material";
import { useQuery } from "react-query";
import CardsContainer from "./CardsContainer";

const fetchCardContainers = () => {
  return fetch("http://localhost:3001/api/cardsContainers").then((resp) =>
    resp.json()
  );
};

export default function Board({ CardsContainersId }) {
  const { data, status, error } = useQuery(
    "getCardContainers",
    fetchCardContainers
  );

  if (status === "loading") {
    return <h2>Loading....</h2>;
  }

  if (status === "error") {
    return <h2>{error}</h2>;
  }

  return (
    <Grid container={true} direction="row" spacing={2}>
      {}
      {data.map((element) => {
        return (
          <Grid item key={element}>
            <CardsContainer cardsContainer={element}></CardsContainer>
          </Grid>
        );
      })}
    </Grid>
  );
}
