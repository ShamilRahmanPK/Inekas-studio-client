import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import NavBar from "../components/Navbar";

// Import images (you'll need to add these to your assets folder)
import aboutImage from "../assets/4x4-prev.jpg";
import founderImage from "../assets/4x6-prev.jpg";

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

function AboutUs() {
  return (
    <div className="about-container overflow-x-hidden w-full bg-[#141414]">
      <NavBar />

      {/* HERO SECTION */}
      <div className="relative w-full max-w-screen-2xl mx-auto mt-[55.56px]">
        <div className="bg-[#1a1a2e] py-20 md:py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
            <ScrollAnimatedContent delay={0.2}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 md:w-20 h-1 bg-[#E6C2A1] rounded"></div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#E6C2A1]">
                  About Us
                </h1>
              </div>
            </ScrollAnimatedContent>
            <ScrollAnimatedContent delay={0.4}>
              <p className="text-base sm:text-lg text-[#D4D4D4] max-w-2xl">
                Newborn photos capture the fleeting moments of pure joy and innocence that new parents cherish forever. These images become precious heirlooms, passed down through generations, preserving the memory of a new life's beginning.
              </p>
            </ScrollAnimatedContent>
          </div>
        </div>
      </div>

      {/* MAIN ABOUT SECTION */}
      <div className="w-full bg-[#141414] py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            {/* Image */}
            <ScrollAnimatedContent delay={0.2}>
              <div className="w-full md:w-1/2">
                <img
                  src={aboutImage}
                  alt="About Inekas Photography"
                  className="rounded-xl shadow-lg w-full object-cover h-[300px] sm:h-[400px]"
                />
              </div>
            </ScrollAnimatedContent>

            {/* Content */}
            <div className="w-full md:w-1/2">
              <ScrollAnimatedContent delay={0.4}>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#E6C2A1] mb-4">
                  About Us
                </h2>
                <p className="text-sm sm:text-base text-[#D4D4D4] mb-4">
                  You are most welcome and thank you for visiting Inekas photography. We at Inekas photography are specialize in newborn, maternity, children and family portrait.
                </p>
                <p className="text-sm sm:text-base text-[#D4D4D4]">
                  We have been photographing newborns, children and families for the last twenty years. Photography is our full-time profession and we truly love creating wonderful images of those you love most. Newborn pictures are a long-standing tradition that brings family great pleasure. By making these photos easily accessible in digital form and beautiful albums, we hope to capture much of this joyful moments.
                </p>
              </ScrollAnimatedContent>
            </div>
          </div>
        </div>
      </div>

      {/* WHAT WE DO SECTION */}
      <div className="w-full bg-[#0f0f0f] py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-center">
            {/* Image */}
            <ScrollAnimatedContent delay={0.2}>
              <div className="w-full md:w-1/2">
                <img
                  src={founderImage}
                  alt="What we do"
                  className="rounded-xl shadow-lg w-full object-cover h-[300px] sm:h-[400px]"
                />
              </div>
            </ScrollAnimatedContent>

            {/* Content */}
            <div className="w-full md:w-1/2">
              <ScrollAnimatedContent delay={0.4}>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#E6C2A1] mb-4">
                  What we do
                </h2>
                <p className="text-sm sm:text-base text-[#D4D4D4] mb-4">
                  The photography challenge is a daily exercise that aims to help us become more creative in photography, each challenges pushes us to create wonderful images of those you love most.
                </p>
                <p className="text-sm sm:text-base text-[#D4D4D4]">
                  We aim to create beautiful, soft and timeless images using natural tones and textures that best compliment your baby and children. We believe that a beautiful portrait of your child should portray so much more than just a smile. Please feel free to give us a call so we can have a chat about the beautiful pictures that we are going to create for you.
                </p>
              </ScrollAnimatedContent>
            </div>
          </div>
        </div>
      </div>

      {/* FOUNDER'S MESSAGE SECTION */}
      <div className="w-full bg-[#141414] py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <ScrollAnimatedContent delay={0.2}>
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#E6C2A1] mb-6">
                Founder's Message
              </h2>
              <div className="max-w-3xl mx-auto">
                <img
                  src={aboutImage}
                  alt="Founder"
                  className="rounded-xl shadow-lg w-full object-cover h-[300px] sm:h-[400px] mb-6"
                />
                <p className="text-base sm:text-lg text-[#D4D4D4] italic mb-4">
                  "The photography challenge is a daily exercise that aims to help us become more creative in photography, and each challenges pushes us to try new ideas."
                </p>
                <p className="text-lg sm:text-xl text-[#E6C2A1] font-semibold">
                  Samira M
                </p>
                <p className="text-sm sm:text-base text-[#D4D4D4]">
                  Founder, Inekas Photography
                </p>
              </div>
            </div>
          </ScrollAnimatedContent>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="w-full bg-[#0f0f0f] py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <ScrollAnimatedContent delay={0.2}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E6C2A1] mb-6">
              The Heartfelt Journey of Becoming a Mother
            </h2>
            <p className="text-sm sm:text-base text-[#D4D4D4] mb-8 max-w-2xl mx-auto">
              Being a mother is one of life's most extraordinary experiences. At INEKAS, we are dedicated to capturing these cherished moments with the artistry and passion of our talented creative team.
            </p>
            <button className="bg-[#E6C2A1] text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-[#d4ac88] transition">
              Book Now
            </button>
          </ScrollAnimatedContent>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;