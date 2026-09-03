import { Metadata } from "next";
import DownloadReportClient from "./download-report-client";

export const metadata: Metadata = {
  title: "Download Test Reports | Dr. Lal PathLabs Lucknow",
  description:
    "Download your blood test reports online or request them via WhatsApp from Dr. Lal PathLabs Patient Service Centre, Gomti Nagar, Lucknow. Call +91 9451155402 for help.",
  alternates: { canonical: "/download-report" },
  openGraph: {
    title: "Download Test Reports | Dr. Lal PathLabs Lucknow",
    description: "Download your test reports or request via WhatsApp. Dr. Lal PathLabs, Gomti Nagar, Lucknow.",
    url: "https://lallabslucknow.com/download-report",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Test Reports | Dr. Lal PathLabs Lucknow",
    description: "Download your test reports or request via WhatsApp.",
  },
  robots: { index: true, follow: true },
};

export default function DownloadReportPage() {
  return <DownloadReportClient />;
}
