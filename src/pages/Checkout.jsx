import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Banknote,
  MapPin,
  CheckCircle,
  ShoppingBag,
  ArrowLeft,
  Truck,
  Package,
  AlertCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import StripePayment from "../components/StripePayment";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get uploaded images & order info from navigation state
  const uploadedImages = location.state?.uploadedImages || [];
  const totals = location.state?.totals || {
    subtotal: 0,
    deliveryCharge: 29,
    discount: 0,
    total: 29,
  };
  const promoCode = location.state?.promoCode || "";

  // Form state
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United Arab Emirates",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promoCodeInput, setPromoCodeInput] = useState(promoCode || "");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promoApplied, setPromoApplied] = useState(!!promoCode);
  const [promoError, setPromoError] = useState("");
  const [currentTotals, setCurrentTotals] = useState(totals);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Redirect if no uploaded images
  useEffect(() => {
    if (!uploadedImages || uploadedImages.length === 0) {
      navigate("/image/upload");
    }
  }, [uploadedImages, navigate]);

  // Handle input change
  const handleInputChange = (field, value) => {
    setDeliveryAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const [imagesWithPreview, setImagesWithPreview] = useState([]);
  useEffect(() => {
  const mapped = uploadedImages.map((img) => ({
    ...img,
    preview: img.croppedFile
      ? URL.createObjectURL(img.croppedFile)
      : URL.createObjectURL(img.file),
  }));
  setImagesWithPreview(mapped);

  // Cleanup object URLs when component unmounts
  return () => {
    mapped.forEach((img) => URL.revokeObjectURL(img.preview));
  };
}, [uploadedImages]);


  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!deliveryAddress.fullName.trim()) errors.fullName = "Full name is required";
    if (!deliveryAddress.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(deliveryAddress.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number format";
    }
    if (!deliveryAddress.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(deliveryAddress.email)) {
      errors.email = "Invalid email format";
    }
    if (!deliveryAddress.addressLine1.trim()) errors.addressLine1 = "Address is required";
    if (!deliveryAddress.city.trim()) errors.city = "City is required";
    if (!deliveryAddress.state.trim()) errors.state = "State/Province is required";
    if (!deliveryAddress.zipCode.trim()) errors.zipCode = "ZIP/Postal code is required";
    if (!deliveryAddress.country.trim()) errors.country = "Country is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Apply promo code
  const handleApplyPromo = async () => {
    if (!promoCodeInput.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }
    setIsApplyingPromo(true);
    setPromoError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const validPromoCodes = {
        SAVE10: 0.1,
        SAVE15: 0.15,
        SAVE20: 0.2,
        FIRSTORDER: 0.25,
      };

      const discountRate = validPromoCodes[promoCodeInput.toUpperCase()];
      if (discountRate) {
        const discount = currentTotals.subtotal * discountRate;
        const newTotal = currentTotals.subtotal + currentTotals.deliveryCharge - discount;
        setCurrentTotals({ ...currentTotals, discount, total: newTotal });
        setPromoApplied(true);
        setTimeout(() => setPromoApplied(false), 3000);
      } else {
        setPromoError("Invalid promo code");
      }
    } catch {
      setPromoError("Failed to apply promo code");
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handlePlaceOrder = async () => {
  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
    const formData = new FormData();

    // -----------------------
    // Images
    // -----------------------
    uploadedImages.forEach((img, index) => {
      formData.append("images", img.croppedFile || img.file); // FILE
      formData.append(`items[${index}][size]`, img.size);
      formData.append(`items[${index}][paper]`, img.paper);
      formData.append(`items[${index}][quantity]`, img.quantity);
      formData.append(`items[${index}][cropped]`, img.cropped);

      if (img.cropData) {
        formData.append(
          `items[${index}][cropData]`,
          JSON.stringify(img.cropData)
        );
      }
    });

    // -----------------------
    // Address
    // -----------------------
    Object.entries(deliveryAddress).forEach(([key, value]) => {
      formData.append(`deliveryAddress[${key}]`, value);
    });

    // -----------------------
    // Pricing
    // -----------------------
    formData.append("pricing[subtotal]", currentTotals.subtotal);
    formData.append("pricing[discount]", currentTotals.discount);
    formData.append("pricing[deliveryCharge]", currentTotals.deliveryCharge);
    formData.append("pricing[total]", currentTotals.total);

    // -----------------------
    // Payment
    // -----------------------
    formData.append("paymentMethod", paymentMethod);
    formData.append("promoCode", promoCodeInput);

    // -----------------------
    // DEBUG LOG (VERY IMPORTANT)
    // -----------------------
    console.log("=== CHECKOUT FORM DATA ===");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    console.log("========== PLACE ORDER CLICKED ==========");

console.log("Uploaded Images:", uploadedImages);

console.log("Delivery Address:", deliveryAddress);

console.log("Pricing:", currentTotals);

console.log("Payment Method:", paymentMethod);

console.log("Promo Code:", promoCodeInput);


    // -----------------------
    // API CALL
    // -----------------------
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      body: formData, // ❗ NO headers
    });

    if (!res.ok) throw new Error("Order failed");

    const data = await res.json();
    console.log("Order saved:", data);

    alert("Order placed successfully!");
    navigate("/");

  } catch (error) {
    console.error("Checkout error:", error);
    alert("Failed to place order");
  } finally {
    setIsSubmitting(false);
  }
};


  // Add this inside your Checkout component (before return)
