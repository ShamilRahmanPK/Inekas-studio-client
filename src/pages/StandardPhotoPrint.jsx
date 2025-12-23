import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Star, Shield, Truck, Award, Sparkles, Camera, Heart } from "lucide-react";

import img35x5 from "../assets/3.5x5-prev.webp";
import img4x6 from "../assets/4x6-prev.jpg";
import img5x7 from "../assets/5x7-prev.jpg";
import img8x10 from "../assets/8x10-prev.jpg";
import img4x4 from "../assets/4x4-prev.jpg";
import img8x8 from "../assets/8x8-prev.webp";
import Navbar from "../components/Navbar";

export default function StandardPhotoPrint() {
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState("10x15");
  const [selectedPaper, setSelectedPaper] = useState("Luster");
  const [promoCode, setPromoCode] = useState("");

  const sizes = ["10x15", "13x18", "15x21", "20x25", "20x30"];
  const papers = ["Luster", "Glossy"];

  const imageMap = {
    "10x15": img4x6,
    "13x18": img5x7,
    "15x21": img5x7,
    "20x25": img8x10,
    "20x30": img8x10,
  };

  const previewImage = imageMap[selectedSize];

  const getPricePerImage = () => {
    let price = 5;
    if (selectedSize === "10x15") price = 5;
    if (selectedSize === "13x18") price = 8;
    if (selectedSize === "15x21") price = 10;
    if (selectedSize === "20x25") price = 15;
    if (selectedSize === "20x30") price = 18;

    if (selectedPaper === "Glossy") price += 2;

    return price;
  };

  const pricePerImage = getPricePerImage();

  const handleCreateNow = () => {
    navigate("/image/upload", {
      state: {
        size: selectedSize,
        paperType: selectedPaper,
        promoCode,
      },
    });
  };

  const features = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "Professional-grade silver halide photo paper for stunning clarity",
    },
    {
      icon: Shield,
      title: "100% Satisfaction",
      description: "Money-back guarantee if you're not completely satisfied",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Express shipping available - receive prints within 3-5 days",
    },
    {
      icon: Sparkles,
      title: "Expert Finishing",
      description: "Hand-inspected quality control for every single print",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Absolutely stunning quality! The colors are vibrant and the detail is incredible. Best photo printing service I've used.",
    },
    {
      name: "Michael Chen",
      rating: 5,
      text: "Professional results every time. I use Inekas for all my client deliverables. The luster finish is perfect!",
    },
    {
      name: "Emma Williams",
      rating: 5,
      text: "Fast turnaround and exceptional quality. My wedding photos look absolutely beautiful printed on their paper.",
    },
  ];

  return (
    <div className="bg-[#141414] min-h-screen w-full">
      <Navbar />

      {/* Hero Section with Glassmorphic Design */}
      <div className="relative pt-24 pb-12 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-[#E6C2A1]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-[#E6C2A1]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-gray-400 mb-8"
          >
            <span onClick={() => navigate('/')} className="hover:text-[#E6C2A1] cursor-pointer transition-colors">Home</span>
            <span>/</span>
            <span className="text-[#E6C2A1]">Standard Prints</span>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Product Showcase */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Main Image with Glassmorphic Frame */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E6C2A1]/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                  <motion.img
                    key={selectedSize}
                    src={previewImage}
                    alt={`${selectedSize} preview`}
                    className="w-full h-[400px] object-contain rounded-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-4 right-4 bg-[#E6C2A1] text-black px-4 py-2 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Professional Grade
                  </div>
                </div>
              </div>

              {/* Size Thumbnails */}
              <div className="grid grid-cols-6 gap-3">
                {sizes.map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      relative aspect-square rounded-lg overflow-hidden border-2 transition-all
                      ${selectedSize === size 
                        ? "border-[#E6C2A1] shadow-lg shadow-[#E6C2A1]/20" 
                        : "border-white/10 hover:border-white/30"
                      }
                    `}
                  >
                    <img
                      src={imageMap[size]}
                      alt={size}
                      className="w-full h-full object-cover"
                    />
                    {selectedSize === size && (
                      <div className="absolute inset-0 bg-[#E6C2A1]/20 flex items-center justify-center">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Product Description */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <h3 className="text-[#E6C2A1] font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  About Our Prints
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Our premium photo prints use professional silver halide photo paper with emulsion printing technology. 
                  Each print is carefully crafted to preserve the vibrant colors and fine details of your memories. 
                  Choose from multiple sizes and finishes to create the perfect display for your space.
                </p>
              </div>
            </motion.div>

            {/* Right Side - Configuration Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Header */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-[#E6C2A1] mb-3">
                  Standard Photo Prints
                </h1>
                <p className="text-gray-400 text-lg">
                  Museum-quality prints for your cherished memories
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#E6C2A1] text-[#E6C2A1]" />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">4.9 out of 5 (1,084 reviews)</span>
              </div>

              {/* Price Display */}
              <div className="bg-gradient-to-br from-[#E6C2A1]/10 to-transparent border border-[#E6C2A1]/20 rounded-xl p-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-sm text-gray-400 uppercase tracking-wider">Starting at</span>
                </div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-[#E6C2A1]">AED {pricePerImage}</span>
                  <span className="text-gray-400 text-sm">per print</span>
                </div>
                <p className="text-gray-400 text-sm">Free shipping on orders over AED 50</p>
              </div>

              {/* Configuration Options */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 space-y-6">
                {/* Size Selection */}
                <div>
                  <label className="text-[#E6C2A1] font-semibold mb-3 block">
                    Select Size: <span className="text-white font-normal">{selectedSize} cm</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {sizes.map((size) => (
                      <motion.button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          relative px-4 py-3 rounded-lg font-medium transition-all
                          ${selectedSize === size
                            ? "bg-gradient-to-r from-[#E6C2A1] to-[#d4ac88] text-black shadow-lg shadow-[#E6C2A1]/40"
                            : "bg-gradient-to-br from-[#2a2520] to-[#1f1b18] text-[#E6C2A1] hover:from-[#332b25] hover:to-[#2a2520] border border-[#E6C2A1]/20"
                          }
                        `}
                      >
                        {size === "15x21" && (
                          <span className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-lg">
                            POPULAR
                          </span>
                        )}
                        {size} cm
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Paper Type */}
                <div>
                  <label className="text-[#E6C2A1] font-semibold mb-3 block">
                    Paper Finish: <span className="text-white font-normal">{selectedPaper}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {papers.map((paper) => (
                      <motion.button
                        key={paper}
                        onClick={() => setSelectedPaper(paper)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          px-4 py-3 rounded-lg font-medium transition-all
                          ${selectedPaper === paper
                            ? "bg-gradient-to-r from-[#E6C2A1] to-[#d4ac88] text-black shadow-lg shadow-[#E6C2A1]/40"
                            : "bg-gradient-to-br from-[#2a2520] to-[#1f1b18] text-[#E6C2A1] hover:from-[#332b25] hover:to-[#2a2520] border border-[#E6C2A1]/20"
                          }
                        `}
                      >
                        {paper}
                      </motion.button>
                    ))}
                  </div>
                  <p className="text-gray-400 text-xs mt-2">
                    {selectedPaper === "Luster" 
                      ? "Semi-gloss finish with excellent color reproduction" 
                      : "High-gloss finish for maximum vibrancy and depth"
                    }
                  </p>
                </div>

                {/* Promo Code */}
                <div>
                  <label className="text-[#E6C2A1] font-semibold mb-3 block">
                    Promo Code (Optional)
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6C2A1]"
                    />
                    <button
                      onClick={() => alert(`Promo code "${promoCode}" applied!`)}
                      className="px-6 py-3 bg-gradient-to-r from-[#E6C2A1] to-[#d4ac88] hover:from-[#d4ac88] hover:to-[#E6C2A1] rounded-lg font-semibold text-black transition-all shadow-lg shadow-[#E6C2A1]/30"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={handleCreateNow}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#E6C2A1] via-[#d4ac88] to-[#c9a57a] hover:from-[#f0d4b8] hover:via-[#E6C2A1] hover:to-[#d4ac88] text-black py-4 rounded-xl font-bold text-lg shadow-xl shadow-[#E6C2A1]/40 hover:shadow-2xl hover:shadow-[#E6C2A1]/60 transition-all flex items-center justify-center gap-3"
              >
                <Heart className="w-5 h-5" />
                Create Your Prints Now
              </motion.button>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-6 text-gray-400 text-sm pt-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#E6C2A1]" />
                  Secure Payment
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#E6C2A1]" />
                  Fast Shipping
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#E6C2A1]" />
                  Quality Guaranteed
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-transparent to-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#E6C2A1] mb-4">
              Why Choose Inekas?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Professional quality meets exceptional service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-[#E6C2A1]/30 transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#E6C2A1] to-[#d4ac88] rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#E6C2A1] mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-400 text-lg">
              Join thousands of satisfied customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-[#E6C2A1]/30 transition-all"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E6C2A1] text-[#E6C2A1]" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="text-[#E6C2A1] font-semibold">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quality Guarantee Section */}
      <div className="py-20 bg-gradient-to-b from-black/30 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#E6C2A1]/10 to-transparent border border-[#E6C2A1]/20 rounded-2xl p-12"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-[#E6C2A1] to-[#d4ac88] rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-black" />
            </div>
            <h2 className="text-3xl font-bold text-[#E6C2A1] mb-4">
              100% Satisfaction Guarantee
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
              We stand behind the quality of every print. If you're not completely satisfied with your order, 
              we'll reprint it for free or provide a full refund. No questions asked.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}