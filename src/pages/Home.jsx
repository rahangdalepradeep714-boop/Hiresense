import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-slate-950 to-cyan-500/20"></div>

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-sm font-semibold mb-5">
              AI Powered Recruitment Platform
            </span>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Hire Smarter,  
              <span className="text-indigo-400"> Faster</span> with AI
            </h1>

            <p className="mt-6 text-lg text-slate-300 max-w-xl">
              HireSense connects skilled candidates with the right companies
              using AI-based resume screening, job matching, and smart hiring
              workflows.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="bg-indigo-500 hover:bg-indigo-600 transition px-7 py-3 rounded-xl font-semibold shadow-lg"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="bg-white/10 hover:bg-white/20 border border-white/20 px-7 py-3 rounded-xl font-semibold"
              >
                Login
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12 max-w-lg">
              <div>
                <h3 className="text-3xl font-bold">500+</h3>
                <p className="text-slate-400 text-sm">Candidates</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">120+</h3>
                <p className="text-slate-400 text-sm">Companies</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">95%</h3>
                <p className="text-slate-400 text-sm">Match Rate</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Hiring Dashboard</h2>

            <div className="space-y-4">
              {[
                "Resume Skills Extracted",
                "Best Job Match Found",
                "Company Application Sent",
                "Interview Process Started",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white/10 p-4 rounded-xl"
                >
                  <span>{item}</span>
                  <span className="text-green-400 font-bold">✓</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 text-slate-900 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold">Why Choose HireSense?</h2>
          <p className="mt-4 text-slate-600">
            Powerful features for candidates and companies.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            <div className="bg-white p-8 rounded-3xl shadow hover:-translate-y-2 transition">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="font-bold text-xl">Resume Screening</h3>
              <p className="text-slate-500 mt-3">
                Automatically extract candidate skills, experience, and profile
                details from resumes.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow hover:-translate-y-2 transition">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-bold text-xl">Smart Job Matching</h3>
              <p className="text-slate-500 mt-3">
                Match candidate skills with company requirements using AI-driven
                recommendations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow hover:-translate-y-2 transition">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="font-bold text-xl">Role Based Access</h3>
              <p className="text-slate-500 mt-3">
                Separate secure dashboards for candidates, companies, and admin
                users.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-indigo-600 px-6 py-16 text-center">
        <h2 className="text-4xl font-bold">Ready to build your career?</h2>
        <p className="mt-4 text-indigo-100">
          Start applying for jobs or post your company openings today.
        </p>

        <Link
          to="/register"
          className="inline-block mt-8 bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold"
        >
          Join HireSense
        </Link>
      </section>
    </div>
  );
}

export default Home;