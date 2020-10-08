import PageLink from 'next/link';
import Button from "@material-ui/core/Button";

import styles from "./styles.module.css";
const NotFound = () => {
  return (
    <div className={styles.main}>
      <div>
        <img className={styles.image} src="/images/Scarecrow.png" alt="404scarecrowimg"
        loading="lazy" />

      </div>
      <div className={styles.info}>
        <h2>I have bad news for you</h2>
        <p>
          The page you are looking for might be removed or is temporarily
          unavailable
        </p>
        <PageLink href='/'>
        <Button variant="outlined">Return to home page</Button>
          </PageLink>
      </div>
    </div>
  );
};

export default NotFound;
