import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { incog } from "../assets";
// import { Logo1 } from "../assets";
import MenuSvg from "../assets/svg/MenuSvg";
import { links } from "../config";
import { navigation } from "../constants";
import Button from "./Button";
import { HambugerMenu } from "./design/Header";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navigation.map(item => item.url.replace('#', ''));
      let current = '';
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = `#${section}`;
          }
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:bg-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="flex items-center w-[12rem] xl:mr-8" href="#hero">
          <img
            src={incog}
            width={36}
            height={36}
            alt="Incognoir Logo"
            className="mr-2 pointer-events-none select-none"
          />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent">Incognoir</span>
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target={item.external ? "_blank" : "_self"}
                rel={item.external && "noreferrer noopener"}
                onClick={handleClick}
                className={`flex lg:flex relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile && "lg:hidden"
                } px-6 py-6 md:py-8 lg:mr-0.25 lg:text-xs lg:font-semibold ${
                  activeSection === item.url
                    ? "z-2 lg:text-n-1" // White text for active section
                    : "lg:text-n-1/50 lg:hover:text-n-1" // Light gray for inactive, white on hover
                } lg:leading-5 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
          </div>

          <HambugerMenu />
        </nav>

        <Button className="hidden lg:flex"  onClick={()=>{
          console.log("Going for signup");

        }}>
          Sign Up
        </Button>

        <Button
          onClick={toggleNavigation}
          className="ml-auto lg:hidden"
          px="px-3"
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
