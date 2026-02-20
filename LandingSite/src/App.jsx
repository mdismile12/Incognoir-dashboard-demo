import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import Roadmap from "./components/Roadmap";
import Security from "./components/Security";
import Services from "./components/Services";
import UseCases from "./components/UseCases";
import About from "./components/About";
import Contact from "./components/Contact";
import Testimonials from "./components/Testimonials";
import AnimatedNeuralBackground from "./components/AnimatedNeuralBackground";

const App = () => {
  return (
    <>
      <AnimatedNeuralBackground />
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden relative z-10">
        <div className="relative">
          <Header />
          <Hero />
          <Benefits />
          <HowItWorks />
          <Security />
          <Testimonials />
          <UseCases />
          <About />
          <Contact />
          <Footer />
        </div>
      </div>
      <ButtonGradient />
    </>
  );
};
export default App;
