import Button from "./Button";
import Heading from "./Heading";
import Section from "./Section";

const Contact = () => {
  return (
    <Section id="contact">
      <div className="container">
        <Heading
          className="text-center"
          title="Request a Demo"
        />
        <p className="body-1 text-center max-w-3xl mx-auto mb-12 text-n-2">
          See how Incognoir can transform your organization's security posture.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="h5 mb-4">Get in Touch</h3>
              <p className="body-2 text-n-3 mb-6">
                Ready to enhance your security with behavioral intelligence?
                Contact our team for a personalized demonstration.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-color-1">📧</span>
                  <span className="body-2">incognoirinfo@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-color-1">📞</span>
                  <span className="body-2">+91 816 894 5281</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-color-1">📍</span>
                  <span className="body-2">India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-n-8/50 border border-n-6 rounded-xl p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-lg focus:outline-none focus:border-color-1"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-lg focus:outline-none focus:border-color-1"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Company</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-lg focus:outline-none focus:border-color-color-1"
                  placeholder="Your company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-lg focus:outline-none focus:border-color-1 resize-none"
                  placeholder="Tell us about your security needs..."
                ></textarea>
              </div>
              <Button className="w-full">
                Request Demo
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;