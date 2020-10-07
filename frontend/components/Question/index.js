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
                    <div dangerouslySetInnerHTML={{ __html: question.Q_description }} />
                </Container>
            </div>
        </div>);
}
