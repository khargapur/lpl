import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Home, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh] flex items-center justify-center py-16 bg-light-bg">
        <div className="container-custom text-center">
          <div className="text-8xl font-bold text-brand-blue mb-4">404</div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-heading">Page Not Found</h1>
          <p className="text-gray-500 mb-8 text-sm">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="bg-brand-blue hover:bg-brand-blue-dark text-white rounded font-semibold">
              <Link href="/"><Home className="w-4 h-4 mr-2" />Go Home</Link>
            </Button>
            <Button asChild variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded font-semibold">
              <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}><Phone className="w-4 h-4 mr-2" />Call Us</a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
