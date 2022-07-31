import Head from "next/head";
import Image from "next/image";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Testomanial from "../components/Testomanial";
import styles from "../styles/Home.module.css";

export default function Home() {
  return <div className="container mx-auto">
    <Hero/>
    <Testomanial/>
  </div>;
}
