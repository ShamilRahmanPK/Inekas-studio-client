import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import NavBar from "../components/Navbar";

// Import images
import home_image from "../assets/home-image.jpg";
import weddingImg from "../assets/4x4-prev.jpg";
import birthdayImg from "../assets/4x4-prev.jpg";
import outdoorImg from "../assets/4x4-prev.jpg";
import productImg from "../assets/4x4-prev.jpg";
import defaultImg from "../assets/4x4-prev.jpg";

const galleryImages = [
  weddingImg,
  birthdayImg,
  outdoorImg,
  productImg,
  defaultImg,
];

// Scroll animation wrapper
function ScrollAnimatedContent({ children, delay = 0 }) {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) controls.start("visible");
    else controls.start("hidden");
  }, [isInView, controls]);

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay } },
  };

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants}>
      {children}
    </motion.div>
  );
}

function Home() {
  const [activeIndex, setActiveIndex] = useState(null);

  const services = [
    {
      title: "Newborn",
      description:
        "Comprehensive Newborn photography packages tailored to your needs.",
      image: weddingImg,
    },
    {
      title: "Maternity",
      description:
        "Maternity photography packages designed with your convenience in mind.",
      image: birthdayImg,
    },
    {
      title: "Cake Smash",
      description:
        "Flexible Cake Smash photography packages for your perfect moment.",
      image: outdoorImg,
    },
    {
      title: "Kids Portrait",
      description:
        "Custom Kids Portrait packages to suit every style and need.",
      image: productImg,
    },
  ];

  return (
    <div className="home-container overflow-x-hidden w-full">
      <NavBar />

      {/* HERO SECTION */}
      <div className="relative w-full max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row min-h-screen w-full">
          {/* LEFT SIDE */}
          <div className="flex-1 bg-[#141414] flex flex-col justify-center md:justify-end p-6 sm:p-8 md:p-12 lg:p-16 py-12 md:py-16">
            <ScrollAnimatedContent delay={0.2}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-2 mt-10 md:mt-4" style={{ color: "#E6C2A1" }}>
                Inekas Photography
              </h1>
              <div className="w-16 md:w-20 h-1 bg-[#E6C2A1] mb-4 md:mb-6 rounded"></div>
            </ScrollAnimatedContent>

            <ScrollAnimatedContent delay={0.4}>
              <h2 className="text-lg sm:text-xl md:text-2xl font-medium mb-4 md:mb-6" style={{ color: "#E6C2A1" , fontFamily: 'Lora'}}>
                The way light brings objects to life
              </h2>
            </ScrollAnimatedContent>

            <ScrollAnimatedContent delay={0.6}>
              <p className="text-sm sm:text-base text-[#D4D4D4] max-w-md mb-6 md:mb-8">From newborns and family portraits to events, products, and creative projects, our studio captures life’s moments with precision, creativity, and heart—turning them into memories you’ll cherish forever.</p>
            </ScrollAnimatedContent>

            <ScrollAnimatedContent delay={0.8}>
              <div className="flex gap-4">
                <button className="bg-[#E6C2A1] text-white font-semibold py-2.5 px-6 md:py-3 md:px-8 rounded-lg shadow-lg hover:bg-[#d4ac88] transition text-sm md:text-base">
                  Call Us
                </button>
                <button className="bg-transparent border-2 border-[#E6C2A1] text-[#E6C2A1] font-semibold py-2.5 px-6 md:py-3 md:px-8 rounded-lg hover:bg-[#E6C2A1] hover:text-white transition text-sm md:text-base">
                  Packages
                </button>
              </div>
            </ScrollAnimatedContent>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="flex-1 relative h-64 sm:h-80 md:h-auto min-h-[300px] md:min-h-screen">
            <img src={home_image} alt="Hero" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/100"></div>
          </div>
        </div>

        {/* BOTTOM BORDER LINE */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-700"></div>
      </div>

      {/* SERVICES SECTION */}
      <div className="w-full bg-[#141414] py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          {/* HEADING */}
          <div className="border-b border-gray-700 pb-4 md:pb-6">
            <div className="service-heading flex flex-col md:flex-row justify-between gap-4 md:gap-6">
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-0">
                <div className="w-12 md:w-20 h-1 bg-[#E6C2A1] rounded"></div>
                <h2 className="text-2xl sm:text-3xl text-[#E6C2A1] font-bold">Capture Your Moments with Affordable Elegance</h2>
              </div>
              <div className="text-gray-300 max-w-xl text-sm sm:text-base">
                <p>
                  At Inekas, we believe that the best results come from true creative collaboration. Our diverse perspectives make our work stronger, allowing us to offer you premium photoshoots at a perfectly affordable price.
                </p>
              </div>
            </div>
          </div>

          {/* ACCORDION + IMAGE PREVIEW */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 mt-8 md:mt-12">
            {/* LEFT - ACCORDIONS */}
            <div className="w-full md:w-1/2 space-y-4 md:space-y-8">
              {services.map((service, index) => {
                const ref = useRef(null);
                const isInView = useInView(ref);
                const controls = useAnimation();

                useEffect(() => {
                  if (isInView) controls.start("visible");
                  else controls.start("hidden");
                }, [isInView, controls]);

                const itemVariants = {
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.2 } },
                };

                return (
                  <motion.div
                    key={index}
                    ref={ref}
                    initial="hidden"
                    animate={controls}
                    variants={itemVariants}
                    className="border-b border-gray-700 p-3 md:p-5"
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() =>
                        setActiveIndex(activeIndex === index ? null : index)
                      }
                    >
                      <h3 className="text-lg sm:text-xl font-semibold text-[#D6D1CE]">
                        {service.title}
                      </h3>
                      <span className="text-white text-xl md:text-2xl">
                        {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                      </span>
                    </div>

                    <AnimatePresence>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 md:mt-4 text-xs sm:text-sm text-[#D4D4D4]"
                        >
                          <p className="mb-3 md:mb-4">{service.description}</p>
                          <button className="bg-[#E6C2A1] text-black font-semibold px-3 py-1.5 md:px-4 md:py-2 text-white rounded-lg hover:bg-[#d6ad8a] transition text-xs sm:text-sm">
                            View Details
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* RIGHT — PREVIEW IMAGE */}
            <div className="w-full md:w-1/2">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={activeIndex !== null ? services[activeIndex].image : defaultImg}
                  alt="Preview"
                  className="rounded-xl shadow-lg w-full object-cover h-[250px] sm:h-[300px] md:h-[400px]"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* CREATIVE THEMES SECTION */}
      <div className="w-full bg-[#0f0f0f] py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <ScrollAnimatedContent delay={0.2}>
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#E6C2A1] font-bold mb-4">
                Creative Newborn Photography Themes
              </h2>
              <p className="text-sm sm:text-base text-[#D4D4D4] max-w-3xl mx-auto">
                Explore a diverse selection of creative themes and distinctive add-ons for newborn photography. Each theme is crafted by independent artists, designed to enhance your photos and make them truly memorable.
              </p>
            </div>
          </ScrollAnimatedContent>

          {/* Themes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { title: "Diamond", description: "Comprehensive Newborn photography packages tailored to your needs.", image: weddingImg },
              { title: "Star", description: "Maternity photography packages designed with your convenience in mind.", image: birthdayImg },
              { title: "Sunflower", description: "Flexible Cake Smash photography packages for your perfect moment.", image: outdoorImg },
              { title: "Sky", description: "Custom Kids Portrait packages to suit every style and need.", image: productImg }
            ].map((theme, index) => (
              <ScrollAnimatedContent key={index} delay={0.2 + index * 0.1}>
                <div className="bg-[#1a1a1a] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                  <img src={theme.image} alt={theme.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#E6C2A1] mb-2">{theme.title}</h3>
                    <p className="text-xs sm:text-sm text-[#D4D4D4]">{theme.description}</p>
                  </div>
                </div>
              </ScrollAnimatedContent>
            ))}
          </div>

          <ScrollAnimatedContent delay={0.8}>
            <div className="text-center mt-8 md:mt-12">
              <button className="bg-[#E6C2A1] text-white font-semibold py-2.5 px-6 md:py-3 md:px-8 rounded-lg shadow-lg hover:bg-[#d4ac88] transition text-sm md:text-base">
                Book Now
              </button>
            </div>
          </ScrollAnimatedContent>
        </div>
      </div>

      {/* GALLERY SECTION */}
<div className="w-full bg-[#141414] py-14 sm:py-18 md:py-24 overflow-hidden">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">

    {/* Title */}
    <div className="mb-12">
  <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6">

    {/* Left: Title */}
    <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#E6C2A1] font-bold whitespace-nowrap">
      Gallery
    </h2>

    {/* Middle: Line */}
    <div className="flex-1 h-[2px] bg-gradient-to-r from-[#E6C2A1] via-[#E6C2A1]/60 to-transparent rounded" />

    {/* Right: Description */}
    <p className="text-sm sm:text-base text-gray-400 max-w-xs text-center md:text-right">
      A glimpse of moments captured with passion, precision, and timeless storytelling.
    </p>

  </div>
</div>


    {/* 🔲 Crawler Wrapper */}
    <div className="relative border border-[#2a2a2a] rounded-2xl overflow-hidden bg-black/40 backdrop-blur-sm">

      {/* Left Gradient */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-20 sm:w-28 md:w-36 
        bg-gradient-to-r from-black via-black/80 to-transparent z-10" />

      {/* Right Gradient */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 sm:w-28 md:w-36 
        bg-gradient-to-l from-black via-black/80 to-transparent z-10" />

      {/* Bottom Gradient */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 
        bg-gradient-to-t from-black via-black/70 to-transparent z-10" />

      {/* 🖼️ Crawler */}
      <motion.div
        className="flex gap-6 px-6 py-10"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 38,
        }}
      >
        {[...galleryImages, ...galleryImages].map((img, index) => (
          <div
            key={index}
            className="min-w-[240px] sm:min-w-[280px] md:min-w-[320px]
                       h-[240px] sm:h-[280px] md:h-[320px]
                       overflow-hidden rounded-xl shadow-lg"
          >
            <img
              src={img}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover
                         transition-transform duration-700 hover:scale-110"
            />
          </div>
        ))}
      </motion.div>
    </div>

  </div>
</div>

      {/* MOTHERHOOD JOURNEY SECTION */}
      <div className="w-full bg-[#0f0f0f] py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            {/* Image */}
            <ScrollAnimatedContent delay={0.2}>
              <div className="w-full md:w-1/2">
                <img
                  src={home_image}
                  alt="Motherhood Journey"
                  className="rounded-xl shadow-lg w-full object-cover h-[300px] sm:h-[400px]"
                />
              </div>
            </ScrollAnimatedContent>

            {/* Content */}
            <div className="w-full md:w-1/2">
              <ScrollAnimatedContent delay={0.4}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E6C2A1] mb-4 md:mb-6">
                  The Heartfelt Journey of Becoming a Mother
                </h2>
                <p className="text-sm sm:text-base text-[#D4D4D4] mb-6 md:mb-8">
                  Being a mother is one of life's most extraordinary experiences. At INEKAS, we are dedicated to capturing these cherished moments with the artistry and passion of our talented creative team. This version enhances flow and emphasizes the uniqueness of the experience and the team's commitment.
                </p>
                <button className="bg-[#E6C2A1] text-white font-semibold py-2.5 px-6 md:py-3 md:px-8 rounded-lg shadow-lg hover:bg-[#d4ac88] transition text-sm md:text-base">
                  Book Now
                </button>
              </ScrollAnimatedContent>
            </div>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="w-full bg-[#141414] py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <ScrollAnimatedContent delay={0.2}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E6C2A1] mb-6">
              We Love New Challenges
            </h2>
            <p className="text-base sm:text-lg text-[#D4D4D4] mb-8">
              Join us for a great photo session.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#E6C2A1] text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-[#d4ac88] transition">
                Contact
              </button>
              <button className="bg-transparent border-2 border-[#E6C2A1] text-[#E6C2A1] font-semibold py-3 px-8 rounded-lg hover:bg-[#E6C2A1] hover:text-white transition">
                More Info
              </button>
            </div>
          </ScrollAnimatedContent>
        </div>
      </div>
    </div>
  );
}

export default Home;
