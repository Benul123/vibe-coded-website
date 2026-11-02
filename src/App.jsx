import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('focus');
  const [formStatus, setFormStatus] = useState('idle'); // idle, success

  // Handle Navbar Background on Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Active Section highlighting
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  // Scroll Reveal Animation
  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -100px 0px', threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    return () => revealElements.forEach(el => revealObserver.unobserve(el));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('success');
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled || mobileMenuOpen ? 'scrolled' : ''}`}>
        <a href="#" className="nav-logo" onClick={closeMobileMenu}>ALINE</a>

        <div className="nav-links">
          <a href="#focus" className={`nav-link ${activeSection === 'focus' ? 'active' : ''}`}>Focus</a>
          <a href="#services" className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}>Services</a>
          <a href="#portfolio" className={`nav-link ${activeSection === 'portfolio' ? 'active' : ''}`}>Showcase</a>
          <a href="#method" className={`nav-link ${activeSection === 'method' ? 'active' : ''}`}>The Method</a>
        </div>

        <a href="#contact" className="nav-cta">
          Book Consultation ↗
        </a>

        {/* Mobile Hamburger */}
        <button 
          className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="#focus" className="nav-link" onClick={closeMobileMenu}>Focus</a>
        <a href="#services" className="nav-link" onClick={closeMobileMenu}>Services</a>
        <a href="#portfolio" className="nav-link" onClick={closeMobileMenu}>Showcase</a>
        <a href="#method" className="nav-link" onClick={closeMobileMenu}>The Method</a>
        <a href="#contact" className="btn-primary" onClick={closeMobileMenu} style={{ marginTop: '2rem' }}>
          Book Consultation ↗
        </a>
      </div>

      <main>
        {/* Hero Section */}
        <section 
          className="hero" 
          id="focus"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=2000&q=80")' }}
        >
          <div className="hero-content">
            <div className="hero-heading reveal">
              <h1>
                Marketing Built<br />
                for the Surfaces<br />
                Industry<span className="terracotta-dot">.</span>
              </h1>
            </div>

            <div className="hero-description reveal" style={{ transitionDelay: '0.2s' }}>
              <p>
                We help tile manufacturers, distributors, and showrooms scale their international reach through performance ads, high-converting content, and targeted B2B media strategies.
              </p>

              <a href="#contact" className="btn-primary">
                Schedule a Consultation ↗
              </a>

              <div className="hero-targets">
                <span>Manufacturers</span>
                <span>|</span>
                <span>Distributors</span>
                <span>|</span>
                <span>Showrooms</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-greige">
          <div className="reveal">
            <h2 className="section-title">Specialized Services</h2>
            <p className="section-intro">We speak the language of specifiers, architects, and trade buyers. Our strategies are designed specifically for the sales cycles of the surfaces industry.</p>
          </div>
          
          <div className="services-grid">
            {[
              { title: 'Performance Ads', desc: 'Google and Meta campaigns optimized for sampling requests, catalog downloads, and showroom visits.' },
              { title: 'B2B Content & Catalogs', desc: 'Editorial-grade photography styling, technical copywriting, and digital catalog design that converts.' },
              { title: 'LinkedIn & Trade Media', desc: 'Account-based marketing to reach interior designers, architects, and procurement managers.' },
              { title: 'Showroom Lead Gen', desc: 'Localized SEO and targeted campaigns to drive foot traffic to your physical retail spaces.' },
              { title: 'International SEO', desc: 'Multi-lingual search strategies to capture global market share and export opportunities.' },
              { title: 'Email & Distributor Outreach', desc: 'Automated nurturing sequences to turn one-time buyers into loyal stocking distributors.' }
            ].map((srv, idx) => (
              <div className="service-card reveal" key={idx} style={{ transitionDelay: `${idx * 0.1}s` }}>
                <span className="service-number">0{idx + 1}</span>
                <h3>{srv.title}</h3>
                <p>{srv.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Showcase Section */}
        <section id="portfolio">
          <div className="reveal">
            <h2 className="section-title">Selected Impact</h2>
            <p className="section-intro">Real results for brands shaping the built environment.</p>
          </div>

          <div className="showcase-grid">
            {[
              { client: 'Tile Manufacturer, Spain', metric: '+240%', desc: 'Increase in qualified distributor inquiries across North America.', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80' },
              { client: 'Luxury Showroom, UK', metric: '3.2x', desc: 'Return on ad spend for localized A&D (Architect & Designer) campaigns.', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80' },
              { client: 'Stone Importer, USA', metric: '15k+', desc: 'New trade accounts acquired through a revamped LinkedIn media strategy.', img: 'https://images.unsplash.com/photo-1615876234886-fd1a88c44c7b?auto=format&fit=crop&w=800&q=80' }
            ].map((item, idx) => (
              <div className="showcase-card reveal" key={idx} style={{ transitionDelay: `${idx * 0.15}s` }}>
                <div className="showcase-img-wrapper">
                  <img src={item.img} alt={`Case study for ${item.client}`} className="showcase-image" />
                </div>
                <span className="showcase-meta">{item.client}</span>
                <h4 className="showcase-metric">{item.metric}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Method Section */}
        <section id="method" className="bg-dark">
          <div className="reveal">
            <h2 className="section-title">The Method</h2>
            <p className="section-intro" style={{ color: 'rgba(233,228,220,0.7)' }}>A proven, systematic approach to scaling surface brands.</p>
          </div>

          <div className="method-grid">
            {[
              { step: '1', title: 'Audit & Positioning', desc: 'We analyze your current trade footprint, competitor landscape, and brand positioning.' },
              { step: '2', title: 'Strategy Architecture', desc: 'Mapping out the exact channels, budgets, and creative required to hit your KPIs.' },
              { step: '3', title: 'Launch & Iterate', desc: 'Deploying campaigns to market, testing creative variations and audience segments.' },
              { step: '4', title: 'Scale & Expand', desc: 'Doubling down on profitable channels and expanding into new geographical markets.' }
            ].map((m, idx) => (
              <div className="method-step reveal" key={idx} style={{ transitionDelay: `${idx * 0.1}s` }}>
                <div className="step-number">{m.step}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-greige">
          <div className="contact-container reveal">
            <div className="contact-info">
              <h2>Let's grow your surfaces brand.</h2>
              <div className="contact-details">
                <p><strong>Email:</strong> hello@alinemarketing.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Office:</strong> New York | Valencia | Milan</p>
              </div>
            </div>

            <div className="contact-form-wrapper">
              {formStatus === 'success' ? (
                <div className="form-success reveal">
                  <h3>Message Received</h3>
                  <p>Thank you for reaching out. We will be in touch within 24 hours to schedule your consultation.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" required placeholder="Jane Doe" />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input type="text" id="company" required placeholder="Acme Surfaces" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="role">Business Type</label>
                    <select id="role" required defaultValue="">
                      <option value="" disabled>Select your business type</option>
                      <option value="manufacturer">Manufacturer</option>
                      <option value="distributor">Distributor</option>
                      <option value="showroom">Showroom / Retailer</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Work Email</label>
                    <input type="email" id="email" required placeholder="jane@acmesurfaces.com" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">How can we help?</label>
                    <textarea id="message" required placeholder="Tell us about your current marketing challenges..."></textarea>
                  </div>

                  <button type="submit" className="submit-btn">Request Consultation</button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">ALINE</div>
        
        <div className="footer-links">
          <a href="#focus">Focus</a>
          <a href="#services">Services</a>
          <a href="#portfolio">Showcase</a>
          <a href="#method">The Method</a>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ALINE Marketing. All rights reserved.</p>
          <p>Designed for the Built Environment.</p>
        </div>
      </footer>
    </div>
  )
}

export default App