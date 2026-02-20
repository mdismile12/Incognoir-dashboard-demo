import Heading from "./Heading";
import Section from "./Section";

const UseCases = () => {
  const useCases = [
    {
      title: "Real-Time Traffic",
      text: "Protect sensitive financial data and prevent insider threats with real-time behavioral monitoring of trading platforms and banking systems.",
      icon: "📊",
    },
    {
      title: "Threats Blocked",
      text: "Secure patient data and medical devices while ensuring compliance with HIPAA and other healthcare regulations.",
      icon: "🛡️",
    },
    {
      title: "Active Devices",
      text: "Safeguard intellectual property and prevent data exfiltration in software development and cloud infrastructure environments.",
      icon: "💻",
    },
    {
      title: "Alerts And Incidents",
      text: "Defend against sophisticated cyber threats and insider risks in critical government systems and classified networks.",
      icon: "🚨",
    },
  ];

  return (
    <Section id="use-cases">
      <div className="container">
        <Heading
          className="text-center"
          title="Enterprise Use Cases"
        />
        <p className="body-1 text-center max-w-3xl mx-auto mb-12 text-n-2">
          BrainWave addresses critical security challenges across modern enterprise environments.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="p-8 bg-n-8/50 border border-n-6 rounded-xl hover:bg-n-8/70 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-color-1/10 transform-style-3d"
            >
              <div className="text-4xl mb-4">{useCase.icon}</div>
              <h3 className="h5 mb-3">{useCase.title}</h3>
              <p className="body-2 text-n-3">{useCase.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default UseCases;