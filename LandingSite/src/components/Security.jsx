import Heading from "./Heading";
import Section from "./Section";

const Security = () => {
  const principles = [
    {
      title: "Privacy-First Design",
      text: "All behavioral data is encrypted, anonymized, and processed locally whenever possible to protect user privacy.",
      icon: "🔒",
    },
    {
      title: "Transparent Operations",
      text: "Clear visibility into how BrainWave analyzes behavior and makes security decisions, with detailed audit logs.",
      icon: "👁️",
    },
    {
      title: "Compliance Ready",
      text: "Built to meet GDPR, CCPA, and other regulatory requirements with comprehensive data governance controls.",
      icon: "✅",
    },
    {
      title: "Ethical AI",
      text: "AI models trained on diverse datasets with bias mitigation techniques to ensure fair and accurate security decisions.",
      icon: "🤖",
    },
  ];

  return (
    <Section id="security">
      <div className="container">
        <Heading
          className="text-center"
          title="Security & Trust Principles"
        />
        <p className="body-1 text-center max-w-3xl mx-auto mb-12 text-n-2">
          Built on foundational principles that prioritize both security and transparency.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="p-8 bg-n-8/50 border border-n-6 rounded-xl hover:bg-n-8/70 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-color-1/10 transform-style-3d"
            >
              <div className="text-4xl mb-4">{principle.icon}</div>
              <h3 className="h5 mb-3">{principle.title}</h3>
              <p className="body-2 text-n-3">{principle.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Security;