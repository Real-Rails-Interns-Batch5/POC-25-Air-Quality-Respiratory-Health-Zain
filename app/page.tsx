import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DashboardPreview from "@/components/DashboardPreview";
import StatsCards from "@/components/StatsCards";
import Features from "@/components/Features";
import Architecture from "@/components/Architecture";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <Hero />
      <DashboardPreview />
      <StatsCards />
      <Features />
      <Architecture />
      <Footer />
    </main>
  );
}