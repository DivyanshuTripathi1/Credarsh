import React from "react";

function Footer() {
  return (
    <footer className="footer-wrapper border-top pt-5 pb-4" style={{ backgroundColor: "rgb(250, 250, 250)" }}>
      <div className="container">
        {/* Navigation & Brand Columns */}
        <div className="row g-4 pb-3">
          {/* Brand & Badges */}
          <div className="col-12 col-md-6 col-lg-3 mb-2 mb-md-0">
            <div className="mb-3">
              <img
                src={process.env.PUBLIC_URL + "/media/images/credarsh.png"}
                style={{ width: "175px", height: "auto" }}
                alt="Credarsh Logo"
                className="img-fluid"
              />
            </div>
            <p className="text-muted mb-3" style={{ fontSize: "13px", lineHeight: "1.6" }}>
              &copy; 2010 - 2024, Credarsh Broking Ltd. All rights reserved.
            </p>
            <div className="d-flex flex-wrap align-items-center gap-2 mt-3">
              <img
                src="media/images/appstoreBadge.svg"
                alt="App Store"
                style={{ height: "34px", width: "auto" }}
              />
              <img
                src="media/images/googlePlayBadge.svg"
                alt="Google Play"
                style={{ height: "34px", width: "auto" }}
              />
            </div>
          </div>

          {/* Company */}
          <div className="col-6 col-md-6 col-lg-3">
            <h6 className="fw-semibold text-dark mb-3">Company</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><a href="" className="footer-link">About</a></li>
              <li className="mb-2"><a href="" className="footer-link">Products</a></li>
              <li className="mb-2"><a href="" className="footer-link">Pricing</a></li>
              <li className="mb-2"><a href="" className="footer-link">Referral programme</a></li>
              <li className="mb-2"><a href="" className="footer-link">Careers</a></li>
              <li className="mb-2"><a href="" className="footer-link">Credarsh.tech</a></li>
              <li className="mb-2"><a href="" className="footer-link">Press &amp; media</a></li>
              <li className="mb-2"><a href="" className="footer-link">Credarsh cares (CSR)</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-6 col-md-6 col-lg-3">
            <h6 className="fw-semibold text-dark mb-3">Support</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><a href="" className="footer-link">Contact</a></li>
              <li className="mb-2"><a href="" className="footer-link">Support portal</a></li>
              <li className="mb-2"><a href="" className="footer-link">Z-Connect blog</a></li>
              <li className="mb-2"><a href="" className="footer-link">List of charges</a></li>
              <li className="mb-2"><a href="" className="footer-link">Downloads &amp; resources</a></li>
            </ul>
          </div>

          {/* Account */}
          <div className="col-6 col-md-6 col-lg-3">
            <h6 className="fw-semibold text-dark mb-3">Account</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><a href="" className="footer-link">Open an account</a></li>
              <li className="mb-2"><a href="" className="footer-link">Fund transfer</a></li>
              <li className="mb-2"><a href="" className="footer-link">60 day challenge</a></li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Disclaimer Section */}
        <div
          className="pt-4 text-muted"
          style={{ fontSize: "13px", lineHeight: "1.7" }}
        >
          <p className="mb-3">
            Credarsh Broking Ltd.: Member of NSE​ &amp;​ BSE – SEBI Registration no.:
            INZ000031633 CDSL: Depository services through Credarsh Securities
            Pvt. Ltd. – SEBI Registration no.: IN-DP-100-2015 Commodity Trading
            through Credarsh Commodities Pvt. Ltd. MCX: 46025 – SEBI Registration
            no.: INZ000038238 Registered Address: Credarsh Broking Ltd.,
            #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School,
            J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any
            complaints pertaining to securities broking please write to
            complaints@credarsh.com, for DP related to dp@credarsh.com. Please
            ensure you carefully read the Risk Disclosure Document as prescribed
            by SEBI | ICF 
          </p>

          <p className="mb-3">
            Procedure to file a complaint on SEBI SCORES: Register on SCORES
            portal. Mandatory details for filing complaints on SCORES: Name,
            PAN, Address, Mobile Number, E-mail ID. Benefits: Effective
            Communication, Speedy redressal of the grievances
          </p>

          <p className="mb-3">
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>

          <p className="mb-0">
            "Prevent unauthorised transactions in your account. Update your
            mobile numbers/email IDs with your stock brokers. Receive
            information of your transactions directly from Exchange on your
            mobile/email at the end of the day. Issued in the interest of
            investors. KYC is one time exercise while dealing in securities
            markets - once KYC is done through a SEBI registered intermediary
            (broker, DP, Mutual Fund etc.), you need not undergo the same
            process again when you approach another intermediary." Dear
            Investor, if you are subscribing to an IPO, there is no need to
            issue a cheque. Please write the Bank account number and sign the
            IPO application form to authorize your bank to make payment in case
            of allotment. In case of non allotment the funds will remain in your
            bank account. As a business we don't give stock tips, and have not
            authorized anyone to trade on behalf of others. If you find anyone
            claiming to be part of Credarsh and offering such services, please
            contact our support desk.
          </p>
        </div>

        {/* Bottom Legal / Exchange Links */}
        <div className="mt-4 pt-2">
          <ul className="d-flex flex-wrap justify-content-center align-items-center gap-3 gap-md-4 list-unstyled mb-0 px-2">
            <li>
              <a href="https://nseindia.com" className="footer-bottom-link">
                NSE
              </a>
            </li>
            <li>
              <a href="https://www.bseindia.com/" className="footer-bottom-link">
                BSE
              </a>
            </li>
            <li>
              <a href="https://www.mcxindia.com/" className="footer-bottom-link">
                MCX
              </a>
            </li>
            <li>
              <a href="https://mseindia.com/" className="footer-bottom-link">
                MSEI
              </a>
            </li>
            <li>
              <a href="https://credarsh.com/terms-and-conditions/" className="footer-bottom-link">
                Terms &amp; conditions
              </a>
            </li>
            <li>
              <a href="https://credarsh.com/policies-and-procedures/" className="footer-bottom-link">
                Policies &amp; procedures
              </a>
            </li>
            <li>
              <a href="https://credarsh.com/privacy-policy/" className="footer-bottom-link">
                Privacy policy
              </a>
            </li>
            <li>
              <a href="https://credarsh.com/disclosure/" className="footer-bottom-link">
                Disclosure
              </a>
            </li>
            <li>
              <a href="https://credarsh.com/investor-attention/" className="footer-bottom-link">
                For investor's attention
              </a>
            </li>
            <li>
              <a href="https://credarsh.com/tos/investor-charter/" className="footer-bottom-link">
                Investor charter
              </a>
            </li>
            <li>
              <a href="https://credarsh.com/sitemap/" className="footer-bottom-link">
                Sitemap
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;