import * as React from "react";
import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TaskCard from "./Card";

export default function CardsContainer() {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 300 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        title="Very Important Things"
        sx={{ background: "blue" }}
      />
      <CardContent>
        <TaskCard />
      </CardContent>
    </Card>
  );
}
