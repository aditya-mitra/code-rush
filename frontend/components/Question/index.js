import { useRouter } from 'next/router';

import { KeyboardArrowLeft } from '@material-ui/icons'
import { Container, Card, CardHeader, IconButton } from "@material-ui/core";
import classes from "./index.module.css";

export default function Question(props) {
    const question = props.question;
    const router = useRouter();

    return (
        <div>
            <Card>
                <IconButton onClick={()=>router.back()}><KeyboardArrowLeft /></IconButton>
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
