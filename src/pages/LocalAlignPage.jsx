import Navbar from '../components/Navbar';
import Solver from "../components/Solver";

function LocalAlignPage() {
  return (
    <>
    <Navbar />
    <h1 style={{paddingTop: "60px"}}>Local Alignment</h1>
    <Solver option="local"/>
    </>
  );
}

export default LocalAlignPage;