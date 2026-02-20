import Heading from "./Heading";
import Section from "./Section";

const HowItWorks = () => {
  const steps = [
    {
      id: "1",
      title: "Data Collection",
      text: "Incognoir collects behavioral data from user interactions, device usage, and network activity across your enterprise environment.",
    },
    {
      id: "2",
      title: "Behavioral Modeling",
      text: "Advanced machine learning algorithms create dynamic behavioral profiles for each user, adapting to changing patterns over time.",
    },
    {
      id: "3",
      title: "Anomaly Detection",
      text: "Real-time analysis identifies deviations from normal behavior, flagging potential security threats before they can cause damage.",
    },
    {
      id: "4",
      title: "Automated Response",
      text: "Intelligent automation enforces security policies, blocks suspicious activities, and alerts security teams when necessary.",
    },
  ];

  return (
    <Section id="how-it-works">
      <div className="container">
        <Heading
          className="text-center"
          title="How It Works"
        />
        <p className="body-1 text-center max-w-3xl mx-auto mb-12 text-n-2">
          Our four-step process delivers continuous security assessment without disrupting legitimate user activity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative p-6 bg-n-8/50 border border-n-6 rounded-xl hover:bg-n-8/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-color-1/20 transform-style-3d"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-color-1 rounded-full text-n-8 font-bold text-xl mb-4">
                {step.id}
              </div>
              <h3 className="h5 mb-3">{step.title}</h3>
              <p className="body-2 text-n-3">{step.text}</p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-n-6 transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default HowItWorks;