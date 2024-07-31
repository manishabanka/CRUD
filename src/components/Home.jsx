import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const test = useSelector((s) => s.customers);

  return <div>Home page</div>;
};

export default Home;
