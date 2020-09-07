import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";
import { Avatar, IconButton, CardMedia } from "@material-ui/core";

const CCard = props => {
  const {  title, subtitle, description, imageUrl } = props;
  return (
    <Card style={{marginTop:"50px" , marginBottom:"30px"}}>

      <CardMedia style={{ height: "150px" ,marginTop:"50px"}} image={imageUrl} />
      <CardContent>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
      <Button size="small" color="primary">
        Start
      </Button>
      </CardActions>
    </Card>
  );
};

export default CCard;
