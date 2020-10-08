import React from "react";
import styles from "./styles.module.css";
import PageLink from 'next/link'
import Button from '@material-ui/core/Button'
import { useSession } from 'next-auth/client'
export default function Profile() {


  const [session, loading] = useSession();
  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>

        <form action>
          <img
            src={session.user.image}
            className={styles.image}
            loading="lazy"
          />
          <h1>

            My Profile
          </h1>
          <div>
            <label htmlFor>
              <em>
                <strong>
                  <h3>Name: {session.user.name}</h3>

                </strong>
              </em>
            </label>

          </div>
          <div>
            <label htmlFor>
              <em>
                <strong>
                  <h3>Email:   {session.user.email}</h3>

                </strong>
              </em>
            </label>
          </div>

            <h3>Points: 100</h3>
            <PageLink href='/dashboard'>
              <Button variant="contained" color='primary' style={{ borderRadius: 50 ,marginLeft:80}}>Resume to solve questions</Button>
            </PageLink>


        </form>

      </div>
    </div>

  );
}
