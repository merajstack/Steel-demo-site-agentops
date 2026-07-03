"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("Submitting your form...");

    const formData = new FormData(event.target);
    const data = {
      COMPANY_NAME: formData.get("companyName"),
      PRICE: formData.get("price"),
      QUANTITY: formData.get("quantity"),
      TERMS: formData.get("terms"),
      CONSUMER_MAIL: formData.get("consumerMail"),
    };

    const webhookUrl = process.env.NEXT_PUBLIC_FORM_SITE_WEBHOOK_URL || "https://workflow.ccbp.in/webhook/form-site";

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setStatus("✅ Form successfully submitted! Our team will get back to you shortly.");
      event.target.reset();
    } catch (error) {
      setStatus("❌ Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <main style={{ paddingTop: "110px", minHeight: "85vh", background: "var(--paper)", display: "flex", flexDirection: "column" }}>
        <section className="section" style={{ flex: 1, display: "grid", alignContent: "center", padding: "40px 18px" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto", width: "100%" }}>
            <div className="section-heading" style={{ textAlign: "center", marginBottom: "36px" }}>
              <p className="eyebrow">Order Details Form</p>
              <h2 style={{ margin: "12px 0 16px", fontSize: "2.5rem" }}>Procurement Submission</h2>
              <p style={{ color: "var(--muted)", fontSize: "1.05rem", maxWidth: "540px", margin: "0 auto" }}>
                Provide the details of your inquiry below to instantly submit them to our manager.
              </p>
            </div>

            <form 
              className="contact-form" 
              onSubmit={handleSubmit}
              style={{
                background: "var(--white)",
                border: "1px solid var(--line)",
                borderRadius: "8px",
                padding: "36px",
                boxShadow: "var(--shadow)",
                display: "grid",
                gap: "20px"
              }}
            >
              <label>
                Company Name
                <input 
                  type="text" 
                  name="companyName" 
                  placeholder="e.g. Acme Corp" 
                  required 
                />
              </label>

              <label>
                Price per Unit (USD)
                <input 
                  type="number" 
                  name="price" 
                  step="0.01"
                  placeholder="e.g. 150.00" 
                  required 
                />
              </label>

              <label>
                Quantity (Number of Units)
                <input 
                  type="number" 
                  name="quantity" 
                  placeholder="e.g. 500" 
                  required 
                />
              </label>

              <label>
                Payment Terms / Conditions
                <textarea 
                  name="terms" 
                  rows={3} 
                  placeholder="e.g. Net 30, 50% advance / 50% on delivery" 
                  required 
                />
              </label>

              <label>
                Consumer Email Address
                <input 
                  type="email" 
                  name="consumerMail" 
                  placeholder="e.g. purchaser@company.com" 
                  required 
                />
              </label>

              <button 
                className="button primary" 
                type="submit" 
                disabled={isSubmitting}
                style={{ width: "100%", marginTop: "10px" }}
              >
                {isSubmitting ? "Submitting..." : "Submit Procurement Form"}
              </button>

              {status && (
                <p 
                  className="form-status" 
                  style={{ 
                    textAlign: "center", 
                    margin: "10px 0 0", 
                    color: status.startsWith("✅") ? "var(--teal)" : "var(--rust)" 
                  }}
                  role="status" 
                  aria-live="polite"
                >
                  {status}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
