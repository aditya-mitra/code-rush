import Layout from '../../components/layout'
import Leaderboard from '../../components/Leaderboard'

import { getLeaderBoard } from '../../lib/leaderboard';


export async function getStaticProps() {
    const leaderboard = await getLeaderBoard();

    return {
        props: {
            leaderboard,
        },
        revalidate: 30,
    }
}


function leaderboardPage({ leaderboard }) {

    return <Leaderboard leaderboard={leaderboard} />

}

export default Layout(leaderboardPage);