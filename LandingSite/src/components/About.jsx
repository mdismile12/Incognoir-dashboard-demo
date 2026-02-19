import Heading from "./Heading";
import Section from "./Section";

const About = () => {
  return (
    <Section id="about" className="perspective-1500">
      <div className="container relative transform-style-3d">
        {/* 3D Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating Orbs */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-color-1/10 to-transparent rounded-full animate-float-slow blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-color-1/15 to-transparent rounded-full animate-float-reverse blur-lg"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-color-1/20 to-transparent rounded-full animate-float-diagonal blur-md"></div>

          {/* Geometric Floating Elements */}
          <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-color-1/30 to-transparent clip-hexagon animate-spin-3d opacity-60"></div>
          <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-gradient-to-br from-color-1/25 to-transparent clip-diamond animate-bounce-3d opacity-70"></div>

          {/* 3D Grid Overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full bg-[linear-gradient(45deg,rgba(0,230,204,0.1)_1px,transparent_1px),linear-gradient(-45deg,rgba(0,230,204,0.1)_1px,transparent_1px)] bg-[size:60px_60px] animate-grid-move"></div>
          </div>
        </div>

        <div className="relative z-10">
          <Heading
            className="text-center transform translate-z-20"
            title="About Incognoir"
          />

          <div className="max-w-4xl mx-auto">
            <p className="body-1 text-center mb-8 text-n-2 transform translate-z-10">
              Incognoir was founded with a mission to revolutionize enterprise security through behavioral intelligence.
              We believe that traditional security approaches are no longer sufficient in today's complex threat landscape.
            </p>

            {/* 3D Mission Statement Card */}
            <div className="bg-n-8/50 border border-n-6 rounded-xl p-8 mb-8 transform-style-3d hover:scale-105 hover:rotate-x-2 transition-all duration-500 shadow-2xl hover:shadow-color-1/20 translate-z-30">
              <div className="absolute inset-0 bg-gradient-to-br from-color-1/5 to-transparent rounded-xl transform -translate-z-10"></div>
              <div className="relative z-10">
                <p className="text-lg italic text-n-1 text-center transform translate-z-20">
                  "Our mission is to empower organizations with intelligent, proactive security that protects against
                  sophisticated threats while maintaining the freedom and productivity that modern businesses require."
                </p>
              </div>
            </div>

            {/* 3D Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="group bg-n-8/30 border border-n-6 rounded-xl p-6 transform-style-3d hover:scale-110 hover:-rotate-y-5 hover:translate-z-20 transition-all duration-500 shadow-lg hover:shadow-color-1/30 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-color-1/10 to-transparent rounded-xl transform -translate-z-5 group-hover:translate-z-10 transition-transform duration-500"></div>
                <div className="relative z-10 transform translate-z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-color-1 to-color-1/70 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-color-1/50 transition-shadow duration-300">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <h3 className="h5 mb-2 group-hover:text-color-1 transition-colors duration-300">Founded</h3>
                  <p className="body-2 text-n-3">2026</p>
                </div>
              </div>

              <div className="group bg-n-8/30 border border-n-6 rounded-xl p-6 transform-style-3d hover:scale-110 hover:rotate-y-5 hover:translate-z-20 transition-all duration-500 shadow-lg hover:shadow-color-1/30 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-color-1/10 to-transparent rounded-xl transform -translate-z-5 group-hover:translate-z-10 transition-transform duration-500"></div>
                <div className="relative z-10 transform translate-z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-color-1 to-color-1/70 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-color-1/50 transition-shadow duration-300">
                    <span className="text-2xl">🌉</span>
                  </div>
                  <h3 className="h5 mb-2 group-hover:text-color-1 transition-colors duration-300">Headquarters</h3>
                  <p className="body-2 text-n-3"> Mumbai, India</p>
                </div>
              </div>

              <div className="group bg-n-8/30 border border-n-6 rounded-xl p-6 transform-style-3d hover:scale-110 hover:-rotate-x-5 hover:translate-z-20 transition-all duration-500 shadow-lg hover:shadow-color-1/30 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-color-1/10 to-transparent rounded-xl transform -translate-z-5 group-hover:translate-z-10 transition-transform duration-500"></div>
                <div className="relative z-10 transform translate-z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-color-1 to-color-1/70 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-color-1/50 transition-shadow duration-300">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h3 className="h5 mb-2 group-hover:text-color-1 transition-colors duration-300">Team</h3>
                  <p className="body-2 text-n-3">50+ Security Experts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;