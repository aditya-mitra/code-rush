import {useEffect} from 'react';
import Layout from '../components/layout';
import {useSession} from 'next-auth/client'

// just to check which user is logged in or not

function Me(){
    const [session, loading] = useSession();
    
    useEffect(()=>{
        if(!loading)
            console.log(session)
    },[loading]);

    if(loading || !session)
        return(<h4>Getting the data</h4>)

    return(
        <div>
        <h1>I am {session.user.name}</h1>
    
        <section><img src={session.user.image} alt='avatar image'/></section>

        <article>My email is {session.user.email}</article>
    </div>    
    );
}

export default Layout(Me);