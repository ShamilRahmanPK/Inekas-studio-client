import React, { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Lock, AlertCircle } from "lucide-react";

export default function StripePayment({ amount, onSuccess, onError }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + "/" + v.slice(2, 4);
    }
    return v;
  };

  // Validate card details
  const validateCard = () => {
    const newErrors = {};

    // Card number validation (simple check)
    const cardNumberClean = cardNumber.replace(/\s/g, "");
    if (!cardNumberClean) {
      newErrors.cardNumber = "Card number is required";
    } else if (cardNumberClean.length < 13 || cardNumberClean.length > 19) {
      newErrors.cardNumber = "Invalid card number";
    }

    // Expiry date validation
    if (!expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else {
      const [month, year] = expiryDate.split("/");
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (
        !month ||
        !year ||
        parseInt(month) < 1 ||
        parseInt(month) > 12 ||
        parseInt(year) < currentYear ||
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        newErrors.expiryDate = "Invalid expiry date";
      }
    }

    // CVV validation
    if (!cvv) {
      newErrors.cvv = "CVV is required";
    } else if (cvv.length < 3 || cvv.length > 4) {
      newErrors.cvv = "Invalid CVV";
    }

    // Cardholder name validation
    if (!cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle payment submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCard()) {
      return;
    }

    setIsProcessing(true);

    try {
      // In production, you would:
      // 1. Create a payment intent on your backend
      // 2. Use Stripe.js to tokenize the card
      // 3. Confirm the payment with the token
      // 4. Handle the response

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful payment
      onSuccess({
        paymentId: "pi_" + Date.now(),
        status: "succeeded",
      });
    } catch (error) {
      console.error("Payment error:", error);
      onError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Card Details</h3>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Lock className="w-4 h-4" />
          Secure Payment
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Card Number */}
        <div>
          <label className="text-sm font-semibold text-[#E6C2A1] mb-2 block">
            Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => {
                setCardNumber(formatCardNumber(e.target.value));
                if (errors.cardNumber) {
                  setErrors({ ...errors, cardNumber: "" });
                }
              }}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              className={`w-full px-4 py-3 pl-12 rounded-lg bg-white/5 border ${
                errors.cardNumber ? "border-red-500" : "border-white/10"
              } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all`}
            />
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          {errors.cardNumber && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.cardNumber}
            </p>
          )}
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="text-sm font-semibold text-[#E6C2A1] mb-2 block">
            Cardholder Name
          </label>
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => {
              setCardholderName(e.target.value);
              if (errors.cardholderName) {
                setErrors({ ...errors, cardholderName: "" });
              }
            }}
            placeholder="Name on card"
            className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
              errors.cardholderName ? "border-red-500" : "border-white/10"
            } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all`}
          />
          {errors.cardholderName && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.cardholderName}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Expiry Date */}
          <div>
            <label className="text-sm font-semibold text-[#E6C2A1] mb-2 block">
              Expiry Date
            </label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => {
                setExpiryDate(formatExpiryDate(e.target.value));
                if (errors.expiryDate) {
                  setErrors({ ...errors, expiryDate: "" });
                }
              }}
              placeholder="MM/YY"
              maxLength="5"
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                errors.expiryDate ? "border-red-500" : "border-white/10"
              } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all`}
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.expiryDate}
              </p>
            )}
          </div>

          {/* CVV */}
          <div>
            <label className="text-sm font-semibold text-[#E6C2A1] mb-2 block">
              CVV
            </label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setCvv(value);
                if (errors.cvv) {
                  setErrors({ ...errors, cvv: "" });
                }
              }}
              placeholder="123"
              maxLength="4"
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                errors.cvv ? "border-red-500" : "border-white/10"
              } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all`}
            />
            {errors.cvv && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.cvv}
              </p>
            )}
          </div>
        </div>

        {/* Payment Amount Display */}
        <div className="bg-gradient-to-r from-[#E6C2A1]/10 to-transparent border-l-4 border-[#E6C2A1] rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Amount to be charged:</span>
            <span className="text-xl font-bold text-[#E6C2A1]">
              AED {amount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isProcessing}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
            isProcessing
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-[#E6C2A1] to-[#d4ac88] hover:from-[#d4ac88] hover:to-[#E6C2A1] text-black shadow-xl shadow-[#E6C2A1]/30"
          }`}
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              Processing Payment...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              Pay AED {amount.toFixed(2)}
            </>
          )}
        </motion.button>

        <p className="text-xs text-gray-400 text-center">
          Your payment information is encrypted and secure
        </p>
      </form>
    </motion.div>
  );
}