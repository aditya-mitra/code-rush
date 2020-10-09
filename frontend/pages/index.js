import Home from '../components/Home';
import Layout from '../components/layout';
import { getUserCount } from '../lib/user'

export async function getStaticProps() {
    const {count} = await getUserCount();
    return {
        props: {
            count,
        },
        revalidate: 30
    }
}

function IndexPage(props) {

    return (
        <div>
            <Home usercount={props.count} />
        </div>
    );
}

export default Layout(IndexPage);