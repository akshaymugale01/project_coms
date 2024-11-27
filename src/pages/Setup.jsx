import React from "react";
import Navbar from "../components/Navbar";

import SetupNavbar from "../components/navbars/SetupNavbar";

const Setup = () => {
  return (
    <section className="flex" >
      <Navbar/>
      <SetupNavbar/>
    </section>
  );
};

export default Setup;
