
import React, { useState } from "react";
import "./style.css";

const initialUsers = [
  {
    id: 1,
    name: "Ananya Sharma",
    avatar: "👩🏻‍💻",
    role: "UI/UX Designer",
    teach: ["UI Design", "Figma", "Graphic Design"],
    learn: ["React", "Python"],
    rating: "4.9",
    location: "Hyderabad"
  },
  {
    id: 2,
    name: "Rahul Kumar",
    avatar: "👨🏻‍🎓",
    role: "Photography Enthusiast",
    teach: ["Photography", "Video Editing"],
    learn: ["Python", "Java"],
    rating: "4.8",
    location: "Bangalore"
  },
  {
    id: 3,
    name: "Priya Reddy",
    avatar: "👩🏻‍🎨",
    role: "Creative Artist",
    teach: ["Drawing", "Painting", "Crafts"],
    learn: ["Web Development", "React"],
    rating: "4.7",
    location: "Chennai"
  },
  {
    id: 4,
    name: "Arjun Verma",
    avatar: "👨🏻‍💻",
    role: "Developer",
    teach: ["Python", "Java", "React"],
    learn: ["UI Design", "Photography"],
    rating: "4.9",
    location: "Vijayawada"
  }
];

const initialTeach = ["React", "Python"];
const initialLearn = ["UI Design", "Photography"];

