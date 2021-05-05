import { Logincomp } from "../components/Login";
import { Navbar } from "../components/Navbar";

export function Accountpage() {
  console.log("cart displayed");
  return (
    <div>
      <Navbar />
      <h1>Yeh account page hai</h1>
      <Logincomp />
    </div>
  );
}
