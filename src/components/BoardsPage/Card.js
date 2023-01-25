import { Card, CardContent, InputBase } from "@mui/material";
export default function TaskCard({ cardData }) {
  return (
    <Card>
      <CardContent>
        <InputBase value={cardData.assignment} />
      </CardContent>
    </Card>
  );
}
