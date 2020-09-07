import React from "react";
import CCard from "./Card";
import { Grid } from "@material-ui/core";
import Constants from "./constants";

const Content = () => {
  const rCard = cObj => {
    return (
      <Grid item xs={12} sm={4}>
        <CCard {...cObj} />
      </Grid>
    );
  };

  return (
    <Grid container spacing={2}>
      {Constants.map(cObj => rCard(cObj))}
    </Grid>
  );
};

export default Content;
