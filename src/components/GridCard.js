// Data is passed via OverviewPage. No need for accessing external state.

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import NorthEastSharpIcon from "@mui/icons-material/NorthEastSharp";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

const GridCard = ({ card }) => {
  // XXX Could also pass only question id and let GridCard fetch the
  // the required card information from the store.
  const navigate = useNavigate();

  return (
    <Card elevation={1}>
      <CardHeader
        action={
          <IconButton onClick={() => navigate(`/pollpage/${card.id}`)}>
            <NorthEastSharpIcon />
          </IconButton>
        }
        title={card.author}
        subheader={card.timestamp}
        avatar={<Avatar src={card.avatar} />}
      />
      <CardContent variant="body2" color="textSecondary">
        <Typography>
          <Box sx={{ fontSize: 10, m: 1 }}>
            1){" "}
            {card.textOptionOne.length <= 40
              ? card.textOptionOne.slice(0, 40)
              : card.textOptionOne.slice(0, 40) + "..."}
          </Box>
          <Box sx={{ fontSize: 10, m: 1 }}>
            2){" "}
            {card.textOptionTwo.length <= 40
              ? card.textOptionTwo.slice(0, 40)
              : card.textOptionTwo.slice(0, 40) + "..."}
          </Box>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GridCard;
