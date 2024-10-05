import Link from 'next/link';
import { Button } from "@/components/ui/button";
import HeroSection from '@/components/hero-section';
import InteractiveQuizzes from '@/components/interactive-quizzes';
import InteractiveSimulations from '@/components/interactive-simulations';
import AchievementBadges from '@/components/achievement-badges';
import CommunityContributions from '@/components/community-contributions';
import PricingPlans from '@/components/pricing-plans';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <InteractiveQuizzes />
      <InteractiveSimulations />
      <AchievementBadges />
      <CommunityContributions />
      <PricingPlans />
      <div className="mt-12 text-center">
        <Button asChild size="lg">
          <Link href="/donate">Donate to Support Us</Link>
        </Button>
      </div>
    </div>
  );
}