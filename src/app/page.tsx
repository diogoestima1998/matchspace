import { FeaturedTeachers } from "@/components/LandingSections/FeaturedTeachers";
import { FeatureShowcase } from "@/components/LandingSections/FeatureShowcase";
import { Hero } from "@/components/LandingSections/Hero";
import { HowItWorks } from "@/components/LandingSections/HowItWorks";
import { InstrumentShowcase } from "@/components/LandingSections/InstrumentShowcase";
import { TeacherCta } from "@/components/LandingSections/TeacherCta";
import { Testimonials } from "@/components/LandingSections/Testimonials";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <FeaturedTeachers />
        <InstrumentShowcase />
        <HowItWorks />
        <FeatureShowcase />
        <Testimonials />
        <TeacherCta />
      </main>
      <SiteFooter />
    </>
  );
}
