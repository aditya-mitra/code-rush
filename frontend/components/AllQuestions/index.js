import dynamic from 'next/dynamic'
const Card = dynamic(()=>import('./Card'),{ssr:false})
import questions from "./questions";

function App() {
  return (
    <div>
      <Card title={questions[0].title} sub={questions[0].sub} />
      <Card title={questions[1].title} sub={questions[1].sub} />
      <Card title={questions[2].title} sub={questions[2].sub} />
    </div>
  );
}

export default App;