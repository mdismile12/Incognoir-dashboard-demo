import { useRef } from "react";
import { ScrollParallax } from "react-just-parallax";
import Typewriter from "typewriter-effect";

import { curve } from "../assets";
import { heroIcons } from "../constants";
import Button from "./Button";
import CompanyLogos from "./CompanyLogos";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import Generating from "./Generating";
import Notification from "./Notification";
import Section from "./Section";

const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem] perspective-1000 min-h-screen flex items-center justify-center"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div ref={parallaxRef} className="container relative transform-style-3d w-full h-full flex flex-col items-center justify-center">
        <div className="relative z-1 max-w-[62rem] w-full mx-auto text-center mb-[4rem] md:mb-20 lg:mb-[6rem] animate-fade-in-up">
          <h1 className="h1 mb-6 animate-fade-in-up text-center" style={{ animationDelay: "0.1s" }}>
            Incognoir – 
            <br />
            <Typewriter
              options={{
                strings: ["Cloud-First Behavioral Security Platform"],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>

          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8 animate-fade-in-up text-center" style={{ animationDelay: "0.2s" }}>
            Incognoir leverages behavioral intelligence to deliver proactive security for cloud-native enterprises. With{" "}
            <span className="inline-block relative font-semibold">
              Incognoir
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
            , continuously analyze user behavior to detect anomalies and enforce zero-trust access policies.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button href="#pricing" white>
              Get Started
            </Button>
            <Button href="#features" >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-color-1 mb-2">99.9%</div>
              <div className="text-sm text-n-3">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-color-1 mb-2">500+</div>
              <div className="text-sm text-n-3">Enterprises</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-color-1 mb-2">10M+</div>
              <div className="text-sm text-n-3">Users Protected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-color-1 mb-2">24/7</div>
              <div className="text-sm text-n-3">Support</div>
            </div>
          </div>
        </div>

        {/* Floating elements over background */}
        <div className="relative w-full mt-20 lg:mt-32 h-96 pointer-events-none">
          {/* Generating Animation */}
          <div className="absolute left-4 right-4 bottom-20 md:left-1/2 md:right-auto md:bottom-24 md:w-[31rem] md:-translate-x-1/2 pointer-events-auto animate-pop-in" style={{ animationDelay: "0.5s" }}>
            <Generating />
          </div>

          {/* Icons */}
          <ScrollParallax isAbsolutelyPositioned>
            <ul className="hidden absolute left-10 bottom-32 px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex pointer-events-auto animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              {heroIcons.map((icon, index) => (
                <li className="p-5" key={index}>
                  <img src={icon} width={24} height={25} alt={icon} />
                </li>
              ))}
            </ul>
          </ScrollParallax>

          {/* Threat Detection Notification */}
          <ScrollParallax isAbsolutelyPositioned>
            <div className="hidden absolute right-10 bottom-40 w-[18rem] xl:block pointer-events-auto animate-pop-in" style={{ animationDelay: "0.7s" }}>
              <Notification title="Threat Detection" />
            </div>
          </ScrollParallax>
        </div>

        <BackgroundCircles parallaxRef={parallaxRef} />
        <CompanyLogos className="hidden relative z-10 mt-20 lg:block animate-fade-in-up" style={{ animationDelay: "0.8s" }} />
      </div>

      <BottomLine />
    </Section>
  );
};

export default Hero;