const getPricePerImage = (size, paper) => {
  let price = 5;
  if (size === "10x15") price = 5;
  else if (size === "13x18") price = 8;
  else if (size === "15x21") price = 10;
  else if (size === "20x25") price = 15;
  else if (size === "20x30") price = 18;

  if (paper === "Glossy") price += 2;
  return price;
};


  // Handle card payment success
  const handlePaymentSuccess = async (paymentData) => {
  const formData = new FormData();

  uploadedImages.forEach((img, index) => {
    formData.append("images", img.croppedFile || img.file);
    formData.append(`items[${index}][size]`, img.size);
    formData.append(`items[${index}][paper]`, img.paper);
    formData.append(`items[${index}][quantity]`, img.quantity);
  });

  Object.entries(deliveryAddress).forEach(([key, value]) => {
    formData.append(`deliveryAddress[${key}]`, value);
  });

  formData.append("paymentMethod", "card_payment");
  formData.append("paymentId", paymentData.paymentId);
  formData.append("promoCode", promoCodeInput);

  const res = await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    body: formData,
  });

  alert("Payment successful!");
  navigate("/");
};


  const handlePaymentError = (error) => {
    alert(
      "Payment failed. Please try again or choose a different payment method."
    );
    setShowPaymentForm(false);
  };

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar />

      <div className="pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
    flex items-center gap-2
    bg-transparent
    hover:bg-transparent
    active:bg-transparent
    focus:bg-transparent
    focus-visible:bg-transparent
    focus:outline-none
    focus:ring-0
    border-0
    shadow-none
    appearance-none
    text-gray-400
    hover:text-[#E6C2A1]
    transition-colors
    mb-4
  "
            style={{
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Upload
          </button>

          <h1 className="text-4xl font-bold text-[#E6C2A1] mb-2">Checkout</h1>
          <p className="text-gray-400">
            Review your order and complete your purchase
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl shadow-lg p-6 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#E6C2A1] to-[#d4ac88] rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#E6C2A1]">
                    Order Summary
                  </h2>
                  <p className="text-sm text-gray-400">
                    {uploadedImages.length} item
                    {uploadedImages.length !== 1 ? "s" : ""} in your order
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {imagesWithPreview.map((image, index) => (
  <motion.div
    key={image.id}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    className="flex gap-4 p-4 bg-white/5 rounded-lg border border-white/10"
  >
    <div className="relative w-24 h-24 flex-shrink-0">
      <img
        src={image.preview} // <- use generated preview URL
        alt={`Order item ${index + 1}`}
        className="w-full h-full object-cover rounded-lg"
      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#E6C2A1] rounded-full flex items-center justify-center text-black text-xs font-bold">
                        {image.quantity}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold mb-1">
                        Photo Print
                      </h3>
                      <div className="space-y-1 text-sm text-gray-400">
                        <p>
                          Size:{" "}
                          <span className="text-white">{image.size} cm</span>
                        </p>
                        <p>
                          Paper:{" "}
                          <span className="text-white">{image.paper}</span>
                        </p>
                        <p>
                          Quantity:{" "}
                          <span className="text-white">{image.quantity}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-1">Subtotal</p>
                      <p className="text-lg font-bold text-[#E6C2A1]">
                        AED{" "}
                        {(
                          getPricePerImage(image.size, image.paper) *
                          image.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Delivery Address Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl shadow-lg p-6 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#E6C2A1] to-[#d4ac88] rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#E6C2A1]">
                    Delivery Address
                  </h2>
                  <p className="text-sm text-gray-400">
                    Enter your delivery details
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-[#E6C2A1] mb-2 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      formErrors.fullName ? "border-red-500" : "border-white/10"
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all`}
                  />
                  {formErrors.fullName && (
                    <p className="error-message text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="text-sm font-semibold text-[#E6C2A1] mb-2 block">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={deliveryAddress.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    placeholder="+971 XX XXX XXXX"
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      formErrors.phoneNumber
                        ? "border-red-500"
                        : "border-white/10"
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all`}
                  />
                  {formErrors.phoneNumber && (
                    <p className="error-message text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.phoneNumber}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-semibold text-[#E6C2A1] mb-2 block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={deliveryAddress.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      formErrors.email ? "border-red-500" : "border-white/10"
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all`}
                  />
                  {formErrors.email && (
                    <p className="error-message text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Address Line 1 */}
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-[#E6C2A1] mb-2 block">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.addressLine1}
                    onChange={(e) =>
                      handleInputChange("addressLine1", e.target.value)
                    }
                    placeholder="Street address, P.O. box"
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      formErrors.addressLine1
                        ? "border-red-500"
                        : "border-white/10"
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all`}
                  />
                  {formErrors.addressLine1 && (
                    <p className="error-message text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.addressLine1}
                    </p>
                  )}
                </div>

                {/* Address Line 2 */}
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-[#E6C2A1] mb-2 block">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.addressLine2}
                    onChange={(e) =>
                      handleInputChange("addressLine2", e.target.value)
                    }
                    placeholder="Apartment, suite, unit, building, floor, etc."
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="text-sm font-semibold text-[#E6C2A1] mb-2 block">
                    City *
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Dubai"
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      formErrors.city ? "border-red-500" : "border-white/10"
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all`}
                  />
                  {formErrors.city && (
                    <p className="error-message text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.city}
                    </p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="text-sm font-semibold text-[#E6C2A1] mb-2 block">
                    State/Province *
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="Dubai"
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      formErrors.state ? "border-red-500" : "border-white/10"
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all`}
                  />
                  {formErrors.state && (
                    <p className="error-message text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.state}
                    </p>
                  )}
                </div>

                {/* ZIP Code */}
                <div>
                  <label className="text-sm font-semibold text-[#E6C2A1] mb-2 block">
                    ZIP/Postal Code *
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.zipCode}
                    onChange={(e) =>
                      handleInputChange("zipCode", e.target.value)
                    }
                    placeholder="00000"
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      formErrors.zipCode ? "border-red-500" : "border-white/10"
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all`}
                  />
                  {formErrors.zipCode && (
                    <p className="error-message text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.zipCode}
                    </p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label className="text-sm font-semibold text-[#E6C2A1] mb-2 block">
                    Country *
                  </label>
                  <select
                    value={deliveryAddress.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      formErrors.country ? "border-red-500" : "border-white/10"
                    } text-white focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all`}
                  >
                    <option
                      value="United Arab Emirates"
                      className="bg-[#141414]"
                    >
                      United Arab Emirates
                    </option>
                    <option value="Saudi Arabia" className="bg-[#141414]">
                      Saudi Arabia
                    </option>
                    <option value="Qatar" className="bg-[#141414]">
                      Qatar
                    </option>
                    <option value="Kuwait" className="bg-[#141414]">
                      Kuwait
                    </option>
                    <option value="Bahrain" className="bg-[#141414]">
                      Bahrain
                    </option>
                    <option value="Oman" className="bg-[#141414]">
                      Oman
                    </option>
                  </select>
                  {formErrors.country && (
                    <p className="error-message text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.country}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Promo Code Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl shadow-lg p-6 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#E6C2A1] to-[#d4ac88] rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#E6C2A1]">
                    Promo Code
                  </h2>
                  <p className="text-sm text-gray-400">
                    Have a discount code? Apply it here
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => {
                      setPromoCodeInput(e.target.value.toUpperCase());
                      setPromoError("");
                    }}
                    placeholder="Enter promo code"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all uppercase"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleApplyPromo}
                    disabled={isApplyingPromo}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      isApplyingPromo
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#E6C2A1] to-[#d4ac88] hover:from-[#d4ac88] hover:to-[#E6C2A1] text-black shadow-lg"
                    }`}
                  >
                    {isApplyingPromo ? (
                      <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      "Apply"
                    )}
                  </motion.button>
                </div>

                {promoError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm flex items-center gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {promoError}
                  </motion.p>
                )}

                {promoApplied && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 text-sm font-semibold">
                      Promo code applied successfully!
                    </span>
                  </motion.div>
                )}

                <div className="bg-gradient-to-r from-[#E6C2A1]/10 to-transparent border-l-4 border-[#E6C2A1] rounded-lg p-4">
                  <p className="text-sm text-gray-300 mb-2">
                    <span className="font-semibold text-[#E6C2A1]">
                      Try these codes:
                    </span>
                  </p>
                  <div className="space-y-1 text-xs text-gray-400">
                    <p>• SAVE10 - Get 10% off</p>
                    <p>• SAVE15 - Get 15% off</p>
                    <p>• FIRSTORDER - Get 25% off your first order</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Method Section */}
            <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
  className="bg-[#1f1d1b] backdrop-blur-xl rounded-xl shadow-lg p-6 border border-[#3a322b]"
>
  <div className="flex items-center gap-3 mb-6">
    <div className="w-10 h-10 bg-gradient-to-br from-[#E6C2A1] to-[#d4ac88] rounded-lg flex items-center justify-center">
      <CreditCard className="w-5 h-5 text-black" />
    </div>
    <div>
      <h2 className="text-xl font-bold text-[#E6C2A1]">Payment Method</h2>
      <p className="text-sm text-gray-400">Choose your payment option</p>
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Cash on Delivery */}
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setPaymentMethod("cash_on_delivery")}
      className={`
        relative p-6 rounded-xl border-2 transition-all text-left
        outline-none focus:outline-none focus:ring-0
        ${
          paymentMethod === "cash_on_delivery"
            ? "bg-gradient-to-br from-[#E6C2A1]/20 to-transparent border-[#E6C2A1] shadow-lg shadow-[#E6C2A1]/20"
            : "bg-[#1f1d1b] border-[#3a322b] hover:border-[#5a4d3f]"
        }
      `}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            paymentMethod === "cash_on_delivery"
              ? "bg-gradient-to-br from-[#E6C2A1] to-[#d4ac88]"
              : "bg-[#3a322b]"
          }`}
        >
          <Banknote
            className={`w-6 h-6 ${
              paymentMethod === "cash_on_delivery" ? "text-black" : "text-[#E6C2A1]"
            }`}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-1">Cash on Delivery</h3>
          <p className="text-gray-400 text-sm">Pay when you receive your order</p>
        </div>
        {paymentMethod === "cash_on_delivery" && (
          <CheckCircle className="w-6 h-6 text-[#E6C2A1]" />
        )}
      </div>
    </motion.button>

    {/* Card Payment */}
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setPaymentMethod("card_payment")}
      className={`
        relative p-6 rounded-xl border-2 transition-all text-left
        outline-none focus:outline-none focus:ring-0
        ${
          paymentMethod === "card_payment"
            ? "bg-gradient-to-br from-[#E6C2A1]/20 to-transparent border-[#E6C2A1] shadow-lg shadow-[#E6C2A1]/20"
            : "bg-[#1f1d1b] border-[#3a322b] hover:border-[#5a4d3f]"
        }
      `}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            paymentMethod === "card_payment"
              ? "bg-gradient-to-br from-[#E6C2A1] to-[#d4ac88]"
              : "bg-[#3a322b]"
          }`}
        >
          <CreditCard
            className={`w-6 h-6 ${
              paymentMethod === "card_payment" ? "text-black" : "text-[#E6C2A1]"
            }`}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-1">Card Payment</h3>
          <p className="text-gray-400 text-sm">Pay securely with your card</p>
        </div>
        {paymentMethod === "card_payment" && (
          <CheckCircle className="w-6 h-6 text-[#E6C2A1]" />
        )}
      </div>
    </motion.button>
  </div>
</motion.div>


            {/* Stripe Payment Form (shown when card payment is selected) */}
            <AnimatePresence>
              {showPaymentForm && paymentMethod === "card_payment" && (
                <motion.div
                  id="payment-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.4 }}
                >
                  <StripePayment
                    amount={currentTotals.total}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Sidebar - Order Total */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl shadow-lg p-6 border border-white/10 sticky top-24"
            >
              <h3 className="text-xl font-bold text-[#E6C2A1] mb-6">
                Order Total
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    AED {currentTotals.subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-300">
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Delivery Charges
                  </span>
                  <span className="font-semibold">
                    AED {currentTotals.deliveryCharge.toFixed(2)}
                  </span>
                </div>

                {currentTotals.discount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-between text-emerald-400"
                  >
                    <span className="flex items-center gap-1">
                      Discount
                      {promoCodeInput && (
                        <span className="text-xs bg-emerald-500/20 px-2 py-0.5 rounded">
                          {promoCodeInput}
                        </span>
                      )}
                    </span>
                    <span className="font-semibold">
                      - AED {currentTotals.discount.toFixed(2)}
                    </span>
                  </motion.div>
                )}

                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-semibold text-white">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-[#E6C2A1]">
                      AED {currentTotals.total.toFixed(2)}
                    </span>
                  </div>
                  {currentTotals.discount > 0 && (
                    <p className="text-xs text-emerald-400 text-right mt-1">
                      You saved AED {currentTotals.discount.toFixed(2)}!
                    </p>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePlaceOrder}
                disabled={isSubmitting || showPaymentForm}
                className={`
                  w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3
                  ${
                    isSubmitting || showPaymentForm
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#E6C2A1] to-[#d4ac88] hover:from-[#d4ac88] hover:to-[#E6C2A1] text-black shadow-xl shadow-[#E6C2A1]/30"
                  }
                `}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : showPaymentForm ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Complete Payment Below
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    {paymentMethod === "card_payment"
                      ? "Proceed to Payment"
                      : "Place Order"}
                  </>
                )}
              </motion.button>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Free shipping on orders over AED 50</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Delivery within 3-5 business days</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
