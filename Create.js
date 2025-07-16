import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Linkedin, Github, User, Upload, FileText } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [panCard, setPanCard] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [resume, setResume] = useState(null);
  const [skills, setSkills] = useState([]);
  const [achievements, setAchievements] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResume(file.name);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center p-10 text-white">
      <div className="max-w-4xl w-full bg-gray-800 p-8 rounded-lg shadow-lg border border-green-500">
        <div className="text-center">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full border-4 border-green-500 mx-auto" />
          ) : (
            <User size={100} className="text-green-500 mx-auto" />
          )}
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="upload-profile" />
          <label htmlFor="upload-profile" className="bg-green-600 p-2 mt-2 rounded cursor-pointer inline-block">Upload Image</label>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-4">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="w-full bg-gray-700 p-3 rounded" />
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full bg-gray-700 p-3 rounded" />
          <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-gray-700 p-3 rounded">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Short Bio" className="w-full bg-gray-700 p-3 rounded"></textarea>
        </div>

        <h2 className="text-lg text-green-500 mt-6">Contact Information</h2>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="bg-gray-700 p-3 rounded" />
          <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="LinkedIn" className="bg-gray-700 p-3 rounded" />
          <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} placeholder="GitHub" className="bg-gray-700 p-3 rounded" />
          <input type="text" value={panCard} onChange={(e) => setPanCard(e.target.value)} placeholder="PAN Card" className="bg-gray-700 p-3 rounded" />
        </div>

        <h2 className="text-lg text-green-500 mt-6">Resume</h2>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} className="hidden" id="upload-resume" />
        <label htmlFor="upload-resume" className="bg-blue-600 p-2 rounded cursor-pointer mt-2 inline-block">Upload Resume</label>
        {resume && <p className="text-center mt-2 text-sm">Uploaded: {resume}</p>}

        <h2 className="text-lg text-green-500 mt-6">Skills & Achievements</h2>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <h3 className="text-green-400">Skills</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, index) => (
                <span key={index} className="bg-green-600 px-3 py-1 rounded text-sm">{skill}</span>
              ))}
            </div>
            <input type="text" placeholder="Add a skill and press Enter" className="w-full bg-gray-700 p-3 rounded mt-2" onKeyPress={(e) => { if (e.key === 'Enter' && e.target.value) { setSkills([...skills, e.target.value]); e.target.value = ''; } }} />
          </div>
          <div>
            <h3 className="text-green-400">Achievements</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {achievements.map((achievement, index) => (
                <span key={index} className="bg-blue-600 px-3 py-1 rounded text-sm">{achievement}</span>
              ))}
            </div>
            <input type="text" placeholder="Add an achievement and press Enter" className="w-full bg-gray-700 p-3 rounded mt-2" onKeyPress={(e) => { if (e.key === 'Enter' && e.target.value) { setAchievements([...achievements, e.target.value]); e.target.value = ''; } }} />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button onClick={() => alert('Profile Saved!')} className="bg-green-500 px-6 py-3 rounded">Save Profile</button>
          <button onClick={() => navigate('/home')} className="bg-gray-600 px-6 py-3 rounded">Back to Home</button>
        </div>
      </div>
    </div>
  );
}
