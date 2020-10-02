import { Container, Card, CardHeader } from "@material-ui/core";
import classes from "./index.module.css";

export default function Question(props){
    const question = props.question;
    return(
    <div>
        <Card>
            <CardHeader
                title={question.Q_title}
            />
        </Card>
        <div className ={classes.top}>
        <Container>
            <h3 className={classes.h}>{question.Q_description[0]}</h3>
            <h4 className={classes.j}>{question.Q_description[1]}</h4>
            <h4 className={classes.j}>{question.Q_description[2]}</h4>
        </Container>
        </div>
    </div>);
}
