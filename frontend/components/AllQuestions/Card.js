import PageLink from 'next/link'

import { Button, Chip, Avatar } from "@material-ui/core";
import classes from "./Card.module.css";


function Card(props) {

    const categories = props.categories.map(category =>
        <Chip label={category} color="primary" variant="outlined" key={category} />
    )

    const comments = <Chip color="secondary" avatar={<Avatar>{props.comments}</Avatar>} label="Comments" />

    return (
        <div className={classes.card}>
            <div className={classes.top}>
                <h2 className={classes.name}>{props.title}</h2>
            </div>
            <div className={classes.info}>
                {categories}
                <div className={classes.space} />
                {comments}
            </div>
            <div className={classes.solve}>
                <PageLink href={"/questions/" + props.qid}>
                    <Button variant="contained" color="primary">
                        Solve
                    </Button>
                </PageLink>
            </div>
        </div>
    );
}

export default Card;
