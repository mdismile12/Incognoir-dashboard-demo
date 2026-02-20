import { smallSphere, stars } from "../assets";
import { LeftLine, RightLine } from "./design/Pricing";
import Heading from "./Heading";
import PricingList from "./PricingList";
import Section from "./Section";

const Pricing = () => {
  return (
    <Section className="overflow-hidden" id="pricing">
      <div className="container relative z-2">
        <div className="hidden relative justify-center mb-[6.5rem] lg:flex animate-zoom-in">
          <img
            src={smallSphere}
            className="relative z-1 pointer-events-none select-none"
            width={255}
            height={255}
            alt="Sphere"
          />

          <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <img
              src={stars}
              className="w-full animate-pulse pointer-events-none select-none"
              width={950}
              height={400}
              alt="Stars"
            />
          </div>
        </div>

        <div className="animate-fade-in-up">
          <Heading
            tag="Get started with BrainWave"
            title="Pay once, use forever"
          />
        </div>

        <div className="relative animate-bounce-in" style={{ animationDelay: "0.2s" }}>
          <PricingList />
          <LeftLine />
          <RightLine />
        </div>

        <div className="flex justify-center mt-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <a
            className="text-xs font-code font-bold tracking-wider uppercase border-b"
            href="#"
          >
            See the full details
          </a>
        </div>
      </div>
    </Section>
  );
};

export default Pricing;
