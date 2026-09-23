import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProfile, updateProfile } from "../api/auth";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [interests, setInterests] = useState([]);
  const [interestInput, setInterestInput] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Beginner");
  const [githubLink, setGithubLink] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        const data = response.data;
        setProfile(data);
        setBio(data.bio || "");
        setSkills(data.skills || []);
        setInterests(data.interests || []);
        setExperienceLevel(data.experienceLevel || "Beginner");
        setGithubLink(data.githubLink || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const addSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const addInterest = (e) => {
    if (e.key === "Enter" && interestInput.trim()) {
      e.preventDefault();
      setInterests([...interests, interestInput.trim()]);
      setInterestInput("");
    }
  };

  const removeInterest = (interest) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await updateProfile({
        bio,
        skills,
        interests,
        experienceLevel,
        githubLink,
      });
      setSaved(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg">
        <Navbar />
        <p className="text-text-secondary p-10 font-mono">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="px-6 py-12 max-w-2xl mx-auto">
        <p className="text-accent-green font-mono text-xs mb-2">
          // DEVELOPER_PROFILE
        </p>
        <h1 className="font-heading text-4xl text-text-primary mb-2">
          Your collaborator signal.
        </h1>
        <p className="text-text-secondary mb-10">
          Keep your skills current so project matches stay useful.
        </p>

        <div className="mb-6">
          <p className="text-text-primary font-medium">{profile?.name}</p>
          <p className="text-text-secondary text-sm">{profile?.email}</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-xs text-text-secondary uppercase">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full mt-1 bg-surface border border-text-secondary/30 rounded px-3 py-2 text-text-primary focus:outline-none focus:border-accent-green"
            />
          </div>

          <div>
            <label className="text-xs text-text-secondary uppercase">
              GitHub Profile
            </label>
            <input
              type="text"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              placeholder="https://github.com/username"
              className="w-full mt-1 bg-surface border border-text-secondary/30 rounded px-3 py-2 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent-green"
            />
          </div>

          <div>
            <label className="text-xs text-text-secondary uppercase">
              Technical Skills
            </label>
            <div className="mt-1 bg-surface border border-text-secondary/30 rounded px-3 py-2">
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs bg-bg border border-text-secondary/20 rounded px-2 py-1 text-text-secondary flex items-center gap-1"
                  >
                    # {skill}
                    <button onClick={() => removeSkill(skill)} className="text-accent-coral">
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={addSkill}
                placeholder="Add a skill and press Enter"
                className="w-full bg-transparent text-text-primary text-sm placeholder-text-secondary/50 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-text-secondary uppercase">
              Interests
            </label>
            <div className="mt-1 bg-surface border border-text-secondary/30 rounded px-3 py-2">
              <div className="flex flex-wrap gap-2 mb-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="font-mono text-xs bg-bg border border-text-secondary/20 rounded px-2 py-1 text-text-secondary flex items-center gap-1"
                  >
                    # {interest}
                    <button onClick={() => removeInterest(interest)} className="text-accent-coral">
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={addInterest}
                placeholder="Add an interest and press Enter"
                className="w-full bg-transparent text-text-primary text-sm placeholder-text-secondary/50 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-text-secondary uppercase">
              Experience Level
            </label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full mt-1 bg-surface border border-text-secondary/30 rounded px-3 py-2 text-text-primary focus:outline-none focus:border-accent-green"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-accent-green text-bg font-medium px-6 py-2 rounded hover:opacity-90 transition"
            >
              {saving ? "Saving..." : "Save profile"}
            </button>
            {saved && (
              <span className="text-accent-green text-sm">✓ Saved</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;