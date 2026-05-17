"use client";

import React, { useReducer } from "react";
import { motion, useAnimate, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/motion-variants";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface FormValues { name: string; email: string; message: string }
interface FormErrors { name?: string; email?: string; message?: string }
type FormState =
  | { status: "idle" | "submitting"; values: FormValues; errors: FormErrors }
  | { status: "success" }
  | { status: "error"; message: string };
type Action =
  | { type: "FIELD"; field: keyof FormValues; value: string }
  | { type: "ERRORS"; errors: FormErrors }
  | { type: "SUBMIT" } | { type: "SUCCESS" } | { type: "ERROR"; message: string };
export interface ContactFormProps { onSuccess?: () => void }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BLANK: FormValues = { name: "", email: "", message: "" };
const INIT: FormState = { status: "idle", values: BLANK, errors: {} };

function validate(v: FormValues, t: (key: string) => string): FormErrors {
  const e: FormErrors = {};
  if (!v.name.trim()) e.name = t("form.error.name");
  if (!EMAIL_RE.test(v.email)) e.email = t("form.error.email");
  if (v.message.trim().length < 10) e.message = t("form.error.message");
  return e;
}

function reducer(s: FormState, a: Action): FormState {
  const vals = s.status !== "success" && s.status !== "error" ? s.values : BLANK;
  switch (a.type) {
    case "FIELD":  return s.status !== "success" && s.status !== "error" ? { ...s, values: { ...vals, [a.field]: a.value } } : s;
    case "ERRORS": return s.status !== "success" && s.status !== "error" ? { ...s, status: "idle", errors: a.errors } : s;
    case "SUBMIT": return { status: "submitting", values: vals, errors: {} };
    case "SUCCESS": return { status: "success" };
    case "ERROR":   return { status: "error", message: a.message };
    default: return s;
  }
}

const inputClass = "w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-2xl px-5 py-4 text-base text-[var(--color-text-primary)] font-sans placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-200";

export function ContactForm({ onSuccess }: ContactFormProps) {
  const { t } = useLanguage();
  const [state, dispatch] = useReducer(reducer, INIT);
  const [scope, animate] = useAnimate();
  const vals = state.status !== "success" && state.status !== "error" ? state.values : BLANK;
  const errs = state.status !== "success" && state.status !== "error" ? state.errors : {};

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate(vals, t);
    if (Object.keys(v).length) {
      dispatch({ type: "ERRORS", errors: v });
      await animate(scope.current, { x: [0, -8, 8, -8, 8, 0] }, { duration: 0.4 });
      return;
    }
    dispatch({ type: "SUBMIT" });
    try {
      await new Promise((r) => setTimeout(r, 900));
      dispatch({ type: "SUCCESS" });
      onSuccess?.();
    } catch {
      dispatch({ type: "ERROR", message: "Terjadi kesalahan. Coba lagi." });
    }
  }

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-md py-2xl"
        aria-live="polite"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="w-20 h-20 rounded-full bg-accent-500/10 flex items-center justify-center"
        >
          <svg viewBox="0 0 52 52" className="w-10 h-10" fill="none">
            <motion.path d="M14 27 l9 9 l16-18" stroke="#f97316" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }} />
          </svg>
        </motion.div>
        <p className="font-serif text-2xl text-[var(--color-text-primary)] text-center">{t("form.success.heading")}</p>
        <p className="font-sans text-[var(--color-text-secondary)] text-sm text-center">{t("form.success.body")}</p>
      </motion.div>
    );
  }

  return (
    <motion.form ref={scope} onSubmit={handleSubmit} noValidate className="flex flex-col gap-md w-full">
      {/* Name */}
      <div>
        <input
          id="name" name="name" type="text" placeholder={t("form.name.placeholder")}
          value={vals.name}
          onChange={(e) => dispatch({ type: "FIELD", field: "name", value: e.target.value })}
          aria-invalid={errs.name ? true : undefined}
          className={inputClass}
        />
        <AnimatePresence>
          {errs.name && (
            <motion.p variants={fadeUp} initial="hidden" animate="visible" exit="hidden"
              className="mt-1 text-xs text-red-500 px-1">{errs.name}</motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Email */}
      <div>
        <input
          id="email" name="email" type="email" placeholder={t("form.email.placeholder")}
          value={vals.email}
          onChange={(e) => dispatch({ type: "FIELD", field: "email", value: e.target.value })}
          aria-invalid={errs.email ? true : undefined}
          className={inputClass}
        />
        <AnimatePresence>
          {errs.email && (
            <motion.p variants={fadeUp} initial="hidden" animate="visible" exit="hidden"
              className="mt-1 text-xs text-red-500 px-1">{errs.email}</motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Message */}
      <div>
        <textarea
          id="message" name="message" placeholder={t("form.message.placeholder")} rows={5}
          value={vals.message}
          onChange={(e) => dispatch({ type: "FIELD", field: "message", value: e.target.value })}
          aria-invalid={errs.message ? true : undefined}
          className={`${inputClass} resize-none`}
        />
        <AnimatePresence>
          {errs.message && (
            <motion.p variants={fadeUp} initial="hidden" animate="visible" exit="hidden"
              className="mt-1 text-xs text-red-500 px-1">{errs.message}</motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Error */}
      <AnimatePresence>
        {state.status === "error" && (
          <motion.p role="alert" aria-live="assertive"
            variants={fadeUp} initial="hidden" animate="visible" exit="hidden"
            className="text-sm text-red-500 text-center">{state.message}</motion.p>
        )}
      </AnimatePresence>

      {/* Submit button */}
      <motion.button
        type="submit"
        disabled={state.status === "submitting"}
        className="relative overflow-hidden w-full h-14 rounded-full bg-accent-500 hover:bg-accent-600 text-white font-sans font-bold text-base transition-colors disabled:cursor-not-allowed"
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.01 }}
      >
        <AnimatePresence mode="wait">
          {state.status === "submitting" ? (
            <motion.span key="loading"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="absolute inset-0 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>{t("form.submitting")}</span>
            </motion.span>
          ) : (
            <motion.span key="idle"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="absolute inset-0 flex items-center justify-center gap-2"
            >
              <span>{t("form.submit")}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.form>
  );
}

export default ContactForm;
