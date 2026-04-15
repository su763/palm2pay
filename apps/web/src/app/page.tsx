'use client';

import { useState } from 'react';
import './tailwind.css';

export default function Home() {
  const [demoStep, setDemoStep] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setDemoStep(3);
    }, 2000);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <nav className="nav">
            <div className="logo">
              <HandIcon className="logo-icon" />
              <span>Palm2Pay</span>
            </div>
            <div className="nav-links">
              <a href="#features">Features</a>
              <a href="#security">Security</a>
              <a href="#demo">Demo</a>
            </div>
          </nav>

          <div className="hero-content">
            <div>
              <h1>
                The Future of Payment<br />
                is in Your <span>Palm</span>
              </h1>
              <p>
                Eliminate checkout friction. Pay securely by simply hovering your
                palm over any Palm2Pay terminal. No cards, no phone, no wallet needed.
              </p>
              <div className="hero-buttons">
                <a href="#demo" className="btn btn-primary">See Demo</a>
                <a href="#how-it-works" className="btn btn-secondary">Learn More</a>
              </div>
            </div>
            <div className="hero-illustration">
              <div className="hero-glow"></div>
              <HandScanSVG className="w-80 h-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="features-grid">
            <FeatureCard
              icon={<EyeIcon />}
              title="1. Enroll Your Palm"
              description="Scan your palm using our secure mobile app. Your biometric data is encrypted and stored safely."
            />
            <FeatureCard
              icon={<CardIcon />}
              title="2. Link Payment Method"
              description="Connect your credit card or bank account. Your funds are protected with bank-level security."
            />
            <FeatureCard
              icon={<HandPayIcon />}
              title="3. Pay with Palm"
              description="At checkout, simply hover your palm over the scanner. Payment complete in seconds."
            />
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="security" id="security">
        <div className="container">
          <div className="security-content">
            <ShieldIcon className="security-icon" />
            <h2>Bank-Level Security</h2>
            <p>
              Your biometric data is encrypted end-to-end. We use advanced liveness
              detection to prevent fraud, and your palm template can never be
              reverse-engineered to recreate your hand.
            </p>
            <div className="security-badges">
              <Badge text="PCI-DSS Compliant" />
              <Badge text="End-to-End Encryption" />
              <Badge text="Liveness Detection" />
              <Badge text="Fraud Monitoring" />
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="demo" id="demo">
        <div className="container">
          <h2 className="section-title">Try Palm2Pay Demo</h2>
          <div className="demo-container">
            <div className="demo-box">
              <div className="demo-header">
                <div className="demo-icon">
                  {demoStep === 0 && '👋'}
                  {demoStep === 1 && '💳'}
                  {demoStep === 2 && '🖐️'}
                  {demoStep === 3 && '✅'}
                </div>
                <h3>
                  {demoStep === 0 && "Welcome to Palm2Pay!"}
                  {demoStep === 1 && "Payment Amount"}
                  {demoStep === 2 && "Scan Your Palm"}
                  {demoStep === 3 && "Payment Successful!"}
                </h3>
                <p>
                  {demoStep === 0 && "Click Start to begin the demo"}
                  {demoStep === 1 && "$25.00 for coffee purchase"}
                  {demoStep === 2 && "Position your palm on the scanner"}
                  {demoStep === 3 && "Thank you for your purchase!"}
                </p>
              </div>

              {demoStep === 1 && (
                <div className="demo-amount">$25.00</div>
              )}

              {demoStep === 2 && (
                <div className="demo-scanner">
                  <HandScanSVG />
                  {isScanning && <p className="scanning-text">Scanning...</p>}
                </div>
              )}

              <div className="demo-buttons">
                {demoStep === 0 && (
                  <button className="demo-btn" onClick={() => setDemoStep(1)}>
                    Start Demo
                  </button>
                )}
                {demoStep === 1 && (
                  <button className="demo-btn" onClick={() => setDemoStep(2)}>
                    Continue
                  </button>
                )}
                {demoStep === 2 && (
                  <button
                    className="demo-btn"
                    onClick={handleScan}
                    disabled={isScanning}
                  >
                    {isScanning ? 'Scanning...' : 'Scan Palm'}
                  </button>
                )}
                {demoStep === 3 && (
                  <button className="demo-btn" onClick={() => setDemoStep(0)}>
                    Try Again
                  </button>
                )}
              </div>

              <div className="demo-dots">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`dot ${i === demoStep ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Leave Your Wallet Behind?</h2>
          <p>Join thousands of users who are already paying with their palms.</p>
          <a href="#" className="cta-btn">Create Free Account</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <HandIcon className="logo-icon" />
              <span>Palm2Pay</span>
            </div>
            <div className="footer-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Contact</a>
            </div>
          </div>
          <p className="footer-copyright">© 2026 Palm2Pay. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <div className="badge">
      <CheckIcon />
      <span>{text}</span>
    </div>
  );
}

// Icons
function HandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2a2 2 0 0 1 2 2v6a2 2 0 0 1-4 0V4a2 2 0 0 1 2-2zm-4 4a2 2 0 0 1 2 2v6a2 2 0 0 1-4 0V8a2 2 0 0 1 2-2zm8 0a2 2 0 0 1 2 2v6a2 2 0 0 1-4 0V8a2 2 0 0 1 2-2zm-4 8a4 4 0 0 0-4 4v2a4 4 0 0 0 8 0v-2a4 4 0 0 0-4-4z" />
    </svg>
  );
}

function HandScanSVG({ className }: { className?: string }) {
  return (
    <svg className={className || 'w-32 h-32'} viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="80" stroke="#6366f1" strokeWidth="2" fill="none" />
      <circle cx="100" cy="100" r="60" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 4" fill="none" />
      <path d="M100 40 L100 70 M100 130 L100 160 M40 100 L70 100 M130 100 L160 100" stroke="#6366f1" strokeWidth="2" />
      <ellipse cx="100" cy="100" rx="40" ry="50" fill="#6366f1" opacity="0.2" />
      <path d="M80 80 Q100 60 120 80 Q130 100 120 120 Q100 140 80 120 Q70 100 80 80" stroke="#6366f1" strokeWidth="2" fill="none" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}

function HandPayIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
