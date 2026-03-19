import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WorldLens — Explore Any Country, In Any Language",
  description:
    "A beautifully designed global discovery experience. Search any country in any language and instantly see its flag, capital, borders, and location on an interactive map.",
  keywords: [
    "country explorer",
    "world map",
    "flags",
    "capitals",
    "geography",
    "multilingual",
  ],
  openGraph: {
    title: "WorldLens — Explore Any Country, In Any Language",
    description:
      "From flag to capital to borders and map location, instantly. A premium global discovery experience.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#030712",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-screen bg-[#030712] text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

