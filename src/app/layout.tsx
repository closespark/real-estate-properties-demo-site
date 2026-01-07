import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VRM Properties - Vacation Rental Management",
  description: "Demo site showcasing HubSpot Listings, campaigns, and automation using a HubSpot sandbox environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* HubSpot Tracking Code - Sandbox */}
        <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="//js.hs-scripts.com/YOUR_HUBSPOT_ID.js"
        ></script>
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
