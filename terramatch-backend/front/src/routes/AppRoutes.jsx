import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import FindContractor from "../pages/FindContractor";
import ContractorProfilePage from "../pages/ContractorProfilePage";
import ExploreLand from "../pages/ExploreLand";
import Pricing from "../pages/Pricing";
import HowItWorks from "../pages/HowItWorks";
import LandDetail from "../pages/LandDetail";
import LandOwner from "../pages/LandOwner";
import GetStarted from "../pages/GetStarted";
import GetStartedForm from "../pages/GetStartedForm";
import GetStartedVerify from "../pages/GetStartedVerify";
import Dashboard from "../pages/Dashboard";
import Messages from "../pages/Messages";
import Login from "../pages/Login";
import About from "../pages/About";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Blog from "../pages/Blog";
import BlogPostPage from "../pages/BlogPostPage";
import Contact from "../pages/Contact";
import Features from "../pages/Features";
import HelpCenter from "../pages/HelpCenter";
import Profile from "../pages/Profile";
import PostAProject from "../pages/PostAProject";
import ListYourLand from "../pages/ListYourLand";
import PlaceholderPage from "../pages/PlaceholderPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/find-contractor" element={<FindContractor />} />
      <Route path="/find-contractor/:slug" element={<ContractorProfilePage />} />
      <Route path="/explore-land" element={<ExploreLand />} />
      <Route path="/explore-land/:slug" element={<LandDetail />} />
      <Route path="/land-owner/:slug" element={<LandOwner />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/get-started/form" element={<GetStartedForm />} />
      <Route path="/get-started/verify" element={<GetStartedVerify />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/features" element={<Features />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/post-a-project" element={<PostAProject />} />
      <Route path="/list-your-land" element={<ListYourLand />} />
      <Route
        path="*"
        element={<PlaceholderPage title="Page Not Found" />}
      />
    </Routes>
  );
}
