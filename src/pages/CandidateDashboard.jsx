import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../api/api";
import {
  Upload,
  Briefcase,
  MapPin,
  Clock,
  CheckCircle,
  FileText,
} from "lucide-react";

function CandidateDashboard() {
  const [file, setFile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Auto load jobs on page load if resume already uploaded
  useEffect(() => {
    getMatchingJobs();
  }, []);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a resume file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      // Note: Do not manually set 'Content-Type', Axios will calculate boundary automatically
      await API.post("/candidate/resume/upload", formData);

      alert("Resume Uploaded Successfully!");
      getMatchingJobs(); // Automatically fetch jobs after upload
    } catch (error) {
      console.error("Upload error details:", error.response);
      if (error.response?.status === 403) {
        alert("Session Expired / Permission Denied. Please logout and login again.");
      } else {
        alert("Upload failed: " + (error.response?.data?.message || "Server Error"));
      }
    } finally {
      setLoading(false);
    }
  };

  const getMatchingJobs = async () => {
    try {
      const res = await API.get("/candidate/jobs/matching");
      setJobs(res.data);
    } catch (error) {
      console.error("Get jobs error:", error);
      if (error.response?.status !== 403) {
        // Only alert if it's not a permission error
      }
    }
  };

  const applyJob = async (id) => {
    try {
      await API.post(`/candidate/jobs/${id}/apply`);
      setAppliedJobs((prev) => [...prev, id]);
      alert("Application Submitted!");
    } catch (error) {
      if (error.response?.status === 400 || error.response?.status === 409) {
        setAppliedJobs((prev) => [...prev, id]);
        alert("Already applied to this job");
      } else {
        alert("Failed to apply. Check authorization.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="bg-gradient-to-br from-indigo-600/20 via-slate-950 to-cyan-600/10 min-h-screen px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-bold">Candidate Dashboard</h1>
            <p className="text-slate-400 mt-2">
              Upload resume and discover AI-powered job recommendations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
              <h3 className="text-slate-400">Recommended Jobs</h3>
              <p className="text-4xl mt-3 font-bold">{jobs.length}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
              <h3 className="text-slate-400">Applied Jobs</h3>
              <p className="text-4xl mt-3 font-bold">{appliedJobs.length}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
              <h3 className="text-slate-400">Resume Status</h3>
              <p className="text-4xl mt-3 font-bold text-green-400">
                {file ? "File Selected" : "Pending Selection"}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Upload className="text-indigo-400" />
                <h2 className="text-2xl font-bold">Upload Resume</h2>
              </div>

              <div className="border-2 border-dashed border-slate-600 p-10 rounded-2xl text-center">
                <FileText size={50} className="mx-auto text-indigo-400" />
                <p className="mt-4 text-slate-300">Upload PDF or TXT Resume</p>
                <input
                  type="file"
                  accept=".pdf,.txt"
                  className="mt-5"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <button
                disabled={loading}
                onClick={uploadResume}
                className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 p-4 rounded-xl font-semibold transition"
              >
                {loading ? "Uploading..." : "Upload Resume"}
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="text-cyan-400" />
                <h2 className="text-2xl font-bold">Smart Job Matching</h2>
              </div>

              <p className="text-slate-300">
                AI analyzes your resume skills and recommends jobs with high match percentages.
              </p>

              <button
                onClick={getMatchingJobs}
                className="mt-6 w-full bg-cyan-600 hover:bg-cyan-700 p-4 rounded-xl font-semibold transition"
              >
                Show Matching Jobs
              </button>
            </div>
          </div>

          <div className="mt-14">
            <h2 className="text-3xl font-bold mb-8">Recommended Jobs</h2>

            {jobs.length === 0 ? (
              <div className="bg-white/10 p-10 rounded-3xl text-center text-slate-400">
                No matching jobs found. Please upload a resume first.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {jobs.map((item) => {
                  const isApplied = appliedJobs.includes(item.job.id);

                  return (
                    <div
                      key={item.job.id}
                      className="bg-white rounded-3xl p-8 text-slate-900 shadow-xl"
                    >
                      <div className="flex justify-between">
                        <div>
                          <h2 className="text-2xl font-bold">
                            {item.job.title}
                          </h2>
                          <p className="text-slate-500">
                            {item.job.companyName}
                          </p>
                        </div>

                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold h-fit">
                          {item.matchPercentage ? item.matchPercentage.toFixed(1) : 0}%
                        </span>
                      </div>

                      <p className="mt-5 text-slate-600">
                        {item.job.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-5">
                        {item.job.requiredSkills
                          ?.split(",")
                          .map((skill, i) => (
                            <span
                              key={i}
                              className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                      </div>

                      <div className="mt-6 flex justify-between text-slate-500">
                        <span className="flex gap-1 items-center">
                          <MapPin size={18} />
                          {item.job.location}
                        </span>

                        <span className="flex gap-1 items-center">
                          <Clock size={18} />
                          {item.job.experience}
                        </span>
                      </div>

                      <button
                        disabled={isApplied}
                        onClick={() => applyJob(item.job.id)}
                        className={`mt-6 w-full p-4 rounded-xl font-semibold transition ${
                          isApplied
                            ? "bg-green-100 text-green-700 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white"
                        }`}
                      >
                        {isApplied ? (
                          <div className="flex justify-center items-center gap-2">
                            <CheckCircle size={20} />
                            Already Applied
                          </div>
                        ) : (
                          "Apply Now"
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateDashboard;