import { Logo } from "@/components/logot";
import { LandingButtons } from "./landing-buttons";

export const trustedCompanies = [
  {
    name: "adobe",
  },
  {
    name: "atlassian",
  },
  {
    name: "medium",
  },
  {
    name: "coinbase",
  },
  {
    name: "framer",
  },
  {
    name: "google",
  },
];

const HeroSection = () => {
  return (
    <>
      <section className="pt-20 ">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <p className="py-2 px-3 rounded-full border text-sm my-4 dark:text-[#FFFF] text-[#020817] dark:bg-[#0F172A] dark:border-[#1E293B] bg-[#F1F5F9] border-[#E2E8F0]">
                <span className="text-[#3259E8]">#1</span> Platform for resume
              </p>
              <h1 className="text-5xl font-bold leading-snug text-center dark:text-[#F8FAFC] text-[#020817]">
                Elevate Your Career With
                <br />
                <span className="bg-blue-700 py-1 px-6 mt-1 font-bold rounded-xl text-white inline-block rotate-[-5deg] hover:rotate-0 transition-all duration-200">
                  <Logo className="text-4xl" />
                </span>
              </h1>
              <p className="max-w-md mx-auto text-center mt-6 text-[#64748B] font-medium ">
                Unlock exclusive insights and industry standard analytics on you
                resume.
              </p>
            </div>
            <LandingButtons />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
