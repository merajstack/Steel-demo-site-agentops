"use client";

import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("Submitting...");

    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const webhookUrl = process.env.NEXT_PUBLIC_FORM_SITE_WEBHOOK_URL || "https://workflow.ccbp.in/webhook-test/form-site";

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("Thanks. Your request is ready for the sales team to review.");
      event.target.reset();
    } catch (error) {
      setStatus("❌ Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-copy">
        <p className="eyebrow">Start a procurement conversation</p>
        <h2>Send pipe size, grade, quantity, and delivery location.</h2>
        <p>
          Our team will review your requirements and respond with pricing, lead
          time, and available finishing options.
        </p>
      </div>
      <form className="contact-form" id="quote-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input type="text" name="name" placeholder="Your name" />
        </label>
        <label>
          Email
          <input type="email" name="email" placeholder="you@example.com" />
        </label>
        <label>
          Requirement
          <textarea
            name="message"
            rows={4}
            placeholder="Pipe type, size, quantity, grade, delivery city"
          ></textarea>
        </label>
        <button className="button primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
        <p className="form-status" id="form-status" role="status" aria-live="polite">
          {status}
        </p>
      </form>
    </section>
  );
}
