import Heading from "./Heading";
import Section from "./Section";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CISO, TechCorp",
      text: "BrainWave has transformed our security posture. We've seen a 90% reduction in insider threats since implementation.",
      avatar: "👩‍💼",
    },
    {
      name: "Michael Chen",
      position: "Security Director, FinancePlus",
      text: "The behavioral intelligence is incredible. It catches anomalies that our traditional systems completely missed.",
      avatar: "👨‍💼",
    },
    {
      name: "Dr. Emily Rodriguez",
      position: "IT Director, HealthFirst",
      text: "Compliance was never easier. BrainWave's privacy-first approach gives us confidence in our data protection.",
      avatar: "👩‍⚕️",
    },
  ];

  return (
    <Section id="testimonials" className="perspective-1200">
      <div className="container relative transform-style-3d">
        {/* 3D Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-color-1/5 to-transparent rounded-full animate-float-slow blur-2xl"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-color-1/8 to-transparent clip-hexagon animate-spin-3d opacity-30"></div>
          <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-color-1/40 rounded-full animate-float-diagonal"></div>
          <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-color-1/60 rounded-full animate-bounce-3d"></div>
        </div>

        <div className="relative z-10">
          <Heading
            className="text-center transform translate-z-20"
            title="Trusted by Security Leaders"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative bg-n-8/50 border border-n-6 rounded-xl p-6 transform-style-3d hover:scale-105 hover:-rotate-y-3 hover:translate-z-30 transition-all duration-500 shadow-xl hover:shadow-color-1/20 cursor-pointer"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* 3D Depth Layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-color-1/10 to-transparent rounded-xl transform -translate-z-5 group-hover:translate-z-5 transition-transform duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-color-1/5 to-transparent rounded-xl transform -translate-z-10 opacity-50"></div>

                <div className="relative z-10 transform translate-z-10">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{testimonial.avatar}</div>
                  <p className="body-2 text-n-3 mb-4 italic group-hover:text-n-2 transition-colors duration-300">"{testimonial.text}"</p>
                  <div className="transform translate-z-5">
                    <div className="font-semibold text-n-1 group-hover:text-color-1 transition-colors duration-300">{testimonial.name}</div>
                    <div className="text-sm text-n-3">{testimonial.position}</div>
                  </div>
                </div>

                {/* Floating accent elements */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-color-1/20 rounded-full group-hover:bg-color-1/40 transition-colors duration-300 transform translate-z-20"></div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-color-1/30 rounded-full group-hover:bg-color-1/50 transition-colors duration-300 transform translate-z-15"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Testimonials;