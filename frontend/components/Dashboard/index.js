import { Grid } from "@material-ui/core";
import Content from "./content";

const Dash = () => {
  return (
    <Grid container direction="column">
      <Grid item container>
        <Grid item xs={false} sm={2} />
        <Grid item xs={12} sm={8}>
          <Content />
        </Grid>
        <Grid item xs={false} sm={2} />
      </Grid>
    </Grid>
  );
};

export default Dash;
