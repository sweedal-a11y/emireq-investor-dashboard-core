import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ReviewPage.css';
import backgroundImg from '../../assets/background-login.png';
import emireqLogo from '../../assets/emireq-logo.png';

export default function ReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData || {};
  
  const [expandedSections, setExpandedSections] = useState({
    personalInfo: true,
    contactInfo: false,
    investorType: false,
    shariahCompliance: false,
    investorMission: false,
    investmentStages: false,
    sectorInterests: false,
    documents: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleEdit = (step) => {
    navigate('/register', { state: { formData, currentStep: step } });
  };

  const handleSubmit = () => {
    // Submit the registration
    localStorage.setItem('authToken', 'mock-token-12345');
    localStorage.setItem('registrationComplete', 'true');
    navigate('/');
  };

  const getSectorNames = (sectors) => {
    const sectorMap = {
      'fintech': 'Fintech',
      'healthtech': 'HealthTech',
      'proptech': 'PropTech',
      'edtech': 'EdTech',
      'ecommerce': 'E-commerce',
      'saas': 'SaaS',
      'ai-ml': 'AI/ML',
      'blockchain': 'Blockchain',
      'cleantech': 'CleanTech',
      'agritech': 'AgriTech',
      'logistics': 'Logistics',
      'cybersecurity': 'Cybersecurity'
    };
    return sectors.map(s => sectorMap[s] || s).join(', ');
  };

  const getInvestorTypeName = (type) => {
    const typeMap = {
      'individual': 'Individual Investor',
      'angel': 'Angel Investor',
      'venture-capital': 'Venture Capital',
      'corporate': 'Corporate Investor',
      'family-office': 'Family Office',
      'institutional': 'Institutional Investor'
    };
    return typeMap[type] || type;
  };

  const getGoalsNames = (goals) => {
    const goalsMap = {
      'long-term-wealth': 'Build Long-term ethical wealth',
      'support-startups': 'Support startups & technology ventures',
      'diversify-assets': 'Diversify with real estate and tokenized assets',
      'islamic-finance': 'Drive Islamic Finance projects',
      'balanced-portfolio': 'Create a balanced halal portfolio'
    };
    return goals.map(g => goalsMap[g] || g).join(', ');
  };

  const getTimeHorizonName = (horizon) => {
    const horizonMap = {
      'short-term': 'Short-term (1-3 years)',
      'medium-term': 'Medium-term (3-7 years)',
      'long-term': 'Long-term (7+ years)'
    };
    return horizonMap[horizon] || horizon;
  };

  const getStagesNames = (stages) => {
    const stagesMap = {
      'pre-seed': 'Pre-Seed',
      'seed': 'Seed',
      'series-a': 'Series A',
      'series-b': 'Series B',
      'series-c': 'Series C+',
      'growth': 'Growth Stage',
      'pre-ipo': 'Pre-IPO',
      'other': 'Other'
    };
    return stages.map(s => stagesMap[s] || s).join(', ');
  };

  return (
    <div className="review-container">
      <div className="review-left" style={{ backgroundImage: `url(${backgroundImg})` }}>
        <div className="review-left-header">
          <img src={emireqLogo} alt="Emireq" className="review-logo" />
          <div className="review-language">
            <span>English(UK)</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="review-left-content">
          <div className="review-trust-badge">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_68_12726)">
                <path d="M8.28086 12.9167C8.20647 12.6283 8.05615 12.3651 7.84555 12.1545C7.63494 11.9439 7.37176 11.7935 7.08336 11.7192L1.97086 10.4008C1.88364 10.3761 1.80687 10.3235 1.75221 10.2512C1.69754 10.1788 1.66797 10.0907 1.66797 9.99998C1.66797 9.90931 1.69754 9.82112 1.75221 9.74878C1.80687 9.67644 1.88364 9.62391 1.97086 9.59915L7.08336 8.27998C7.37166 8.20566 7.63477 8.05546 7.84537 7.84502C8.05596 7.63457 8.20634 7.37156 8.28086 7.08332L9.5992 1.97082C9.6237 1.88325 9.67618 1.8061 9.74863 1.75115C9.82108 1.69619 9.90951 1.66644 10.0004 1.66644C10.0914 1.66644 10.1798 1.69619 10.2523 1.75115C10.3247 1.8061 10.3772 1.88325 10.4017 1.97082L11.7192 7.08332C11.7936 7.37171 11.9439 7.6349 12.1545 7.8455C12.3651 8.0561 12.6283 8.20642 12.9167 8.28082L18.0292 9.59832C18.1171 9.62257 18.1946 9.67499 18.2499 9.74755C18.3052 9.8201 18.3351 9.90878 18.3351 9.99998C18.3351 10.0912 18.3052 10.1799 18.2499 10.2524C18.1946 10.325 18.1171 10.3774 18.0292 10.4017L12.9167 11.7192C12.6283 11.7935 12.3651 11.9439 12.1545 12.1545C11.9439 12.3651 11.7936 12.6283 11.7192 12.9167L10.4009 18.0292C10.3764 18.1167 10.3239 18.1939 10.2514 18.2488C10.179 18.3038 10.0905 18.3335 9.99961 18.3335C9.90868 18.3335 9.82025 18.3038 9.7478 18.2488C9.67535 18.1939 9.62287 18.1167 9.59836 18.0292L8.28086 12.9167Z" stroke="#FFC300" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.666 2.5V5.83333" stroke="#FFC300" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.3333 4.16669H15" stroke="#FFC300" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.33398 14.1667V15.8334" stroke="#FFC300" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.16667 15H2.5" stroke="#FFC300" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_68_12726">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <span>Trusted by 50,000+ users worldwide</span>
          </div>
          <h1 className="review-left-title">Get Access to Your Investor Profile and Unlock Exclusive Deals.</h1>
        </div>
      </div>

      <div className="review-right">
        <div className="review-header">
          <img src={emireqLogo} alt="Emireq" className="review-header-logo" />
        </div>

        <div className="review-content">
          <div className="review-icon">
            <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_dd_68_13461)">
                <path d="M12 18C12 9.16344 19.1634 2 28 2H60C68.8366 2 76 9.16344 76 18V50C76 58.8366 68.8366 66 60 66H28C19.1634 66 12 58.8366 12 50V18Z" fill="url(#paint0_linear_68_13461)" shapeRendering="crispEdges"/>
                <path d="M41.2486 38.6667C41.1296 38.2052 40.8891 37.7841 40.5521 37.4472C40.2151 37.1102 39.794 36.8697 39.3326 36.7507L31.1526 34.6413C31.013 34.6017 30.8902 34.5177 30.8028 34.4019C30.7153 34.2862 30.668 34.1451 30.668 34C30.668 33.8549 30.7153 33.7138 30.8028 33.5981C30.8902 33.4823 31.013 33.3983 31.1526 33.3587L39.3326 31.248C39.7939 31.1291 40.2149 30.8888 40.5518 30.5521C40.8888 30.2153 41.1294 29.7945 41.2486 29.3333L43.3579 21.1533C43.3971 21.0132 43.4811 20.8898 43.597 20.8019C43.7129 20.7139 43.8544 20.6663 43.9999 20.6663C44.1454 20.6663 44.2869 20.7139 44.4028 20.8019C44.5188 20.8898 44.6027 21.0132 44.6419 21.1533L46.7499 29.3333C46.869 29.7948 47.1095 30.2159 47.4464 30.5528C47.7834 30.8898 48.2045 31.1303 48.6659 31.2493L56.8459 33.3573C56.9866 33.3961 57.1107 33.48 57.1991 33.5961C57.2875 33.7122 57.3353 33.8541 57.3353 34C57.3353 34.1459 57.2875 34.2878 57.1991 34.4039C57.1107 34.52 56.9866 34.6039 56.8459 34.6427L48.6659 36.7507C48.2045 36.8697 47.7834 37.1102 47.4464 37.4472C47.1095 37.7841 46.869 38.2052 46.7499 38.6667L44.6406 46.8467C44.6014 46.9868 44.5174 47.1102 44.4015 47.1981C44.2856 47.2861 44.1441 47.3337 43.9986 47.3337C43.8531 47.3337 43.7116 47.2861 43.5957 47.1981C43.4798 47.1102 43.3958 46.9868 43.3566 46.8467L41.2486 38.6667Z" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M54.666 22V27.3333" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M57.3333 24.6667H52" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M33.334 40.6667V43.3333" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M34.6667 42H32" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <filter id="filter0_dd_68_13461" x="0" y="0" width="88" height="88" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feMorphology radius="4" operator="erode" in="SourceAlpha" result="effect1_dropShadow_68_13461"/>
                  <feOffset dy="4"/>
                  <feGaussianBlur stdDeviation="3"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0.854405 0 0 0 0 0.697794 0 0 0 0 1 0 0 0 1 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_68_13461"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feMorphology radius="3" operator="erode" in="SourceAlpha" result="effect2_dropShadow_68_13461"/>
                  <feOffset dy="10"/>
                  <feGaussianBlur stdDeviation="7.5"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0.854405 0 0 0 0 0.697794 0 0 0 0 1 0 0 0 1 0"/>
                  <feBlend mode="normal" in2="effect1_dropShadow_68_13461" result="effect2_dropShadow_68_13461"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_68_13461" result="shape"/>
                </filter>
                <linearGradient id="paint0_linear_68_13461" x1="12" y1="2" x2="76" y2="66" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9810FA"/>
                  <stop offset="1" stopColor="#155DFC"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 className="review-title">Review & Confirm</h2>
          <p className="review-subtitle">Almost there! Review your information and submit your application</p>

          <div className="review-sections">
            {/* Personal Information */}
            <div className={`review-section ${expandedSections.personalInfo ? 'expanded' : ''}`}>
              <div className="review-section-header" onClick={() => toggleSection('personalInfo')}>
                <div className="review-section-left">
                  <div className="review-section-icon blue">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 10C12.0711 10 13.75 8.32107 13.75 6.25C13.75 4.17893 12.0711 2.5 10 2.5C7.92893 2.5 6.25 4.17893 6.25 6.25C6.25 8.32107 7.92893 10 10 10Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17.0834 17.5C17.0834 14.2783 13.866 11.6667 10 11.6667C6.13403 11.6667 2.91669 14.2783 2.91669 17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="review-section-info">
                    <h3 className="review-section-title">Personal Information</h3>
                    <p className="review-section-subtitle">Information</p>
                  </div>
                </div>
                <div className="review-section-actions">
                  <button className="review-edit-btn" onClick={(e) => { e.stopPropagation(); handleEdit(1); }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.3334 2.00004C11.5085 1.82494 11.7163 1.68605 11.9451 1.59129C12.1739 1.49653 12.4191 1.44775 12.6667 1.44775C12.9143 1.44775 13.1595 1.49653 13.3883 1.59129C13.6171 1.68605 13.8249 1.82494 14 2.00004C14.1751 2.17513 14.314 2.38289 14.4088 2.61169C14.5036 2.84049 14.5523 3.08571 14.5523 3.33337C14.5523 3.58104 14.5036 3.82626 14.4088 4.05506C14.314 4.28386 14.1751 4.49161 14 4.66671L5.00004 13.6667L1.33337 14.6667L2.33337 11L11.3334 2.00004Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Edit
                  </button>
                  <svg className={`review-chevron ${expandedSections.personalInfo ? 'up' : ''}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {expandedSections.personalInfo && (
                <div className="review-section-content">
                  <div className="review-field">
                    <span className="review-field-label">Full Name</span>
                    <span className="review-field-value">{formData.fullName || 'Not provided'}</span>
                  </div>
                  <div className="review-field">
                    <span className="review-field-label">Country</span>
                    <span className="review-field-value">{formData.country || 'Not provided'}</span>
                  </div>
                  <div className="review-field">
                    <span className="review-field-label">Email</span>
                    <span className="review-field-value">{formData.email || 'Not provided'}</span>
                  </div>
                  <div className="review-field">
                    <span className="review-field-label">Phone</span>
                    <span className="review-field-value">{formData.phoneNumber || 'Not provided'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Investor Type */}
            <div className={`review-section ${expandedSections.investorType ? 'expanded' : ''}`}>
              <div className="review-section-header" onClick={() => toggleSection('investorType')}>
                <div className="review-section-left">
                  <div className="review-section-icon purple">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 12.5C13.1066 12.5 15.625 9.98165 15.625 6.875C15.625 3.76835 13.1066 1.25 10 1.25C6.89341 1.25 4.375 3.76835 4.375 6.875C4.375 9.98165 6.89341 12.5 10 12.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1.25 18.75L2.5 15L5 16.25L6.25 12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18.75 18.75L17.5 15L15 16.25L13.75 12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="review-section-info">
                    <h3 className="review-section-title">Investor Type</h3>
                    <p className="review-section-subtitle">Step 3</p>
                  </div>
                </div>
                <div className="review-section-actions">
                  <button className="review-edit-btn" onClick={(e) => { e.stopPropagation(); handleEdit(3); }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.3334 2.00004C11.5085 1.82494 11.7163 1.68605 11.9451 1.59129C12.1739 1.49653 12.4191 1.44775 12.6667 1.44775C12.9143 1.44775 13.1595 1.49653 13.3883 1.59129C13.6171 1.68605 13.8249 1.82494 14 2.00004C14.1751 2.17513 14.314 2.38289 14.4088 2.61169C14.5036 2.84049 14.5523 3.08571 14.5523 3.33337C14.5523 3.58104 14.5036 3.82626 14.4088 4.05506C14.314 4.28386 14.1751 4.49161 14 4.66671L5.00004 13.6667L1.33337 14.6667L2.33337 11L11.3334 2.00004Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Edit
                  </button>
                  <svg className={`review-chevron ${expandedSections.investorType ? 'up' : ''}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {expandedSections.investorType && (
                <div className="review-section-content">
                  <div className="review-field">
                    <span className="review-field-label">Investor Type</span>
                    <span className="review-field-value">{getInvestorTypeName(formData.investorType) || 'Not provided'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Shariah Compliance */}
            <div className={`review-section ${expandedSections.shariahCompliance ? 'expanded' : ''}`}>
              <div className="review-section-header green" onClick={() => toggleSection('shariahCompliance')}>
                <div className="review-section-left">
                  <div className="review-section-icon green">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.6667 10.8333C16.6667 15 13.75 17.0833 10.2833 18.2917C10.1018 18.3532 9.90459 18.3502 9.725 18.2833C6.25 17.0833 3.33337 15 3.33337 10.8333V5C3.33337 4.77899 3.42117 4.56703 3.57745 4.41075C3.73373 4.25447 3.94569 4.16667 4.16671 4.16667C5.83337 4.16667 7.91671 3.16667 9.36671 1.9C9.54327 1.74917 9.76784 1.66629 10 1.66629C10.2322 1.66629 10.4568 1.74917 10.6334 1.9C12.0917 3.175 14.1667 4.16667 15.8334 4.16667C16.0544 4.16667 16.2663 4.25447 16.4226 4.41075C16.5789 4.56703 16.6667 4.77899 16.6667 5V10.8333Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="review-section-info">
                    <h3 className="review-section-title">Shariah Compliance</h3>
                    <p className="review-section-subtitle">Step 4</p>
                  </div>
                </div>
                <div className="review-section-actions">
                  <button className="review-edit-btn green" onClick={(e) => { e.stopPropagation(); handleEdit(4); }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.3334 2.00004C11.5085 1.82494 11.7163 1.68605 11.9451 1.59129C12.1739 1.49653 12.4191 1.44775 12.6667 1.44775C12.9143 1.44775 13.1595 1.49653 13.3883 1.59129C13.6171 1.68605 13.8249 1.82494 14 2.00004C14.1751 2.17513 14.314 2.38289 14.4088 2.61169C14.5036 2.84049 14.5523 3.08571 14.5523 3.33337C14.5523 3.58104 14.5036 3.82626 14.4088 4.05506C14.314 4.28386 14.1751 4.49161 14 4.66671L5.00004 13.6667L1.33337 14.6667L2.33337 11L11.3334 2.00004Z" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Edit
                  </button>
                  <svg className={`review-chevron green ${expandedSections.shariahCompliance ? 'up' : ''}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {expandedSections.shariahCompliance && (
                <div className="review-section-content">
                  <div className="review-field">
                    <span className="review-field-label">Shariah Compliance</span>
                    <span className="review-field-value">{formData.shariahCompliance ? 'Checked' : 'Not checked'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Investor Mission */}
            <div className={`review-section ${expandedSections.investorMission ? 'expanded' : ''}`}>
              <div className="review-section-header" onClick={() => toggleSection('investorMission')}>
                <div className="review-section-left">
                  <div className="review-section-icon orange">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 6.25V10L12.5 11.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="review-section-info">
                    <h3 className="review-section-title">Investor Mission</h3>
                    <p className="review-section-subtitle">Step 5</p>
                  </div>
                </div>
                <div className="review-section-actions">
                  <button className="review-edit-btn" onClick={(e) => { e.stopPropagation(); handleEdit(5); }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.3334 2.00004C11.5085 1.82494 11.7163 1.68605 11.9451 1.59129C12.1739 1.49653 12.4191 1.44775 12.6667 1.44775C12.9143 1.44775 13.1595 1.49653 13.3883 1.59129C13.6171 1.68605 13.8249 1.82494 14 2.00004C14.1751 2.17513 14.314 2.38289 14.4088 2.61169C14.5036 2.84049 14.5523 3.08571 14.5523 3.33337C14.5523 3.58104 14.5036 3.82626 14.4088 4.05506C14.314 4.28386 14.1751 4.49161 14 4.66671L5.00004 13.6667L1.33337 14.6667L2.33337 11L11.3334 2.00004Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Edit
                  </button>
                  <svg className={`review-chevron ${expandedSections.investorMission ? 'up' : ''}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {expandedSections.investorMission && (
                <div className="review-section-content">
                  <div className="review-field">
                    <span className="review-field-label">Primary Investment Goals</span>
                    <span className="review-field-value">{formData.primaryInvestmentGoals?.length > 0 ? getGoalsNames(formData.primaryInvestmentGoals) : 'Not provided'}</span>
                  </div>
                  <div className="review-field">
                    <span className="review-field-label">Investment Time Horizon</span>
                    <span className="review-field-value">{getTimeHorizonName(formData.investmentTimeHorizon) || 'Not provided'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Investment Stages */}
            <div className={`review-section ${expandedSections.investmentStages ? 'expanded' : ''}`}>
              <div className="review-section-header" onClick={() => toggleSection('investmentStages')}>
                <div className="review-section-left">
                  <div className="review-section-icon indigo">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 7.5L10 2.5L17.5 7.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V7.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7.5 17.5V10H12.5V17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="review-section-info">
                    <h3 className="review-section-title">Investment Stages</h3>
                    <p className="review-section-subtitle">Step 6</p>
                  </div>
                </div>
                <div className="review-section-actions">
                  <button className="review-edit-btn" onClick={(e) => { e.stopPropagation(); handleEdit(6); }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.3334 2.00004C11.5085 1.82494 11.7163 1.68605 11.9451 1.59129C12.1739 1.49653 12.4191 1.44775 12.6667 1.44775C12.9143 1.44775 13.1595 1.49653 13.3883 1.59129C13.6171 1.68605 13.8249 1.82494 14 2.00004C14.1751 2.17513 14.314 2.38289 14.4088 2.61169C14.5036 2.84049 14.5523 3.08571 14.5523 3.33337C14.5523 3.58104 14.5036 3.82626 14.4088 4.05506C14.314 4.28386 14.1751 4.49161 14 4.66671L5.00004 13.6667L1.33337 14.6667L2.33337 11L11.3334 2.00004Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Edit
                  </button>
                  <svg className={`review-chevron ${expandedSections.investmentStages ? 'up' : ''}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {expandedSections.investmentStages && (
                <div className="review-section-content">
                  <div className="review-field">
                    <span className="review-field-label">Investment Stages</span>
                    <span className="review-field-value">{formData.investmentStages?.length > 0 ? getStagesNames(formData.investmentStages) : 'Not provided'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Sector Interests */}
            <div className={`review-section ${expandedSections.sectorInterests ? 'expanded' : ''}`}>
              <div className="review-section-header" onClick={() => toggleSection('sectorInterests')}>
                <div className="review-section-left">
                  <div className="review-section-icon pink">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1.66667 10H18.3333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 1.66667C12.0844 3.94863 13.269 6.91003 13.3333 10C13.269 13.09 12.0844 16.0514 10 18.3333C7.91558 16.0514 6.73104 13.09 6.66667 10C6.73104 6.91003 7.91558 3.94863 10 1.66667Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="review-section-info">
                    <h3 className="review-section-title">Sector Interests</h3>
                    <p className="review-section-subtitle">Step 7</p>
                  </div>
                </div>
                <div className="review-section-actions">
                  <button className="review-edit-btn" onClick={(e) => { e.stopPropagation(); handleEdit(7); }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.3334 2.00004C11.5085 1.82494 11.7163 1.68605 11.9451 1.59129C12.1739 1.49653 12.4191 1.44775 12.6667 1.44775C12.9143 1.44775 13.1595 1.49653 13.3883 1.59129C13.6171 1.68605 13.8249 1.82494 14 2.00004C14.1751 2.17513 14.314 2.38289 14.4088 2.61169C14.5036 2.84049 14.5523 3.08571 14.5523 3.33337C14.5523 3.58104 14.5036 3.82626 14.4088 4.05506C14.314 4.28386 14.1751 4.49161 14 4.66671L5.00004 13.6667L1.33337 14.6667L2.33337 11L11.3334 2.00004Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Edit
                  </button>
                  <svg className={`review-chevron ${expandedSections.sectorInterests ? 'up' : ''}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {expandedSections.sectorInterests && (
                <div className="review-section-content">
                  <div className="review-field">
                    <span className="review-field-label">Sector Interests</span>
                    <span className="review-field-value">{formData.sectorInterests?.length > 0 ? getSectorNames(formData.sectorInterests) : 'Not provided'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Documents */}
            <div className={`review-section ${expandedSections.documents ? 'expanded' : ''}`}>
              <div className="review-section-header" onClick={() => toggleSection('documents')}>
                <div className="review-section-left">
                  <div className="review-section-icon teal">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6667 1.66667H5C4.55797 1.66667 4.13405 1.84227 3.82149 2.15483C3.50893 2.46739 3.33333 2.89131 3.33333 3.33334V16.6667C3.33333 17.1087 3.50893 17.5326 3.82149 17.8452C4.13405 18.1577 4.55797 18.3333 5 18.3333H15C15.442 18.3333 15.8659 18.1577 16.1785 17.8452C16.4911 17.5326 16.6667 17.1087 16.6667 16.6667V6.66667L11.6667 1.66667Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11.6667 1.66667V6.66667H16.6667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13.3333 10.8333H6.66667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13.3333 14.1667H6.66667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8.33333 7.5H7.5H6.66667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="review-section-info">
                    <h3 className="review-section-title">Documents</h3>
                    <p className="review-section-subtitle">Step 8</p>
                  </div>
                </div>
                <div className="review-section-actions">
                  <button className="review-edit-btn" onClick={(e) => { e.stopPropagation(); handleEdit(8); }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.3334 2.00004C11.5085 1.82494 11.7163 1.68605 11.9451 1.59129C12.1739 1.49653 12.4191 1.44775 12.6667 1.44775C12.9143 1.44775 13.1595 1.49653 13.3883 1.59129C13.6171 1.68605 13.8249 1.82494 14 2.00004C14.1751 2.17513 14.314 2.38289 14.4088 2.61169C14.5036 2.84049 14.5523 3.08571 14.5523 3.33337C14.5523 3.58104 14.5036 3.82626 14.4088 4.05506C14.314 4.28386 14.1751 4.49161 14 4.66671L5.00004 13.6667L1.33337 14.6667L2.33337 11L11.3334 2.00004Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Edit
                  </button>
                  <svg className={`review-chevron ${expandedSections.documents ? 'up' : ''}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {expandedSections.documents && (
                <div className="review-section-content">
                  <div className="review-field">
                    <span className="review-field-label">Government ID</span>
                    <span className="review-field-value">{formData.governmentId?.name || 'Not uploaded'}</span>
                  </div>
                  <div className="review-field">
                    <span className="review-field-label">Accreditation Document</span>
                    <span className="review-field-value">{formData.accreditationDoc?.name || 'Not uploaded'}</span>
                  </div>
                  <div className="review-field">
                    <span className="review-field-label">Proof of Funds</span>
                    <span className="review-field-value">{formData.proofOfFunds?.name || 'Not uploaded'}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button className="review-submit-btn" onClick={handleSubmit}>
            Submit Application
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.16667 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
