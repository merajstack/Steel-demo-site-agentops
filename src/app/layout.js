import { Inter } from "next/font/google";
import Script from "next/script";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Apex Steel Pipes | Precision Steel Pipe Manufacturing",
  description:
    "Apex Steel Pipes manufactures precision steel pipes, tubes, and custom sections for construction, energy, infrastructure, and industrial projects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Script
          src="https://agentops-auto.vercel.app/widget.js"
          data-type="business-inquiry"
          data-manager-email="navaneesh09@gmail.com"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
