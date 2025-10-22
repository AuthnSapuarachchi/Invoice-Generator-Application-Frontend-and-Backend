import React from "react";
import "./LandingPage.css";
import {assets} from "../../assets/assets.js";
import Logo from "../../components/Logo.jsx";
import {Facebook, Linkedin, Twitter} from "lucide-react";

const LandingPage = () => {


  return (
    <div className="landing-page-bg">
      <header className="container py-5">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-8 col-md-10 text-center">
            <h1 className="display-4 fw-bold mb-4 text-primary">
              Effortless Invoicing, Instant Payments
            </h1>
            <p className="lead mb-4 text-secondary">
              Stop wasting time on paperwork. Create and send professional invoices
              in minutes with Quick Invoice.
            </p>
            <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
              {/* Primary call to Action  */}
              <button className="btn btn-primary btn-lg px-4 py-2">
                Generate Your First Invoice
              </button>
              {/* Secondary call to action */}
              <button className="btn btn-outline-secondary btn-lg px-4 py-2">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </header>

        {/* Steps to generate invoice */}
      <section className="steps-section py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Get Started in 4 Simple Steps</h2>
          <div className="row g-4 justify-content-center">
            {/* Step 1 Card */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 text-center shadow-sm step-card" data-aos="fade-up">
                <div className="card-body">
                  <img
                    src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-invoice-finance-flaticons-lineal-color-flat-icons.png"
                    className="rounded-circle mb-3 step-icon"
                    alt="Enter Invoice Details"
                  />
                  <h5 className="card-title">Enter Details</h5>
                  <p className="card-text">
                    Quickly input your client information, services, and payment terms into our user-friendly form.
                  </p>
                </div>
              </div>
            </div>
            {/* Step 2 Card */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 text-center shadow-sm step-card" data-aos="fade-up">
                <div className="card-body">
                  <img
                    src="https://img.icons8.com/color/64/000000/preview-pane.png"
                    className="rounded-circle mb-3 step-icon"
                    alt="Preview Invoice"
                  />
                  <h5 className="card-title">Preview Invoice</h5>
                  <p className="card-text">
                    Instantly preview your invoice before sending to ensure accuracy and professionalism.
                  </p>
                </div>
              </div>
            </div>
            {/* Step 3 Card */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 text-center shadow-sm step-card" data-aos="fade-up">
                <div className="card-body">
                  <img
                    src="https://img.icons8.com/color/64/000000/send-mass-email.png"
                    className="rounded-circle mb-3 step-icon"
                    alt="Send Invoice"
                  />
                  <h5 className="card-title">Choose Template</h5>
                    <p className="card-text">
                        Pick a professional invoice template and customize it quickly to match your brand’s style.
                    </p>
                </div>
              </div>
            </div>
            {/* Step 4 Card */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 text-center shadow-sm step-card" data-aos="fade-up">
                <div className="card-body">
                  <img
                    src="https://img.icons8.com/color/64/000000/money-bag-euro.png"
                    className="rounded-circle mb-3 step-icon"
                    alt="Get Paid"
                  />
                  <h5 className="card-title">Download & Save</h5>
                    <p className="card-text">
                        Instantly download your invoice as a secure PDF and save it for easy access and record-keeping.
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        {/* Features Section */}
        <section className="features-section py-5 bg-primary">
            <div className="container">
                <h2 className="text-center mb-5 fw-bold text-white">Why Choose Quick Invoice?</h2>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">

                    {/* Feature 1 */}
                    <div className="col">
                        <div className="feature-card p-4 bg-white rounded shadow-sm h-100 text-center">
                            <img
                                src={assets.template01}
                                alt="Secure Payments"
                                className="mb-3"
                                style={{ width: '70px', height: '70px', objectFit: 'contain' }}
                            />
                            <h5 className="fw-bold mb-2">Secure & Fast Payments</h5>
                            <p className="text-muted mb-3">
                                Enjoy safe, PCI-compliant payment options for quick and secure transactions.
                            </p>
                            <ul className="list-unstyled text-primary" style={{ textAlign: 'left', paddingLeft: '1.25rem' }}>
                                <li>✅ PCI DSS Certified</li>
                                <li>✅ Instant Payment Notifications</li>
                                <li>✅ Multi-Currency Support</li>
                            </ul>

                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="col">
                        <div className="feature-card p-4 bg-white rounded shadow-sm h-100 text-center">
                            <img
                                src={assets.template01}
                                alt="Automation"
                                className="mb-3"
                                style={{ width: '70px', height: '70px', objectFit: 'contain' }}
                            />
                            <h5 className="fw-bold mb-2">Automated Invoicing</h5>
                            <p className="text-muted mb-3">
                                Streamline billing with powerful automation for schedules and reminders.
                            </p>
                            <ul className="list-unstyled text-primary" style={{ textAlign: 'left', paddingLeft: '1.25rem' }}>
                                <li>✅ Auto Invoice Generation</li>
                                <li>✅ Custom Payment Reminders</li>
                                <li>✅ Recurring Billing Support</li>
                            </ul>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="col">
                        <div className="feature-card p-4 bg-white rounded shadow-sm h-100 text-center">
                            <img
                                src={assets.template01}
                                alt="Customizable Templates"
                                className="mb-3"
                                style={{ width: '70px', height: '70px', objectFit: 'contain' }}
                            />
                            <h5 className="fw-bold mb-2">Customizable Templates</h5>
                            <p className="text-muted mb-3">
                                Personalized templates that reflect your unique brand identity effortlessly.
                            </p>
                            <ul className="list-unstyled text-primary" style={{ textAlign: 'left', paddingLeft: '1.25rem' }}>
                                <li>✅ Brand Colors & Logos</li>
                                <li>✅ Flexible Layout Options</li>
                                <li>✅ Multiple Template Styles</li>
                            </ul>
                        </div>
                    </div>

                    {/* Feature 4 */}
                    <div className="col">
                        <div className="feature-card p-4 bg-white rounded shadow-sm h-100 text-center">
                            <img
                                src={assets.template01}
                                alt="Real-Time Tracking"
                                className="mb-3"
                                style={{ width: '70px', height: '70px', objectFit: 'contain' }}
                            />
                            <h5 className="fw-bold mb-2">Real-Time Tracking</h5>
                            <p className="text-muted mb-3">
                                Always stay updated quickly with live statuses on invoicing and payments.
                            </p>
                            <ul className="list-unstyled text-primary" style={{ textAlign: 'left', paddingLeft: '1.25rem' }}>
                                <li>✅ Dashboard Analytics</li>
                                <li>✅ Payment Status Alerts</li>
                                <li>✅ Comprehensive Reporting</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* Call to Action Section */}
        <section className="cta-section py-5 bg-light">
            <div className="container text-center">
                <h2 className="fw-bold mb-3">Ready to Streamline Your Invoicing?</h2>
                <p className="mb-4 lead text-secondary">Join thousands of businesses using Quick Invoice to save time and get paid faster. Start your free trial today!</p>
                <button className="btn btn-primary btn-lg px-5 py-3 shadow-sm">
                    Start Generating Invoices Now
                </button>
                <p className="mt-3 text-muted fst-italic" style={{ fontSize: '0.9rem' }}>
                    (This will lead you to the invoice generation page)
                </p>
            </div>
        </section>

        <footer className="bg-dark text-white-50 py-5">
            <div className="container text-center text-md-start">
                {/* Logo and Brand */}
                <div className="mb-4">
                    <Logo />
                </div>

                {/* Copyright */}
                <p className="mb-2 small">&copy; {new Date().getFullYear()} QuickInvoice. All rights reserved.</p>

                {/* Crafted By */}
                <p className="mb-3 small">
                    Crafted with <span style={{ color: 'red' }}>&hearts;</span> by{' '}
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white-50 text-decoration-underline"
                    >
                        Your Name or Company
                    </a>
                </p>

                {/* Links */}
                <nav className="d-flex justify-content-center justify-content-md-start align-items-center flex-wrap gap-3">
                    <a href="/privacy-policy" className="text-white-50 text-decoration-none">
                        Privacy Policy
                    </a>
                    <span className="text-white-50">|</span>
                    <a href="/terms-of-service" className="text-white-50 text-decoration-none">
                        Terms of Service
                    </a>

                    {/* Social Icons */}
                    <a href="/contact" className="text-white-50 text-decoration-none ms-md-4" aria-label="Twitter">
                        <Twitter />
                    </a>
                    <a href="/contact" className="text-white-50 text-decoration-none ms-3" aria-label="Facebook">
                        <Facebook />
                    </a>
                    <a href="/contact" className="text-white-50 text-decoration-none ms-3" aria-label="LinkedIn">
                        <Linkedin />
                    </a>
                </nav>
            </div>
        </footer>






    </div>
  );
};

export default LandingPage;
