import PageLink from 'next/link'
import Button from "@material-ui/core/Button";
import classes from "./Card.module.css";
function Card(props) {
  return (
      <div className={classes.card}>
      <div className={classes.top}>
        <h2 className={classes.name}>{props.title}</h2>
      </div>
        <div className={classes.bottom}>
        <p className={classes.info}>{props.sub}</p>
      </div>
      <div className={classes.solve}>
        <PageLink href={"/questions/"+props.qid}>
          <Button variant="contained" color="primary">
            Solve
          </Button>
        </PageLink>
      </div>
    </div>
  );
}

export default Card;
