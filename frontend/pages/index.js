import Home from '../components/Home';
import Layout from '../components/layout';

function IndexPage() {
    return (
        <div>
            <Home />
        </div>
    );
}

export default Layout(IndexPage);