import Navbar from '../components/Navbar';
import Solver from '../components/Solver';

function GlobalAlignPage() {
  return (
    <>
    <Navbar />
    <h1 style={{paddingTop: "60px"}}>Global Alignment</h1>
    <Solver option="global" />
    </>
  )
}

export default GlobalAlignPage;