import { Heading } from "@chakra-ui/react";
import * as React from "react";
import Navbar from "./Navbar";

const LandingPage = () => {

  return (
    <div id="landing-page">
      <Navbar />
      <Heading>This is Landing Page</Heading>
      <Heading>Welcome to Kensa</Heading>
      {/* <h1>Welcome to Kensa</h1> */}
      <p>The one stop to monitoring your GraphQL server</p>
    </div>
  );
};

export default LandingPage;