// Data is passed via OverviewPage. No need for accessing external state.

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import NorthEastSharpIcon from "@mui/icons-material/NorthEastSharp";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const GridCard = ({ card }) => {
  const navigate = useNavigate();

  return (
    <Card elevation={1}>
      <CardHeader
        action={
          <IconButton onClick={() => navigate("/pollpage")}>
            <NorthEastSharpIcon />
          </IconButton>
        }
        title={card.author}
        subheader="20230303"
        avatar={<Avatar src={card.avatar} />}
      />
      <CardContent variant="body2" color="textSecondary">
        <Typography>some details</Typography>
      </CardContent>
    </Card>
  );
};

export default GridCard;
