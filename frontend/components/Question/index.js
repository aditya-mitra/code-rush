import { Container, Card, CardHeader } from "@material-ui/core";
import classes from "./index.module.css";

export default function Question(props) {
    const question = props.question;
        
    return (
        <div>
            <Card>
                <CardHeader
                    title={question.Q_title}
                />
            </Card>
            <div className={classes.top}>
                <Container>
                    <h4 className={classes.j}>{question.Q_description}</h4>
                </Container>
            </div>
        </div>);
}
