// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import profilePic from './assets/profile.png';
import cert1 from './assets/cert1.jpeg';
import cert2 from './assets/cert2.jpeg';
import cert3 from './assets/cert3.jpeg';
import cert4 from './assets/cert4.jpeg';
import project1 from './assets/project1.png';
import project2 from './assets/project2.png';
import resume from './assets/resume.pdf';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaGitAlt,
  FaPython, FaCloudUploadAlt, FaGithub, FaLinkedin, FaInstagram, FaArrowUp,
  FaMoon, FaSun, FaDownload
} from 'react-icons/fa';

function App() {
  const [theme, setTheme] = useState('dark');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const openModal = (imgSrc, title) => {
    const modal = document.getElementById("certificate-modal");
    const modalImg = document.getElementById("modal-img");
    const caption = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = imgSrc;
    caption.innerHTML = title;

    // Close modal on X click
    document.querySelector(".close").onclick = function () {
      modal.style.display = "none";
    };

    // Close modal on outside click
    window.onclick = function (e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    };
  };

  // ✅ Existing Theme useEffect
  useEffect(() => {
    AOS.init({ duration: 1000 });
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // ✅ 🆕 Certificate Scroll Animation useEffect
  useEffect(() => {
    const cards = document.querySelectorAll(".certificate-card");

    const revealOnScroll = () => {
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          card.classList.add("show");
        }
      });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // First check (page refresh par bhi check hoga)

    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  // ✅ Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, email, message };
    console.log("Form data sent:", formData);

    try {
      const res = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("✅ Message sent successfully!", { position: "top-right" });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        toast.error("❌ Failed to send message!", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("❌ Something went wrong!", { position: "top-right" });
    }
  };

  return (
    <div className="app">
     <nav className="navbar">
  <div className="logo">Suraj Kumar</div>

  {/* Hamburger button (mobile) */}
  <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
    <div className={menuOpen ? "bar open" : "bar"}></div>
    <div className={menuOpen ? "bar open" : "bar"}></div>
    <div className={menuOpen ? "bar open" : "bar"}></div>
  </div>

  {/* Links */}
  <ul className={menuOpen ? "nav-links open" : "nav-links"}>
    <li><a href="#profile" onClick={() => setMenuOpen(false)}>Profile</a></li>
    <li><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a></li>
    <li><a href="#certificates" onClick={() => setMenuOpen(false)}>Certificates</a></li>
    <li><a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a></li>
    <li><a href="#footer" onClick={() => setMenuOpen(false)}>Contact</a></li>
  </ul>

  <button className="toggle-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
    {theme === 'dark' ? <FaSun /> : <FaMoon />}
  </button>
  <a className="resume-btn" href={resume} download>
    <FaDownload style={{ marginRight: '6px' }} /> Resume
  </a>
</nav>


      <section className="hero" id="profile">
  <div className="hero-container">
    {/* ✅ LEFT – Profile Image */}
    <div className="hero-img">
      <img 
        src={profilePic} 
        alt="Suraj Kumar" 
        className="profile-pic glowing-img"
      />
    </div>

    {/* ✅ RIGHT – Bio */}
    <div className="hero-content">
     <h1>Hi, I'm <span className="profile-name">Suraj Kumar</span></h1>

      <p>
        A passionate <strong>Frontend & Backend Developer</strong>, and AI/ML enthusiast with experience in full-stack and ML-based projects. 
        I love creating sleek UI, scalable backends, and experimenting with AI innovations.
      </p>
      <div className="hero-buttons">
        <a href="#footer" className="btn primary">Hire Me</a>
        <a href={resume} download className="btn secondary">Download CV</a>
      </div>
    </div>
  </div>
</section>


   {/* ✅ 🚀 Projects Section */}
<section id="projects" className="projects-section">
  <h2 className="section-title">🚀 Projects</h2>

  <div className="projects-grid">
    {/* 🔥 Project 1 */}
    <div className="project-card">
      <div className="project-img-wrapper">
        <img src={project1} alt="MOCO AI" className="project-img" />
      </div>
      <div className="project-content">
        <h3>MOCO AI</h3>
        <p>
          AI-based Help Bot for Information Retrieval using React, Flask & TensorFlow. Created for ISRO Hackathon.
        </p>
        <a
          href="https://mocoai.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          🔗 View Demo
        </a>
      </div>
    </div>

    {/* 🔥 Project 2 */}
    <div className="project-card">
      <div className="project-img-wrapper">
        <img src={project2} alt="Shop Smart Deal" className="project-img" />
      </div>
      <div className="project-content">
        <h3>Shop Smart Deal</h3>
        <p>
          React + Node.js e-commerce app with MongoDB and ML-basedrecommendation system. Optimized for performance and mobile UI.
        </p>
        <a
          href="https://shopsmartdeal.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          🔗 View Demo
        </a>
      </div>
    </div>
  </div>
</section>
{/* ✅ CERTIFICATES SECTION */}
<section id="certificates" className="section">
  <h2>Certificates</h2>

  {/* 🔥 MODAL */}
  <div id="certificate-modal" className="modal">
    <span className="close">&times;</span>
    <img className="modal-content" id="modal-img" alt="certificate-full" />
    <div id="caption"></div>
  </div>

  <div className="certificate-grid">
    {[ 
      { img: cert1, title: "Knowledge Gate YouTube", desc: "Frontend foundations, real mini projects in HTML/CSS." },
      { img: cert2, title: "Mindluster - CSS for Beginners", desc: "Mastered layout, color, typography and responsive styling." },
      { img: cert3, title: "Innovate2Educate - CII & Ministry of I&B", desc: "Workshops on innovation, content creation and digital tools." },
      { img: cert4, title: "Knowledge Gate - JavaScript", desc: "JS fundamentals, DOM, APIs, ES6+ & vanilla JS projects." }
    ].map((cert, index) => (
      <div key={index} className="certificate-card">
        <img 
          src={cert.img} 
          alt={cert.title} 
          onClick={() => openModal(cert.img, cert.title)}
        />
        <h3>{cert.title}</h3>
        <p>{cert.desc}</p>
      </div>
    ))}
  </div>
</section>



     {/* <section id="certificates" className="section">
  <h2>Certificates</h2>
  <div className="certificate-grid">
    <div className="certificate-card">
      <img src={cert1} alt="Certificate 1" />
      <h3>Knowledge Gate YouTube</h3>
      <p>Frontend foundations, real mini projects in HTML/CSS.</p>
    </div>
    <div className="certificate-card">
      <img src={cert2} alt="Certificate 2" />
      <h3>Mindluster - CSS for Beginners</h3>
      <p>Mastered layout, color, typography and responsive styling.</p>
    </div>
    <div className="certificate-card">
      <img src={cert3} alt="Certificate 3" />
      <h3>Innovate2Educate - CII & Ministry of I&B</h3>
      <p>Workshops on innovation, content creation and digital tools.</p>
    </div>
    <div className="certificate-card">
      <img src={cert4} alt="Certificate 4" />
      <h3>Knowledge Gate - JavaScript</h3>
      <p>JS fundamentals, DOM, APIs, ES6+ & vanilla JS projects.</p>
    </div>
  </div>
</section> */}


      <section id="skills" className="skills-section">
        <h2 className="skills-title">Skills & Abilities</h2>
        <div className="skills-grid">
          <div className="skill-card">
            <FaHtml5 className="skill-icon" />
            <h4>Frontend</h4>
            <p>HTML, CSS, JavaScript, React, Bootstrap, Tailwind</p>
          </div>
          <div className="skill-card">
            <FaPython className="skill-icon" />
            <h4>Backend</h4>
            <p>Python, Django, Flask, FastAPI, MongoDB</p>
          </div>
          <div className="skill-card">
            <FaCloudUploadAlt className="skill-icon" />
            <h4>Database</h4>
            <p>MongoDB, MySQL, Neo4j</p>
          </div>
          <div className="skill-card">
            <FaReact className="skill-icon" />
            <h4>AI/ML</h4>
            <p>Spacy, NLTK, Transformers, Scikit-learn</p>
          </div>
          <div className="skill-card">
            <FaGitAlt className="skill-icon" />
            <h4>Others</h4>
            <p>BeautifulSoup, Selenium, Git, VS Code, Deployment</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <h2>Hire Me</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Your Name" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Your Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="5" placeholder="Write your message here..." required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
          </div>
          <button type="submit" className="btn submit-btn">Send Message</button>
        </form>
      </section>

      <footer id="footer" className="footer">
        <p>Connect with me:</p>
        <div className="social-icons">
          <a href="https://github.com/vishsuraj9546" target="_blank"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/suraj-kumar-6a2759283/" target="_blank"><FaLinkedin /></a>
          <a href="https://www.instagram.com/rolex_suraj_9546/" target="_blank"><FaInstagram /></a>
        </div>
        <a href="#" className="back-to-top"><FaArrowUp /></a>
        <p>Email: sr6447868@gmail.com | Phone: 9546860925</p>
        <p>&copy; 2025 Suraj Kumar. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
<ToastContainer />

export default App;