function App() {
  const [page, setPage] = useState("Home");
  const [users] = useState(initialUsers);
  const [teach, setTeach] = useState(initialTeach);
  const [learn, setLearn] = useState(initialLearn);
  const [requests, setRequests] = useState([]);
  const [teachInput, setTeachInput] = useState("");
  const [learnInput, setLearnInput] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const matches = users.map(user => {
    const gives = user.teach.filter(skill =>
      learn.some(s => s.toLowerCase() === skill.toLowerCase())
    );

    const receives = user.learn.filter(skill =>
      teach.some(s => s.toLowerCase() === skill.toLowerCase())
    );

    const score =
      gives.length && receives.length
        ? Math.round(
            ((gives.length + receives.length) /
              (learn.length + teach.length)) * 100
          )
        : 0;

    return { ...user, gives, receives, score };
  }).filter(user => user.score > 0);
  const directorySkillCount = new Set(
    users.flatMap(user => [...user.teach, ...user.learn].map(skill => skill.toLowerCase()))
  ).size;

  const filtered = matches.filter(user =>
    [user.name, user.role, user.location, ...user.teach, ...user.learn]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function addSkill(type) {
    const value = type === "teach" ? teachInput : learnInput;
    if (!value.trim()) return;

    if (type === "teach") {
      if (!teach.some(skill => skill.toLowerCase() === value.trim().toLowerCase())) {
        setTeach([...teach, value.trim()]);
      }
      setTeachInput("");
    } else {
      if (!learn.some(skill => skill.toLowerCase() === value.trim().toLowerCase())) {
        setLearn([...learn, value.trim()]);
      }
      setLearnInput("");
    }
  }

  function removeSkill(type, skill) {
    if (type === "teach") {
      setTeach(teach.filter(s => s !== skill));
    } else {
      setLearn(learn.filter(s => s !== skill));
    }
  }

  function sendRequest(user) {
    if (requests.some(r => r.id === user.id)) return;
    setRequests([...requests, {
      ...user,
      status: "Pending"
    }]);
  }

  function updateRequest(id, status) {
    setRequests(requests.map(r =>
      r.id === id ? { ...r, status } : r
    ));
  }

  const navItems = ["Home", "Explore Skills", "My Skills", "Requests", "Profile"];

  return (
    <div className="app">
      <header className="navbar">
        <button className="brand brand-button" onClick={() => setPage("Home")} aria-label="SkillSwap home">
          <span className="brand-icon">S</span>
          Skill<span>Swap</span>
        </button>

        <nav>
          {navItems.map(item => (
            <button
              key={item}
              className={page === item ? "nav-link active" : "nav-link"}
              onClick={() => setPage(item)}
            >
              {item}
              {item === "Requests" && requests.length > 0 &&
                <span className="count">{requests.length}</span>}
            </button>
          ))}
        </nav>

        <div className="user-avatar">👩🏻</div>
      </header>

      <main>
        {page === "Home" && (
          <>
            <section className="hero">
              <div className="hero-content">
                <div className="eyebrow">✨ KNOWLEDGE HAS NO LIMITS</div>
                <h1>Learn Something.<br />
                  <span>Teach Something.</span>
                </h1>
                <p>
                  Exchange your skills, connect with passionate learners
                  and grow together. No money, just knowledge!
                </p>
                <div className="hero-buttons">
                  <button className="primary-btn"
                    onClick={() => setPage("Explore Skills")}>
                    Find Your Skill Partner →
                  </button>
                  <button className="outline-btn"
                    onClick={() => setPage("My Skills")}>
                    Add Your Skills
                  </button>
                </div>
                <div className="stats">
                  <div><b>{users.length}</b><small>Sample profiles</small></div>
                  <div><b>{directorySkillCount}</b><small>Skills represented</small></div>
                  <div><b>{matches.length}</b><small>Reciprocal matches</small></div>
                </div>
              </div>

              <div className="hero-art">
                <div className="art-circle">
                  <div className="art-main">🤝</div>
                  <div className="floating f1">💻</div>
                  <div className="floating f2">🎨</div>
                  <div className="floating f3">📸</div>
                  <div className="floating f4">🚀</div>
                </div>
                <div className="art-caption">
                  <span>⭐</span> Learn. Share. Grow.
                </div>
              </div>
            </section>

            <section className="section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">YOUR LEARNING JOURNEY</span>
                  <h2>How SkillSwap Works</h2>
                </div>
              </div>
              <div className="steps">
                <div className="step-card">
                  <div className="step-icon">📝</div>
                  <h3>Create Your Profile</h3>
                  <p>Add the skills you can teach and want to learn.</p>
                </div>
                <div className="step-card">
                  <div className="step-icon">🔍</div>
                  <h3>Find Your Match</h3>
                  <p>Discover people with complementary skills.</p>
                </div>
                <div className="step-card">
                  <div className="step-icon">🤝</div>
                  <h3>Exchange Skills</h3>
                  <p>Connect, teach and learn from each other.</p>
                </div>
              </div>
            </section>

            <section className="cta">
              <h2>Your Skills Are Valuable!</h2>
              <p>Start sharing your knowledge and discover new possibilities.</p>
              <button className="white-btn"
                onClick={() => setPage("My Skills")}>
                Get Started →
              </button>
            </section>
          </>
        )}

        {page === "Explore Skills" && (
          <section className="section page-section">
            <span className="eyebrow">DISCOVER YOUR COMMUNITY</span>
            <h1>Find Your Skill Partner</h1>
            <p className="subtitle">
              People who can teach what you want to learn
              and want to learn what you can teach.
            </p>

            <input className="search"
              placeholder="🔍 Search people or skills..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            <div className="match-info">
              🎯 {filtered.length} potential skill matches found
            </div>

            <div className="user-grid">
              {filtered.map(user => (
                <div className="user-card" key={user.id}>
                  <div className="card-top">
                    <div className="person-avatar">{user.avatar}</div>
                    <span className="match-badge">
                      {user.score}% Match
                    </span>
                  </div>
                  <h3>{user.name}</h3>
                  <p className="role">{user.role}</p>
                  <p className="location">📍 {user.location} · ⭐ {user.rating}</p>

                  <div className="skill-label">CAN TEACH YOU</div>
                  <div className="tags">
                    {user.gives.map(s => <span className="tag green" key={s}>{s}</span>)}
                  </div>

                  <div className="skill-label">WANTS TO LEARN</div>
                  <div className="tags">
                    {user.receives.map(s => <span className="tag purple" key={s}>{s}</span>)}
                  </div>

                  <button className="primary-btn full"
                    onClick={() => setSelectedUser(user)}>
                    View Profile
                  </button>
                </div>
              ))}
              {filtered.length === 0 &&
                <div className="empty" role="status">No matching partners found. Try adding more skills!</div>}
            </div>
          </section>
        )}

        {page === "My Skills" && (
          <section className="section page-section">
            <span className="eyebrow">YOUR PERSONAL SKILL PROFILE</span>
            <h1>Manage Your Skills</h1>
            <p className="subtitle">
              Tell the community what you know and what you wish to learn.
            </p>

            <div className="skills-layout">
              <div className="skill-panel">
                <div className="panel-icon green-bg">🎓</div>
                <h2>Skills I Can Teach</h2>
                <p>Share your knowledge with others.</p>
                <div className="skill-list">
                  {teach.map(s => (
                    <span className="skill-chip" key={s}>
                      {s}
                      <button type="button" aria-label={`Remove ${s} from skills I can teach`} onClick={() => removeSkill("teach", s)}>×</button>
                    </span>
                  ))}
                </div>
                <div className="add-row">
                  <input value={teachInput}
                    onChange={e => setTeachInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addSkill("teach")}
                    placeholder="Enter a skill..." />
                  <button onClick={() => addSkill("teach")}>+ Add</button>
                </div>
              </div>

              <div className="skill-panel">
                <div className="panel-icon purple-bg">🌱</div>
                <h2>Skills I Want to Learn</h2>
                <p>Explore new areas and grow your abilities.</p>
                <div className="skill-list">
                  {learn.map(s => (
                    <span className="skill-chip wanted" key={s}>
                      {s}
                      <button type="button" aria-label={`Remove ${s} from skills I want to learn`} onClick={() => removeSkill("learn", s)}>×</button>
                    </span>
                  ))}
                </div>
                <div className="add-row">
                  <input value={learnInput}
                    onChange={e => setLearnInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addSkill("learn")}
                    placeholder="Enter a skill..." />
                  <button onClick={() => addSkill("learn")}>+ Add</button>
                </div>
              </div>
            </div>

            <div className="center">
              <button className="primary-btn"
                onClick={() => setPage("Explore Skills")}>
                Find My Skill Matches →
              </button>
            </div>
          </section>
        )}

        {page === "Requests" && (
          <section className="section page-section">
            <span className="eyebrow">CONNECTIONS</span>
            <h1>My Exchange Requests</h1>
            <p className="subtitle">Track the status of your skill exchange requests.</p>
            {requests.length === 0 ? (
              <div className="empty-box">
                <div>📨</div>
                <h2>No requests yet!</h2>
                <p>Explore skills and send your first exchange request.</p>
                <button className="primary-btn"
                  onClick={() => setPage("Explore Skills")}>
                  Explore Partners
                </button>
              </div>
            ) : (
              <div className="request-list">
                {requests.map(r => (
                  <div className="request-card" key={r.id}>
                    <div className="person-avatar">{r.avatar}</div>
                    <div className="request-details">
                      <h3>{r.name}</h3>
                      <p>Exchange: {r.gives.join(", ")} for {r.receives.join(", ")}</p>
                      <span className="status">{r.status}</span>
                    </div>
                    {r.status === "Pending" && (
                      <button className="outline-btn"
                        onClick={() => updateRequest(r.id, "Cancelled")}>
                        Cancel
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {page === "Profile" && (
          <section className="section page-section">
            <span className="eyebrow">YOUR ACCOUNT</span>
            <h1>My Profile</h1>
            <div className="profile-card">
              <div className="profile-avatar">👩🏻‍💻</div>
              <h2>Student User</h2>
              <p>SkillSwap Community Member</p>
              <p>📍 India</p>
              <div className="profile-stats">
                <div><b>{teach.length}</b><small>Teaching Skills</small></div>
                <div><b>{learn.length}</b><small>Learning Goals</small></div>
                <div><b>{requests.length}</b><small>Requests</small></div>
              </div>
              <button className="primary-btn"
                onClick={() => setPage("My Skills")}>
                Edit My Skills
              </button>
            </div>
          </section>
        )}
      </main>

      {selectedUser && (
        <div className="modal-bg" onClick={() => setSelectedUser(null)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="profile-dialog-title" onClick={e => e.stopPropagation()}>
            <button className="close" aria-label="Close profile" onClick={() => setSelectedUser(null)}>×</button>
            <div className="person-avatar large">{selectedUser.avatar}</div>
            <h2 id="profile-dialog-title">{selectedUser.name}</h2>
            <p>{selectedUser.role}</p>
            <h4>Can teach you</h4>
            <div className="tags">
              {selectedUser.gives.map(s => <span className="tag green" key={s}>{s}</span>)}
            </div>
            <h4>Wants to learn from you</h4>
            <div className="tags">
              {selectedUser.receives.map(s => <span className="tag purple" key={s}>{s}</span>)}
            </div>
            <h3>🎯 {selectedUser.score}% Skill Match</h3>
            <button className="primary-btn full"
              onClick={() => {
                sendRequest(selectedUser);
                setSelectedUser(null);
              }}>
              Send Exchange Request
            </button>
          </div>
        </div>
      )}

      <footer>
        <div className="brand">Skill<span>Swap</span></div>
        <p>Learn. Teach. Exchange. Grow.</p>
        <small>© 2026 SkillSwap. A community built on shared knowledge.</small>
      </footer>
    </div>
  );
}

export default App;
