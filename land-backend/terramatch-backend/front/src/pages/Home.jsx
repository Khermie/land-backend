import Hero from "../components/sections/Hero";
import StatsBar from "../components/sections/StatsBar";
import ProblemSolution from "../components/sections/ProblemSolution";
import Features from "../components/sections/Features";
import HowItWorks from "../components/sections/HowItWorks";
import TopContractors from "../components/sections/TopContractors";
import ExploreLand from "../components/sections/LandBiddingPreview";
import AIRecommendation from "../components/sections/AIRecommendation";
import StatsRow from "../components/sections/StatsRow";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <TopContractors />
      <ExploreLand />
      <AIRecommendation />
      <StatsRow />
    </>
  );
}
