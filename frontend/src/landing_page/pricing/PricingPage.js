import React from "react";
import Hero from "./Hero";
import Calculator from "./Calculator";
import Brokerage from "./Brokerage";
import OpenAccount from "../OpenAccount";

function PricingPage() {
  return (
    <>
      <Hero />
      <Calculator />
      <Brokerage />
      <OpenAccount />
    </>
  );
}

export default PricingPage;