"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const WEBHOOK_URL = "https://workflow.ccbp.in/webhook/business-inquiry";
const MANAGER_EMAIL = "meraj.md5862@gmail.com";
const BOT_AVATAR_URL = "/assets/chatbot-avatar.svg";

const emptyFields = {
  name: "",
  email: "",
  query: "",
};

export default function BusinessChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [fields, setFields] = useState(emptyFields);
  const [currentStep, setCurrentStep] = useState("name");
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canRetry, setCanRetry] = useState(false);
  const timersRef = useRef([]);
  const messageIdRef = useRef(0);

  useEffect(() => {
    return () => clearTimers();
  }, []);

  function clearTimers() {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
  }

  function nextMessageId() {
    messageIdRef.current += 1;
    return messageIdRef.current;
  }

  function addUserMessage(text) {
    setMessages((current) => [
      ...current,
      { id: nextMessageId(), role: "user", text },
    ]);
  }

  function addBotMessage(text) {
    setMessages((current) => [
      ...current,
      { id: nextMessageId(), role: "bot", text },
    ]);
  }

  function queueBotMessage(text) {
    setIsTyping(true);
    const timer = setTimeout(() => {
      addBotMessage(text);
      setIsTyping(false);
    }, 600);
    timersRef.current.push(timer);
  }

  function resetConversation() {
    clearTimers();
    setMessages([]);
    setFields(emptyFields);
    setCurrentStep("name");
    setInputValue("");
    setIsTyping(false);
    setIsSubmitting(false);
    setCanRetry(false);
    queueBotMessage("Hi! 👋 Welcome. What's your name?");
  }

  function openChat() {
    setIsOpen(true);
    resetConversation();
  }

  function closeChat() {
    clearTimers();
    setIsOpen(false);
    setMessages([]);
    setFields(emptyFields);
    setCurrentStep("name");
    setInputValue("");
    setIsTyping(false);
    setIsSubmitting(false);
    setCanRetry(false);
  }

  function questionForStep(step, nextFields = fields) {
    if (step === "name") {
      return "Hi! 👋 Welcome. What's your name?";
    }

    if (step === "email") {
      return `Nice to meet you, ${nextFields.name}! What's your email address?`;
    }

    return "Great! Please describe your enquiry, invoice request, or proposal details.";
  }

  function validateStep(step, value) {
    const trimmed = value.trim();

    if (step === "name") {
      return trimmed.length >= 2;
    }

    if (step === "email") {
      const atIndex = trimmed.indexOf("@");
      const dotIndex = trimmed.indexOf(".", atIndex + 1);
      return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < trimmed.length - 1;
    }

    return trimmed.length >= 10;
  }

  async function submitFields(nextFields = fields) {
    setIsSubmitting(true);
    setCanRetry(false);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nextFields.name,
          email: nextFields.email,
          query: nextFields.query,
          managerEmail: MANAGER_EMAIL,
        }),
      });

      if (response.status !== 200) {
        throw new Error("Submission failed");
      }

      queueBotMessage(
        `✅ Your request has been submitted successfully! We'll get back to you at ${nextFields.email} shortly.`
      );
    } catch (error) {
      queueBotMessage("❌ Something went wrong. Please try again.");
      setCanRetry(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const value = inputValue.trim();
    if (!value || isTyping || isSubmitting || canRetry) {
      return;
    }

    addUserMessage(value);
    setInputValue("");

    if (!validateStep(currentStep, value)) {
      queueBotMessage(
        `That doesn't look right — please try again. ${questionForStep(currentStep)}`
      );
      return;
    }

    const nextFields = {
      ...fields,
      [currentStep]: value,
    };
    setFields(nextFields);

    if (currentStep === "name") {
      setCurrentStep("email");
      queueBotMessage(questionForStep("email", nextFields));
      return;
    }

    if (currentStep === "email") {
      setCurrentStep("query");
      queueBotMessage(questionForStep("query", nextFields));
      return;
    }

    setCurrentStep("done");
    queueBotMessage(`Thanks ${nextFields.name}! Submitting your request now... ⏳`);
    const timer = setTimeout(() => submitFields(nextFields), 700);
    timersRef.current.push(timer);
  }

  return (
    <div className="business-chatbot" aria-live="polite">
      {isOpen ? (
        <section className="chatbot-window" aria-label="Business enquiry chat">
          <header className="chatbot-header">
            <span>Business Enquiry 💼</span>
            <button
              type="button"
              className="chatbot-close"
              onClick={closeChat}
              aria-label="Close chat"
            >
              ×
            </button>
          </header>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                className={`chatbot-message-row ${message.role === "user" ? "is-user" : "is-bot"}`}
                key={message.id}
              >
                {message.role === "bot" && (
                  <Image
                    className="chatbot-avatar"
                    src={BOT_AVATAR_URL}
                    alt=""
                    width="32"
                    height="32"
                  />
                )}
                <div className="chatbot-message">{message.text}</div>
              </div>
            ))}

            {isTyping && (
              <div className="chatbot-message-row is-bot">
                <Image
                  className="chatbot-avatar"
                  src={BOT_AVATAR_URL}
                  alt=""
                  width="32"
                  height="32"
                />
                <div className="chatbot-message chatbot-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            {canRetry && !isTyping && (
              <div className="chatbot-retry-wrap">
                <button
                  type="button"
                  className="chatbot-retry"
                  onClick={() => submitFields(fields)}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Retrying..." : "Retry"}
                </button>
              </div>
            )}
          </div>

          <form className="chatbot-inputbar" onSubmit={handleSubmit}>
            <input
              type={currentStep === "email" ? "email" : "text"}
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder={canRetry ? "Use Retry to resend" : "Type your answer..."}
              disabled={isTyping || isSubmitting || canRetry || currentStep === "done"}
              aria-label="Chat message"
            />
            <button
              type="submit"
              disabled={isTyping || isSubmitting || canRetry || currentStep === "done"}
            >
              Send
            </button>
          </form>
        </section>
      ) : (
        <button
          type="button"
          className="chatbot-bubble"
          onClick={openChat}
          aria-label="Open business enquiry chat"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 5.75C5 4.78 5.78 4 6.75 4h10.5C18.22 4 19 4.78 19 5.75v7.5c0 .97-.78 1.75-1.75 1.75H10l-4.1 3.08A.56.56 0 0 1 5 17.64V5.75Z"
              fill="currentColor"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
