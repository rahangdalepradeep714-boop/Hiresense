import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/api";
import { Briefcase, MapPin, Clock, Users, Mail, Phone } from "lucide-react";

function CompanyDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const [job, setJob] = useState({
    companyName: "",
    title: "",
    description: "",
    requiredSkills: "",
    location: "",
    experience: "",
  });

  const fetchCompanyJobs = async () => {
    try {
      const res = await API.get("/company/jobs");
      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await API.get("/company/applications");
      setApplications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompanyJobs();
    fetchApplications();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/company/jobs", job);
      alert("Job posted successfully");

      setJob({
        companyName: "",
        title: "",
        description: "",
        requiredSkills: "",
        location: "",
        experience: "",
      });

      fetchCompanyJobs();
    } catch {
      alert("Job post failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5">
            <div>
              <h1 className="text-4xl font-bold text-white">
                Company Dashboard
              </h1>
              <p className="text-slate-400 mt-2">
                Post jobs and manage candidate applications.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-4 rounded-3xl shadow-xl">
                <p className="text-sm text-indigo-100">Total Vacancies</p>
                <h2 className="text-3xl font-bold">{jobs.length}</h2>
              </div>

              <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 px-6 py-4 rounded-3xl shadow-xl">
                <p className="text-sm text-cyan-100">Applications</p>
                <h2 className="text-3xl font-bold">{applications.length}</h2>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl p-8 mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Post New Job
            </h2>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
              <input
                className="bg-slate-800 border border-slate-700 text-white p-3 rounded-xl focus:outline-none focus:border-indigo-500"
                placeholder="Company Name"
                value={job.companyName}
                onChange={(e) =>
                  setJob({ ...job, companyName: e.target.value })
                }
              />

              <input
                className="bg-slate-800 border border-slate-700 text-white p-3 rounded-xl focus:outline-none focus:border-indigo-500"
                placeholder="Job Title"
                value={job.title}
                onChange={(e) => setJob({ ...job, title: e.target.value })}
              />

              <input
                className="bg-slate-800 border border-slate-700 text-white p-3 rounded-xl focus:outline-none focus:border-indigo-500"
                placeholder="Required Skills e.g. java,spring boot,react"
                value={job.requiredSkills}
                onChange={(e) =>
                  setJob({ ...job, requiredSkills: e.target.value })
                }
              />

              <input
                className="bg-slate-800 border border-slate-700 text-white p-3 rounded-xl focus:outline-none focus:border-indigo-500"
                placeholder="Location"
                value={job.location}
                onChange={(e) => setJob({ ...job, location: e.target.value })}
              />

              <input
                className="bg-slate-800 border border-slate-700 text-white p-3 rounded-xl focus:outline-none focus:border-indigo-500"
                placeholder="Experience"
                value={job.experience}
                onChange={(e) =>
                  setJob({ ...job, experience: e.target.value })
                }
              />

              <textarea
                className="bg-slate-800 border border-slate-700 text-white p-3 rounded-xl md:col-span-2 focus:outline-none focus:border-indigo-500"
                placeholder="Job Description"
                rows="4"
                value={job.description}
                onChange={(e) =>
                  setJob({ ...job, description: e.target.value })
                }
              />

              <button className="md:col-span-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:scale-[1.02] transition p-4 rounded-xl font-semibold">
                Post Job
              </button>
            </form>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-5 text-white">
              Candidate Applications
            </h2>

            {applications.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl text-center text-slate-400">
                No applications received yet.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500/20 text-green-400 p-3 rounded-xl">
                        <Users size={22} />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {app.candidateName}
                        </h3>
                        <p className="text-sm bg-green-500/20 text-green-400 inline-block px-3 py-1 rounded-full mt-1">
                          {app.status}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-2 text-slate-300">
                      <p className="flex items-center gap-2">
                        <Mail size={16} />
                        {app.candidateEmail}
                      </p>

                      <p className="flex items-center gap-2">
                        <Phone size={16} />
                        {app.candidatePhone}
                      </p>
                    </div>

                    <div className="mt-4">
                      <p className="font-semibold mb-2 text-white">
                        Candidate Skills
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {app.candidateSkills?.split(",").map((skill, index) => (
                          <span
                            key={index}
                            className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-slate-400">
                      Applied At:{" "}
                      {app.appliedAt
                        ? new Date(app.appliedAt).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-5 text-white">
              Your Posted Jobs
            </h2>

            {jobs.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl text-center text-slate-400">
                No jobs posted yet.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {jobs.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl hover:border-indigo-500 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-500/20 text-indigo-300 p-3 rounded-xl">
                        <Briefcase size={22} />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {item.title}
                        </h3>
                        <p className="text-slate-400">{item.companyName}</p>
                      </div>
                    </div>

                    <p className="mt-4 text-slate-300">{item.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.requiredSkills?.split(",").map((skill, index) => (
                        <span
                          key={index}
                          className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex justify-between text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin size={16} />
                        {item.location}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {item.experience}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDashboard;