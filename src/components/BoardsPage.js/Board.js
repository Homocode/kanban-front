import { Grid } from "@mui/material";
import CardsContainer from "./CardsContainer";

export default function Board({ CardsContainers }) {
  const cardcontainer = [1, 2];
  return (
    <Grid container={true} direction="row" spacing={2}>
      {cardcontainer.map((element) => {
        return (
          <Grid item key={element}>
            <CardsContainer></CardsContainer>;
          </Grid>
        );
      })}
    </Grid>
  );
}
