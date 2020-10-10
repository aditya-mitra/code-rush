import { useRouter } from 'next/router';

import { KeyboardArrowLeft } from '@material-ui/icons'
import { Card, CardHeader, IconButton } from "@material-ui/core";
import classes from "./index.module.css";
import markdownClasses from "./markdown.module.css";

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
                <div className={markdownClasses.markdown} dangerouslySetInnerHTML={{ __html: question.Q_description }} />
            </div>
        </div>);
}
