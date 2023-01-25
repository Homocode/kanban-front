import { useState } from "react";
import { Box, IconButton, Tab, Grid, Container } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Board from "./Board";

export default function BoardsNavBar({ boards }) {
  const [value, setValue] = useState(boards[0].id.toString());

  const handleTabChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <Container id="containerNavBar" maxWidth="xl" disableGutters={true}>
      <Box>
        <TabContext value={value}>
          <Grid
            container
            justifyContent="space-between"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <TabList onChange={handleTabChange}>
              {boards.map((element) => {
                return (
                  <Tab
                    label={
                      <span>
                        {element.title}
                        {element.id.toString() === value ? (
                          <IconButton
                            size="small"
                            component="span"
                            onClick={() => {
                              alert("Closing this tab...");
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: "1rem" }} />
                          </IconButton>
                        ) : null}
                      </span>
                    }
                    value={element.id.toString()}
                  />
                );
              })}
            </TabList>
            <Box sx={{ height: "fit-content" }}>
              <IconButton size="small">
                <AddIcon></AddIcon>
                New Board
              </IconButton>
            </Box>
          </Grid>

          {boards.map((element) => {
            return (
              <TabPanel value={element.id.toString()}>
                <Board />
              </TabPanel>
            );
          })}
        </TabContext>
      </Box>
    </Container>
  );
}
