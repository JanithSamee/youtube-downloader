import { Route, Router, Routes } from "@solidjs/router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Usage from "./pages/Usage";
// import {} from "solid-js/r"

function App() {
    return (
        <>
            <Navbar></Navbar>
            <Routes>
                <Route path={"/"} component={Home}></Route>
                <Route path={"/about"} component={About}></Route>
                <Route path={"/usage"} component={Usage}></Route>
            </Routes>
        </>
    );
}
export default App;
