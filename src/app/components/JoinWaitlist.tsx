"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GradientText from "@/components/gradient-text";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function JoinWaitlist() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [joinedCount, setJoinedCount] = useState(0);
  const [spotsRemaining, setSpotsRemaining] = useState(0);
  const [hasSubmittedBefore, setHasSubmittedBefore] = useState(false);

  // Check localStorage and fetch waitlist count on component mount
  useEffect(() => {
    // Check if user has already submitted
    const submittedEmail = localStorage.getItem("waitlist_submitted");
    if (submittedEmail) {
      setHasSubmittedBefore(true);
      setEmail(submittedEmail);
    }

    const fetchWaitlistCount = async () => {
      try {
        const { count, error: countError } = await supabase
          .from("waitlist")
          .select("*", { count: "exact", head: true });

        if (countError) {
          console.error("Error fetching count:", countError);
        } else {
          const joined = count || 0;
          setJoinedCount(joined);
          setSpotsRemaining(Math.max(0, 2000 - joined));
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchWaitlistCount();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!email) return;

    // Check if user has already submitted
    if (hasSubmittedBefore) {
      setError("You've already joined the waitlist with this browser!");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const { data, error: supabaseError } = await supabase
        .from("waitlist")
        .insert([
          {
            email: email.toLowerCase().trim(),
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (supabaseError) {
        // Check if it's a duplicate email error
        if (supabaseError.code === "23505") {
          setError("This email is already on the waitlist!");
        } else {
          setError("Something went wrong. Please try again.");
        }
        console.error("Supabase error:", supabaseError);
      } else {
        // Store in localStorage
        localStorage.setItem("waitlist_submitted", email.toLowerCase().trim());
        setHasSubmittedBefore(true);

        setIsSubmitted(true);
        // Update counts
        setJoinedCount((prev) => prev + 1);
        setSpotsRemaining((prev) => Math.max(0, prev - 1));
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      }
    } catch (err) {
      setError("Failed to join waitlist. Please try again.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative w-full pb-24 md:p-32 overflow-hidden bg-[var(--background)] text-[var(--text)]">
      {/* Subtle gradient halo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70rem] h-[70rem] rounded-full blur-3xl opacity-30 bg-[var(--gradient-accent-soft)]" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <GradientText
              colors={[
                "var(--primary)",
                "var(--accent)",
                "var(--primary)",
                "var(--accent)",
              ]}
              animationSpeed={6}
              showBorder={false}
              className="font-extrabold text-4xl md:text-5xl tracking-tight ml-0 pl-0"
            >
              Join the Waitlist
            </GradientText>

            <p className="text-lg text-[color:var(--text)]/70 max-w-md">
              Be among the first to experience <strong>Jagantara</strong>. Sign
              up to get early access, insider updates, and exclusive rewards.
            </p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex gap-8 pt-4"
            >
              <div>
                <div className="text-3xl font-bold text-[var(--text)]">
                  {joinedCount.toLocaleString()}
                </div>
                <div className="text-sm text-[color:var(--text)]/60">
                  Already joined
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[var(--text)]">
                  {spotsRemaining.toLocaleString()}
                </div>
                <div className="text-sm text-[color:var(--text)]/60">
                  Spots remaining
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Section - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center items-end w-full"
          >
            {!isSubmitted ? (
              <>
                <div className="w-full max-w-lg space-y-3">
                  <div className="flex gap-3 items-center">
                    <div className="relative flex-1">
                      <Input
                        type="email"
                        placeholder="johndoe@jagantara.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        required
                        disabled={isLoading || hasSubmittedBefore}
                        className="flex-1 border border-[color:var(--text)]/20 bg-[var(--background)]/60 focus-visible:ring-[color:var(--text)] placeholder:text-[color:var(--text)]/50 h-11 rounded-2xl text-sm md:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          boxShadow: isFocused
                            ? "0 0 0 3px rgba(var(--primary-rgb), 0.2)"
                            : "none",
                        }}
                      />
                    </div>
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={isLoading || hasSubmittedBefore}
                      className="text-white font-medium px-6 h-11 rounded-2xl shadow-lg glow-blue transition hover:scale-[1.03] cursor-pointer flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      style={{
                        backgroundImage: "var(--gradient-primary)",
                      }}
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span className="hidden md:inline">Joining...</span>
                        </>
                      ) : (
                        <>
                          <ArrowLeft className="w-4 h-4" />
                          {/* Responsive text */}
                          <span className="md:hidden">Join</span>
                          <span className="hidden md:inline">
                            Join waitlist
                          </span>
                        </>
                      )}
                    </Button>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  {hasSubmittedBefore && !error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>You're already on the waitlist!</span>
                    </motion.div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 pt-6 w-full max-w-lg">
                  {[
                    "Priority access to beta",
                    "Exclusive launch rewards",
                    "Direct updates from team",
                  ].map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 text-sm text-[color:var(--text)]/70"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[color:var(--primary)]" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <p className="text-sm text-[color:var(--text)]/60 mt-3 w-full max-w-lg">
                  No spam. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 space-y-4 w-full max-w-lg"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    backgroundImage: "var(--gradient-primary)",
                  }}
                >
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-[var(--text)]">
                  You're on the list!
                </h3>
                <p className="text-[color:var(--text)]/70 text-center">
                  Early updates regarding Jagantara will be sent on email.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
