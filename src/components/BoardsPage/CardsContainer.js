import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  InputBase,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TaskCard from "./Card";

export default function CardsContainer({ cardsContainer }) {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 300 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        title={<InputBase value={cardsContainer.title} />}
        sx={{ background: "blue" }}
      />
      <CardContent>
        {cardsContainer.cards.map((element) => {
          return <TaskCard cardData={element} />;
        })}
      </CardContent>
    </Card>
  );
}
