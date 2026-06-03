import SiteHeader from "./components/SiteHeader";
import GSAPHero from "./components/GSAPHero";
import Catalog from "./components/Catalog";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <GSAPHero />
        <Catalog />
        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
