import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Products from "@/components/Products";
import Quality from "@/components/Quality";
import Industries from "@/components/Industries";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Intro />
        <Products />
        <Quality />
        <Industries />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
