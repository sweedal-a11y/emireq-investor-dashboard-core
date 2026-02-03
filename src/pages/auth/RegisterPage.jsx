import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import backgroundImg from '../../assets/background-login.png';
import oneImg from '../../assets/one.png';
import twoImg from '../../assets/two.png';
import threeImg from '../../assets/three.png';
import fourImg from '../../assets/four.png';
import sevenImg from '../../assets/seven.png';
import eightImg from '../../assets/eight.png';
import emireqLogo from '../../assets/emireq-logo.png';
import './RegisterPage.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(location.state?.currentStep || 1);
  const totalSteps = 8;
  
  // Form data for all steps
  const [formData, setFormData] = useState(location.state?.formData || {
    fullName: '',
    country: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    nationality: '',
    address: '',
    city: '',
    postalCode: '',
    investorType: '',
    investmentExperience: '',
    riskTolerance: '',
    primaryInvestmentGoals: [],
    investmentTimeHorizon: '',
    investmentStages: [],
    otherStages: '',
    sectorInterests: [],
    governmentId: null,
    accreditationDoc: null,
    proofOfFunds: null,
    investmentGoals: '',
    annualIncome: '',
    netWorth: '',
    sourceOfFunds: '',
    employmentStatus: '',
    employer: '',
    occupation: '',
    idType: '',
    idNumber: '',
    idExpiryDate: '',
    taxResidency: '',
    taxIdentificationNumber: '',
    shariahCompliance: false,
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxGroupChange = (field, value) => {
    setFormData(prev => {
      const currentValues = prev[field] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return {
        ...prev,
        [field]: newValues
      };
    });
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileChange = (field, file) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch(step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.country) newErrors.country = 'Country is required';
        break;
      case 2:
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
        break;
      case 3:
        if (!formData.investorType) newErrors.investorType = 'Investor type is required';
        break;
      case 4:
        if (!formData.shariahCompliance) newErrors.shariahCompliance = 'You must confirm Shariah compliance';
        break;
      case 5:
        if (!formData.primaryInvestmentGoals || formData.primaryInvestmentGoals.length === 0) {
          newErrors.primaryInvestmentGoals = 'Please select at least one investment goal';
        }
        if (!formData.investmentTimeHorizon) newErrors.investmentTimeHorizon = 'Please select a time horizon';
        break;
      case 6:
        if (!formData.investmentStages || formData.investmentStages.length === 0) {
          newErrors.investmentStages = 'Please select at least one investment stage';
        }
        break;
      case 7:
        if (!formData.sectorInterests || formData.sectorInterests.length < 3) {
          newErrors.sectorInterests = 'Please select at least 3 sectors';
        }
        break;
      case 8:
        if (!formData.governmentId) {
          newErrors.governmentId = 'Government-issued ID is required';
        }
        break;
      case 10:
        if (!formData.investorType) newErrors.investorType = 'Investor type is required';
        if (!formData.investmentExperience) newErrors.investmentExperience = 'Investment experience is required';
        break;
      case 11:
        if (!formData.riskTolerance) newErrors.riskTolerance = 'Risk tolerance is required';
        if (!formData.investmentGoals) newErrors.investmentGoals = 'Investment goals are required';
        break;
      case 12:
        if (!formData.annualIncome) newErrors.annualIncome = 'Annual income is required';
        if (!formData.netWorth) newErrors.netWorth = 'Net worth is required';
        break;
      case 13:
        if (!formData.idType) newErrors.idType = 'ID type is required';
        if (!formData.idNumber.trim()) newErrors.idNumber = 'ID number is required';
        if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms';
        if (!formData.agreePrivacy) newErrors.agreePrivacy = 'You must agree to privacy policy';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Navigate to review page with form data
        navigate('/review', { state: { formData } });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/signup');
    }
  };

  const renderStepIndicators = () => {
    return (
      <div className="register-step-indicators">
        {[...Array(totalSteps)].map((_, index) => (
          <div
            key={index + 1}
            className={`register-step-indicator ${
              currentStep === index + 1 ? 'active' : currentStep > index + 1 ? 'completed' : ''
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    );
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <>
            <h2 className="register-form-title">Personal Information</h2>
            <p className="register-form-subtitle">Let's start by getting to know you</p>

            <div className="register-form-group">
              <label htmlFor="fullName" className="register-form-label">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={() => handleBlur('fullName')}
                className={`register-form-input ${errors.fullName ? 'register-form-input--error' : ''}`}
                placeholder="username"
              />
              {errors.fullName && (
                <span className="register-form-error">{errors.fullName}</span>
              )}
            </div>

            <div className="register-form-group">
              <label htmlFor="country" className="register-form-label">
                Country
              </label>
              <div className="register-select-wrapper">
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  onBlur={() => handleBlur('country')}
                  className={`register-form-select ${errors.country ? 'register-form-input--error' : ''}`}
                >
                  <option value="">Country</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="SA">Saudi Arabia</option>
                  <option value="IN">India</option>
                  <option value="SG">Singapore</option>
                </select>
                <svg className="register-select-arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L7 7L13 1" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {errors.country && (
                <span className="register-form-error">{errors.country}</span>
              )}
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h2 className="register-form-title">Contact Information</h2>
            <p className="register-form-subtitle">How can we reach you with important updates and opportunities?</p>

            <div className="register-form-group">
              <label htmlFor="email" className="register-form-label">
                Email Address
              </label>
              <div className="register-input-wrapper">
                <svg className="register-input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.33334 5.83333L10 10.8333L16.6667 5.83333M3.33334 5C2.8731 5 2.5 5.3731 2.5 5.83333V14.1667C2.5 14.6269 2.8731 15 3.33334 15H16.6667C17.1269 15 17.5 14.6269 17.5 14.1667V5.83333C17.5 5.3731 17.1269 5 16.6667 5H3.33334Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  className={`register-form-input register-form-input-with-icon ${errors.email ? 'register-form-input--error' : ''}`}
                  placeholder="username"
                />
              </div>
              <p className="register-field-helper">We'll send important notifications to this address</p>
              {errors.email && (
                <span className="register-form-error">{errors.email}</span>
              )}
            </div>

            <div className="register-form-group">
              <label htmlFor="phoneNumber" className="register-form-label">
                Mobile Number
              </label>
              <div className="register-input-wrapper">
                <svg className="register-input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.83333 3.33333H4.16667C3.24619 3.33333 2.5 4.07952 2.5 5V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H5.83333M5.83333 3.33333H14.1667M5.83333 3.33333V17.5M14.1667 3.33333H15.8333C16.7538 3.33333 17.5 4.07952 17.5 5V15.8333C17.5 16.7538 16.7538 17.5 15.8333 17.5H14.1667M14.1667 3.33333V17.5M14.1667 17.5H5.83333" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  onBlur={() => handleBlur('phoneNumber')}
                  className={`register-form-input register-form-input-with-icon ${errors.phoneNumber ? 'register-form-input--error' : ''}`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <p className="register-field-helper">For SMS alerts about time-sensitive opportunities</p>
              {errors.phoneNumber && (
                <span className="register-form-error">{errors.phoneNumber}</span>
              )}
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h2 className="register-form-title">Investor Type</h2>
            <p className="register-form-subtitle">How can we reach you with important updates and opportunities?</p>

            <div className="register-investor-types">
              <label className="register-investor-type-card">
                <input
                  type="radio"
                  name="investorType"
                  value="individual"
                  checked={formData.investorType === 'individual'}
                  onChange={handleChange}
                  className="register-radio"
                />
                <div className="register-investor-type-content">
                  <div className="register-investor-type-header">
                    <span className="register-investor-type-title">Individual Investor</span>
                    <svg className="register-info-icon" width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 10.6667V8M8 5.33333H8.00667" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="register-investor-type-description">Investing personal funds</p>
                </div>
              </label>

              <label className="register-investor-type-card">
                <input
                  type="radio"
                  name="investorType"
                  value="angel"
                  checked={formData.investorType === 'angel'}
                  onChange={handleChange}
                  className="register-radio"
                />
                <div className="register-investor-type-content">
                  <div className="register-investor-type-header">
                    <span className="register-investor-type-title">Angel Investor</span>
                    <svg className="register-info-icon" width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 10.6667V8M8 5.33333H8.00667" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="register-investor-type-description">High-net-worth individual investor</p>
                </div>
              </label>

              <label className="register-investor-type-card">
                <input
                  type="radio"
                  name="investorType"
                  value="venture-capital"
                  checked={formData.investorType === 'venture-capital'}
                  onChange={handleChange}
                  className="register-radio"
                />
                <div className="register-investor-type-content">
                  <div className="register-investor-type-header">
                    <span className="register-investor-type-title">Venture Capital</span>
                    <svg className="register-info-icon" width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 10.6667V8M8 5.33333H8.00667" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="register-investor-type-description">Professional investment firm</p>
                </div>
              </label>

              <label className="register-investor-type-card">
                <input
                  type="radio"
                  name="investorType"
                  value="corporate"
                  checked={formData.investorType === 'corporate'}
                  onChange={handleChange}
                  className="register-radio"
                />
                <div className="register-investor-type-content">
                  <div className="register-investor-type-header">
                    <span className="register-investor-type-title">Corporate Investor</span>
                    <svg className="register-info-icon" width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 10.6667V8M8 5.33333H8.00667" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="register-investor-type-description">Corporate venture arm</p>
                </div>
              </label>

              <label className="register-investor-type-card">
                <input
                  type="radio"
                  name="investorType"
                  value="family-office"
                  checked={formData.investorType === 'family-office'}
                  onChange={handleChange}
                  className="register-radio"
                />
                <div className="register-investor-type-content">
                  <div className="register-investor-type-header">
                    <span className="register-investor-type-title">Family Office</span>
                    <svg className="register-info-icon" width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 10.6667V8M8 5.33333H8.00667" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="register-investor-type-description">Managing family wealth</p>
                </div>
              </label>

              <label className="register-investor-type-card">
                <input
                  type="radio"
                  name="investorType"
                  value="institutional"
                  checked={formData.investorType === 'institutional'}
                  onChange={handleChange}
                  className="register-radio"
                />
                <div className="register-investor-type-content">
                  <div className="register-investor-type-header">
                    <span className="register-investor-type-title">Institutional Investor</span>
                    <svg className="register-info-icon" width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 10.6667V8M8 5.33333H8.00667" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="register-investor-type-description">Large-scale institutional fund</p>
                </div>
              </label>
            </div>
            {errors.investorType && (
              <span className="register-form-error">{errors.investorType}</span>
            )}
          </>
        );

      case 4:
        return (
          <>
            <h2 className="register-form-title">Shariah Compliance</h2>
            <p className="register-form-subtitle">Confirm your commitment to Shariah-complaint investing</p>

            <div className="register-shariah-principles">
              <div className="register-shariah-header">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 13C20 18 16.5 20.5 12.34 21.95C12.1222 22.0238 11.8855 22.0203 11.67 21.94C7.5 20.5 4 18 4 13V5.99999C4 5.73478 4.10536 5.48042 4.29289 5.29289C4.48043 5.10535 4.73478 4.99999 5 4.99999C7 4.99999 9.5 3.79999 11.24 2.27999C11.4519 2.09899 11.7214 1.99954 12 1.99954C12.2786 1.99954 12.5481 2.09899 12.76 2.27999C14.51 3.80999 17 4.99999 19 4.99999C19.2652 4.99999 19.5196 5.10535 19.7071 5.29289C19.8946 5.48042 20 5.73478 20 5.99999V13Z" stroke="#121212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                <h3 className="register-shariah-title">Our Shariah Principles</h3>
              </div>
              
              <ul className="register-shariah-list">
                <li className="register-shariah-item">
                  <svg className="register-shariah-check" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="10" fill="#10B981"/>
                    <path d="M6 10L8.5 12.5L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>No involvement in prohibited activities (alcohol, gambling, tobacco, etc.)</span>
                </li>
                <li className="register-shariah-item">
                  <svg className="register-shariah-check" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="10" fill="#10B981"/>
                    <path d="M6 10L8.5 12.5L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Interest-free transactions (no riba/usury)</span>
                </li>
                <li className="register-shariah-item">
                  <svg className="register-shariah-check" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="10" fill="#10B981"/>
                    <path d="M6 10L8.5 12.5L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Ethical and transparent business practices</span>
                </li>
                <li className="register-shariah-item">
                  <svg className="register-shariah-check" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="10" fill="#10B981"/>
                    <path d="M6 10L8.5 12.5L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Asset-backed investments (avoiding excessive speculation)</span>
                </li>
              </ul>
            </div>

            <div className="register-form-group">
              <label className="register-checkbox-label register-shariah-checkbox">
                <input
                  type="checkbox"
                  name="shariahCompliance"
                  checked={formData.shariahCompliance}
                  onChange={handleChange}
                  className="register-checkbox"
                />
                <div className="register-shariah-checkbox-content">
                  <span className="register-checkbox-text">
                    I confirm that I want to invest only in Shariah-compliant opportunities
                  </span>
                  <p className="register-shariah-helper">
                    By checking this box, you acknowledge that all your investments through Emireq will be screened for Shariah Compliance
                  </p>
                </div>
              </label>
              {errors.shariahCompliance && (
                <span className="register-form-error">{errors.shariahCompliance}</span>
              )}
            </div>
          </>
        );

      case 5:
        return (
          <>
            <h2 className="register-form-title">Investor Mission</h2>
            <p className="register-form-subtitle">What's your primary investment goal?</p>

            <div className="register-form-group">
              <label className="register-form-label">
                Primary Investment Goals
              </label>
              
              <div className="register-checkbox-group">
                <label className="register-checkbox-card">
                  <input
                    type="checkbox"
                    checked={formData.primaryInvestmentGoals.includes('long-term-wealth')}
                    onChange={() => handleCheckboxGroupChange('primaryInvestmentGoals', 'long-term-wealth')}
                    className="register-checkbox"
                  />
                  <span className="register-checkbox-text">Build Long-term ethical wealth</span>
                </label>

                <label className="register-checkbox-card">
                  <input
                    type="checkbox"
                    checked={formData.primaryInvestmentGoals.includes('support-startups')}
                    onChange={() => handleCheckboxGroupChange('primaryInvestmentGoals', 'support-startups')}
                    className="register-checkbox"
                  />
                  <span className="register-checkbox-text">Support startups & technology ventures</span>
                </label>

                <label className="register-checkbox-card">
                  <input
                    type="checkbox"
                    checked={formData.primaryInvestmentGoals.includes('diversify-assets')}
                    onChange={() => handleCheckboxGroupChange('primaryInvestmentGoals', 'diversify-assets')}
                    className="register-checkbox"
                  />
                  <span className="register-checkbox-text">Diversify with real estate and tokenized assets</span>
                </label>

                <label className="register-checkbox-card">
                  <input
                    type="checkbox"
                    checked={formData.primaryInvestmentGoals.includes('islamic-finance')}
                    onChange={() => handleCheckboxGroupChange('primaryInvestmentGoals', 'islamic-finance')}
                    className="register-checkbox"
                  />
                  <span className="register-checkbox-text">Drive Islamic Finance projects</span>
                </label>

                <label className="register-checkbox-card">
                  <input
                    type="checkbox"
                    checked={formData.primaryInvestmentGoals.includes('balanced-portfolio')}
                    onChange={() => handleCheckboxGroupChange('primaryInvestmentGoals', 'balanced-portfolio')}
                    className="register-checkbox"
                  />
                  <span className="register-checkbox-text">create a balanced halal portfolio</span>
                </label>
              </div>

              {errors.primaryInvestmentGoals && (
                <span className="register-form-error">{errors.primaryInvestmentGoals}</span>
              )}
            </div>

            <div className="register-form-group">
              <label className="register-form-label">
                Investment Time Horizon
              </label>
              
              <div className="register-radio-group">
                <label className="register-radio-card">
                  <input
                    type="radio"
                    name="investmentTimeHorizon"
                    value="short-term"
                    checked={formData.investmentTimeHorizon === 'short-term'}
                    onChange={handleChange}
                    className="register-radio"
                  />
                  <span className="register-radio-text">Short-term (1-3 years)</span>
                </label>

                <label className="register-radio-card">
                  <input
                    type="radio"
                    name="investmentTimeHorizon"
                    value="medium-term"
                    checked={formData.investmentTimeHorizon === 'medium-term'}
                    onChange={handleChange}
                    className="register-radio"
                  />
                  <span className="register-radio-text">Medium-term (3-7 years)</span>
                </label>

                <label className="register-radio-card">
                  <input
                    type="radio"
                    name="investmentTimeHorizon"
                    value="long-term"
                    checked={formData.investmentTimeHorizon === 'long-term'}
                    onChange={handleChange}
                    className="register-radio"
                  />
                  <span className="register-radio-text">Long-term (7+ years)</span>
                </label>
              </div>

              {errors.investmentTimeHorizon && (
                <span className="register-form-error">{errors.investmentTimeHorizon}</span>
              )}
            </div>
          </>
        );

      case 6:
        return (
          <>
            <h2 className="register-form-title">Investor Stages</h2>
            <p className="register-form-subtitle">Which Investment stages interests you?</p>

            <div className="register-form-group">
              <label className="register-form-label">
                Primary Investment Goals
              </label>
              
              <div className="register-checkbox-group">
                <label className="register-checkbox-card">
                  <input
                    type="checkbox"
                    checked={formData.investmentStages.includes('pre-seed')}
                    onChange={() => handleCheckboxGroupChange('investmentStages', 'pre-seed')}
                    className="register-checkbox"
                  />
                  <span className="register-checkbox-text">Pre-Seed</span>
                </label>

                <label className="register-checkbox-card">
                  <input
                    type="checkbox"
                    checked={formData.investmentStages.includes('seed')}
                    onChange={() => handleCheckboxGroupChange('investmentStages', 'seed')}
                    className="register-checkbox"
                  />
                  <span className="register-checkbox-text">Seed</span>
                </label>

                <label className="register-checkbox-card">
                  <input
                    type="checkbox"
                    checked={formData.investmentStages.includes('mvp')}
                    onChange={() => handleCheckboxGroupChange('investmentStages', 'mvp')}
                    className="register-checkbox"
                  />
                  <span className="register-checkbox-text">MVP</span>
                </label>

                <label className="register-checkbox-card">
                  <input
                    type="checkbox"
                    checked={formData.investmentStages.includes('series-abc')}
                    onChange={() => handleCheckboxGroupChange('investmentStages', 'series-abc')}
                    className="register-checkbox"
                  />
                  <span className="register-checkbox-text">Series A/B/C</span>
                </label>

                <label className="register-checkbox-card">
                  <input
                    type="checkbox"
                    checked={formData.investmentStages.includes('expansion-growth')}
                    onChange={() => handleCheckboxGroupChange('investmentStages', 'expansion-growth')}
                    className="register-checkbox"
                  />
                  <span className="register-checkbox-text">Expansion/Growth Stage</span>
                </label>

                <label className="register-checkbox-card">
                  <input
                    type="checkbox"
                    checked={formData.investmentStages.includes('other')}
                    onChange={() => handleCheckboxGroupChange('investmentStages', 'other')}
                    className="register-checkbox"
                  />
                  <span className="register-checkbox-text">Other</span>
                </label>
              </div>

              {errors.investmentStages && (
                <span className="register-form-error">{errors.investmentStages}</span>
              )}
            </div>

            <div className="register-form-group">
              <label htmlFor="otherStages" className="register-form-label">
                Other Stages (optional)
              </label>
              <input
                type="text"
                id="otherStages"
                name="otherStages"
                value={formData.otherStages}
                onChange={handleChange}
                className="register-form-input"
                placeholder="Specify other stages"
              />
            </div>
          </>
        );

      case 7:
        return (
          <>
            <h2 className="register-form-title">Sector Intersts</h2>
            <p className="register-form-subtitle">Select at least 3 sectors you're interested in investing</p>

            <div className="register-form-group">
              <label className="register-form-label">
                Primary Investment Goals
              </label>
              
              <div className="register-checkbox-group">
                <label className="register-checkbox-card">
                  <input
                    type="checkbox"
                    checked={formData.sectorInterests.includes('technology-software')}
                    onChange={() => handleCheckboxGroupChange('sectorInterests', 'technology-software')}
                    className="register-checkbox"
                  />
                  <svg className="register-sector-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="3" width="20" height="14" rx="2" stroke="#374151" strokeWidth="2"/>
                    <path d="M2 14H22" stroke="#374151" strokeWidth="2"/>
                    <path d="M8 21H16" stroke="#374151" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 17V21" stroke="#374151" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="register-checkbox-text">Technology & Software</span>
                </label>

                <label className="register-checkbox-card">
                  <input
                    type="checkbox"
                    checked={formData.sectorInterests.includes('healthcare-biotech')}
                    onChange={() => handleCheckboxGroupChange('sectorInterests', 'healthcare-biotech')}
                    className="register-checkbox"
                  />
                  <svg className="register-sector-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.84 4.61C19.5 3.28 17.66 2.5 15.54 2.5C13.43 2.5 11.59 3.28 10.25 4.61L12 6.37L13.75 4.61C14.66 3.71 15.92 3.2 17.29 3.2C18.66 3.2 19.92 3.71 20.83 4.61C22.73 6.51 22.73 9.64 20.83 11.54L12 20.37L3.17 11.54C1.27 9.64 1.27 6.51 3.17 4.61C4.08 3.71 5.34 3.2 6.71 3.2C8.08 3.2 9.34 3.71 10.25 4.61L12 6.37L10.25 8.12" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="register-checkbox-text">Healthcare & Biotech</span>
                </label>

                <label className="register-checkbox-card">
                  <input
                    type="checkbox"
                    checked={formData.sectorInterests.includes('fintech-banking')}
                    onChange={() => handleCheckboxGroupChange('sectorInterests', 'fintech-banking')}
                    className="register-checkbox"
                  />
                  <svg className="register-sector-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 21H21M3 7L12 3L21 7M4 7V21M20 7V21M8 10V17M12 10V17M16 10V17" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="register-checkbox-text">Fintech & Banking</span>
                </label>

                <label className="register-checkbox-card">
                  <input
                    type="checkbox"
                    checked={formData.sectorInterests.includes('clean-energy')}
                    onChange={() => handleCheckboxGroupChange('sectorInterests', 'clean-energy')}
                    className="register-checkbox"
                  />
                  <svg className="register-sector-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="register-checkbox-text">Clean Energy & Climate</span>
                </label>

                <label className="register-checkbox-card">
                  <input
                    type="checkbox"
                    checked={formData.sectorInterests.includes('ai-machine-learning')}
                    onChange={() => handleCheckboxGroupChange('sectorInterests', 'ai-machine-learning')}
                    className="register-checkbox"
                  />
                  <svg className="register-sector-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="3" stroke="#374151" strokeWidth="2"/>
                    <path d="M12 2V5M12 19V22M22 12H19M5 12H2M19.07 4.93L16.95 7.05M7.05 16.95L4.93 19.07M19.07 19.07L16.95 16.95M7.05 7.05L4.93 4.93" stroke="#374151" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="register-checkbox-text">AI & Machine Learning</span>
                </label>

                <label className="register-checkbox-card">
                  <input
                    type="checkbox"
                    checked={formData.sectorInterests.includes('automotive-mobility')}
                    onChange={() => handleCheckboxGroupChange('sectorInterests', 'automotive-mobility')}
                    className="register-checkbox"
                  />
                  <svg className="register-sector-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 11L7 7H17L19 11M5 11V17C5 17.55 5.45 18 6 18H7C7.55 18 8 17.55 8 17V16H16V17C16 17.55 16.45 18 17 18H18C18.55 18 19 17.55 19 17V11M5 11H19M7.5 14H7.51M16.5 14H16.51" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="register-checkbox-text">Automotive & Mobility</span>
                </label>
              </div>

              {errors.sectorInterests && (
                <span className="register-form-error">{errors.sectorInterests}</span>
              )}
            </div>
          </>
        );

      case 8:
        return (
          <>
            <h2 className="register-form-title">Documents Upload</h2>
            <p className="register-form-subtitle">Upload required documents to verify your identity and investor status</p>

            <div className="register-form-group">
              <label className="register-form-label">
                Government-Issued ID
              </label>
              <p className="register-upload-helper">Passport, Driver's License, or National ID</p>
              
              {formData.governmentId ? (
                <div className="register-upload-success">
                  <div className="register-upload-success-content">
                    <svg className="register-upload-success-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7.5 10L9.16667 11.6667L12.5 8.33333" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="register-upload-success-info">
                      <span className="register-upload-success-filename">{formData.governmentId.name}</span>
                      <span className="register-upload-success-status">Uploaded successfully</span>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => handleFileChange('governmentId', null)}
                    className="register-upload-remove"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 5L5 15M5 5L15 15" stroke="#99A1AF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ) : (
                <label className="register-upload-box">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange('governmentId', e.target.files[0])}
                    className="register-upload-input"
                  />
                  <div className="register-upload-content">
                    <svg className="register-upload-icon" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="8" y="6" width="24" height="28" rx="2" stroke="#9333EA" strokeWidth="2"/>
                      <path d="M13 12H27M13 17H27M13 22H20" stroke="#9333EA" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span className="register-upload-text">Click to upload</span>
                    <span className="register-upload-hint">PDF format preferred</span>
                  </div>
                </label>
              )}
              {errors.governmentId && (
                <span className="register-form-error">{errors.governmentId}</span>
              )}
            </div>

            <div className="register-form-group">
              <label className="register-form-label">
                Accreditation Verification (Optional)
              </label>
              <p className="register-upload-helper">Letter from CPA, attorney, or broker-dealer</p>
              
              {formData.accreditationDoc ? (
                <div className="register-upload-success">
                  <div className="register-upload-success-content">
                    <svg className="register-upload-success-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7.5 10L9.16667 11.6667L12.5 8.33333" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="register-upload-success-info">
                      <span className="register-upload-success-filename">{formData.accreditationDoc.name}</span>
                      <span className="register-upload-success-status">Uploaded successfully</span>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => handleFileChange('accreditationDoc', null)}
                    className="register-upload-remove"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 5L5 15M5 5L15 15" stroke="#99A1AF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ) : (
                <label className="register-upload-box">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange('accreditationDoc', e.target.files[0])}
                    className="register-upload-input"
                  />
                  <div className="register-upload-content">
                    <svg className="register-upload-icon" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="8" y="6" width="24" height="28" rx="2" stroke="#9333EA" strokeWidth="2"/>
                      <path d="M13 12H27M13 17H27M13 22H20" stroke="#9333EA" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span className="register-upload-text">Click to upload</span>
                    <span className="register-upload-hint">PDF format preferred</span>
                  </div>
                </label>
              )}
            </div>

            <div className="register-form-group">
              <label className="register-form-label">
                Proof of Funds (Optional)
              </label>
              <p className="register-upload-helper">Bank or brokerage statement (last 90 days)</p>
              
              {formData.proofOfFunds ? (
                <div className="register-upload-success">
                  <div className="register-upload-success-content">
                    <svg className="register-upload-success-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7.5 10L9.16667 11.6667L12.5 8.33333" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="register-upload-success-info">
                      <span className="register-upload-success-filename">{formData.proofOfFunds.name}</span>
                      <span className="register-upload-success-status">Uploaded successfully</span>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => handleFileChange('proofOfFunds', null)}
                    className="register-upload-remove"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 5L5 15M5 5L15 15" stroke="#99A1AF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ) : (
                <label className="register-upload-box">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange('proofOfFunds', e.target.files[0])}
                    className="register-upload-input"
                  />
                  <div className="register-upload-content">
                    <svg className="register-upload-icon" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="8" y="6" width="24" height="28" rx="2" stroke="#9333EA" strokeWidth="2"/>
                      <path d="M13 12H27M13 17H27M13 22H20" stroke="#9333EA" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span className="register-upload-text">Click to upload</span>
                    <span className="register-upload-hint">PDF format preferred</span>
                  </div>
                </label>
              )}
            </div>
          </>
        );

      case 10:
        return (
          <>
            <h2 className="register-form-title">Investor Profile</h2>
            <p className="register-form-subtitle">Tell us about your investment background</p>

            <div className="register-form-group">
              <label htmlFor="investorType" className="register-form-label">
                Investor Type
              </label>
              <div className="register-select-wrapper">
                <select
                  id="investorType"
                  name="investorType"
                  value={formData.investorType}
                  onChange={handleChange}
                  onBlur={() => handleBlur('investorType')}
                  className={`register-form-select ${errors.investorType ? 'register-form-input--error' : ''}`}
                >
                  <option value="">Select Type</option>
                  <option value="individual">Individual Investor</option>
                  <option value="institutional">Institutional Investor</option>
                  <option value="accredited">Accredited Investor</option>
                  <option value="professional">Professional Investor</option>
                </select>
                <svg className="register-select-arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L7 7L13 1" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {errors.investorType && (
                <span className="register-form-error">{errors.investorType}</span>
              )}
            </div>

            <div className="register-form-group">
              <label htmlFor="investmentExperience" className="register-form-label">
                Investment Experience
              </label>
              <div className="register-select-wrapper">
                <select
                  id="investmentExperience"
                  name="investmentExperience"
                  value={formData.investmentExperience}
                  onChange={handleChange}
                  onBlur={() => handleBlur('investmentExperience')}
                  className={`register-form-select ${errors.investmentExperience ? 'register-form-input--error' : ''}`}
                >
                  <option value="">Select Experience</option>
                  <option value="beginner">Beginner (0-2 years)</option>
                  <option value="intermediate">Intermediate (3-5 years)</option>
                  <option value="advanced">Advanced (6-10 years)</option>
                  <option value="expert">Expert (10+ years)</option>
                </select>
                <svg className="register-select-arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L7 7L13 1" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {errors.investmentExperience && (
                <span className="register-form-error">{errors.investmentExperience}</span>
              )}
            </div>
          </>
        );

      case 7:
        return (
          <>
            <h2 className="register-form-title">Investment Preferences</h2>
            <p className="register-form-subtitle">Help us understand your investment style</p>

            <div className="register-form-group">
              <label htmlFor="riskTolerance" className="register-form-label">
                Risk Tolerance
              </label>
              <div className="register-select-wrapper">
                <select
                  id="riskTolerance"
                  name="riskTolerance"
                  value={formData.riskTolerance}
                  onChange={handleChange}
                  onBlur={() => handleBlur('riskTolerance')}
                  className={`register-form-select ${errors.riskTolerance ? 'register-form-input--error' : ''}`}
                >
                  <option value="">Select Risk Level</option>
                  <option value="conservative">Conservative</option>
                  <option value="moderate">Moderate</option>
                  <option value="aggressive">Aggressive</option>
                  <option value="very-aggressive">Very Aggressive</option>
                </select>
                <svg className="register-select-arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L7 7L13 1" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {errors.riskTolerance && (
                <span className="register-form-error">{errors.riskTolerance}</span>
              )}
            </div>

            <div className="register-form-group">
              <label htmlFor="investmentGoals" className="register-form-label">
                Investment Goals
              </label>
              <textarea
                id="investmentGoals"
                name="investmentGoals"
                value={formData.investmentGoals}
                onChange={handleChange}
                onBlur={() => handleBlur('investmentGoals')}
                className={`register-form-textarea ${errors.investmentGoals ? 'register-form-input--error' : ''}`}
                placeholder="Describe your investment goals..."
                rows="4"
              />
              {errors.investmentGoals && (
                <span className="register-form-error">{errors.investmentGoals}</span>
              )}
            </div>
          </>
        );

      case 8:
        return (
          <>
            <h2 className="register-form-title">Financial Information</h2>
            <p className="register-form-subtitle">This information is kept confidential</p>

            <div className="register-form-group">
              <label htmlFor="annualIncome" className="register-form-label">
                Annual Income
              </label>
              <div className="register-select-wrapper">
                <select
                  id="annualIncome"
                  name="annualIncome"
                  value={formData.annualIncome}
                  onChange={handleChange}
                  onBlur={() => handleBlur('annualIncome')}
                  className={`register-form-select ${errors.annualIncome ? 'register-form-input--error' : ''}`}
                >
                  <option value="">Select Range</option>
                  <option value="0-50k">$0 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k-250k">$100,000 - $250,000</option>
                  <option value="250k-500k">$250,000 - $500,000</option>
                  <option value="500k+">$500,000+</option>
                </select>
                <svg className="register-select-arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L7 7L13 1" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {errors.annualIncome && (
                <span className="register-form-error">{errors.annualIncome}</span>
              )}
            </div>

            <div className="register-form-group">
              <label htmlFor="netWorth" className="register-form-label">
                Net Worth
              </label>
              <div className="register-select-wrapper">
                <select
                  id="netWorth"
                  name="netWorth"
                  value={formData.netWorth}
                  onChange={handleChange}
                  onBlur={() => handleBlur('netWorth')}
                  className={`register-form-select ${errors.netWorth ? 'register-form-input--error' : ''}`}
                >
                  <option value="">Select Range</option>
                  <option value="0-100k">$0 - $100,000</option>
                  <option value="100k-500k">$100,000 - $500,000</option>
                  <option value="500k-1m">$500,000 - $1,000,000</option>
                  <option value="1m-5m">$1,000,000 - $5,000,000</option>
                  <option value="5m+">$5,000,000+</option>
                </select>
                <svg className="register-select-arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L7 7L13 1" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {errors.netWorth && (
                <span className="register-form-error">{errors.netWorth}</span>
              )}
            </div>
          </>
        );

      case 9:
        return (
          <>
            <h2 className="register-form-title">Identity Verification</h2>
            <p className="register-form-subtitle">We need to verify your identity for security</p>

            <div className="register-form-group">
              <label htmlFor="idType" className="register-form-label">
                ID Type
              </label>
              <div className="register-select-wrapper">
                <select
                  id="idType"
                  name="idType"
                  value={formData.idType}
                  onChange={handleChange}
                  onBlur={() => handleBlur('idType')}
                  className={`register-form-select ${errors.idType ? 'register-form-input--error' : ''}`}
                >
                  <option value="">Select ID Type</option>
                  <option value="passport">Passport</option>
                  <option value="drivers-license">Driver's License</option>
                  <option value="national-id">National ID Card</option>
                </select>
                <svg className="register-select-arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L7 7L13 1" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {errors.idType && (
                <span className="register-form-error">{errors.idType}</span>
              )}
            </div>

            <div className="register-form-group">
              <label htmlFor="idNumber" className="register-form-label">
                ID Number
              </label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                onBlur={() => handleBlur('idNumber')}
                className={`register-form-input ${errors.idNumber ? 'register-form-input--error' : ''}`}
                placeholder="Enter ID number"
              />
              {errors.idNumber && (
                <span className="register-form-error">{errors.idNumber}</span>
              )}
            </div>

            <div className="register-form-group" style={{marginTop: '24px'}}>
              <label className="register-checkbox-label">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="register-checkbox"
                />
                <span className="register-checkbox-text">
                  I agree to the <a href="/terms" target="_blank" className="register-link">Terms and Conditions</a>
                </span>
              </label>
              {errors.agreeTerms && (
                <span className="register-form-error">{errors.agreeTerms}</span>
              )}
            </div>

            <div className="register-form-group">
              <label className="register-checkbox-label">
                <input
                  type="checkbox"
                  name="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onChange={handleChange}
                  className="register-checkbox"
                />
                <span className="register-checkbox-text">
                  I agree to the <a href="/privacy" target="_blank" className="register-link">Privacy Policy</a>
                </span>
              </label>
              {errors.agreePrivacy && (
                <span className="register-form-error">{errors.agreePrivacy}</span>
              )}
            </div>

            <div className="register-form-group">
              <label className="register-checkbox-label">
                <input
                  type="checkbox"
                  name="agreeMarketing"
                  checked={formData.agreeMarketing}
                  onChange={handleChange}
                  className="register-checkbox"
                />
                <span className="register-checkbox-text">
                  I agree to receive marketing communications (optional)
                </span>
              </label>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="register-page">
      {/* Left Side - Background with gradient overlay */}
      <div className="register-left">
        <div className="register-left-overlay">
          <img 
            src={backgroundImg} 
            alt="Background" 
            className="register-background-image"
          />
          <div className="register-left-content">
            <div className="register-image-container">
              <img 
                src={currentStep === 2 ? twoImg : currentStep === 3 ? threeImg : currentStep === 4 ? fourImg : (currentStep === 5 || currentStep === 6) ? oneImg : currentStep === 7 ? sevenImg : currentStep === 8 ? eightImg : oneImg} 
                alt="Investment" 
                className="register-main-image"
              />
            </div>
            
            <div className="register-left-info">
              <div className="register-badge">
                Step {currentStep} of {totalSteps}
              </div>
              
              {currentStep === 1 && (
                <>
                  <h1 className="register-left-heading">Tell Us About Yourself</h1>
                  <p className="register-left-description">
                    We'd love to get to know you better. This information helps us personalize your investment experience.
                  </p>
                </>
              )}
              
              {(currentStep === 2 || currentStep === 3) && (
                <>
                  <h1 className="register-left-heading">We'll keep you updated on deals that match your investment profile.</h1>
                  <div className="register-left-features">
                    <div className="register-feature-item">
                      <div className="register-feature-icon"></div>
                      <span>Real-time deal alerts</span>
                    </div>
                    <div className="register-feature-item">
                      <div className="register-feature-icon"></div>
                      <span>Market insights and analysis</span>
                    </div>
                    <div className="register-feature-item">
                      <div className="register-feature-icon"></div>
                      <span>Portfolio performance updates</span>
                    </div>
                  </div>
                </>
              )}
              
              {currentStep === 4 && (
                <>
                  <h1 className="register-left-heading">Shariah-Compliant Investment</h1>
                  <p className="register-left-description">
                    Emireq is commited to providing only Shariah-compliant investment opportunities. All our investments are screened and certified by qualified Shariah Scholars.
                  </p>
                </>
              )}
              
              {currentStep === 5 && (
                <>
                  <h1 className="register-left-heading">Shariah-Compliant Investment</h1>
                  <p className="register-left-description">
                    Emireq is commited to providing only Shariah-compliant investment opportunities. All our investments are screened and certified by qualified Shariah Scholars.
                  </p>
                </>
              )}
              
              {currentStep === 6 && (
                <>
                  <h1 className="register-left-heading">Shariah-Compliant Investment</h1>
                  <p className="register-left-description">
                    Emireq is commited to providing only Shariah-compliant investment opportunities. All our investments are screened and certified by qualified Shariah Scholars.
                  </p>
                </>
              )}
              
              {currentStep === 7 && (
                <>
                  <h1 className="register-left-heading">Find Your Perfect Match</h1>
                  <p className="register-left-description">
                    By understanding your sector preferences, we can curate investment opportunities that align with your interests and expertise.
                  </p>
                  <div className="register-left-features">
                    <div className="register-feature-item">
                      <div className="register-feature-icon"></div>
                      <span>Personalized deal flow</span>
                    </div>
                    <div className="register-feature-item">
                      <div className="register-feature-icon"></div>
                      <span>Sector-specific insights</span>
                    </div>
                    <div className="register-feature-item">
                      <div className="register-feature-icon"></div>
                      <span>Expert analysis and reports</span>
                    </div>
                    <div className="register-feature-item">
                      <div className="register-feature-icon"></div>
                      <span>Connect with sector specialists</span>
                    </div>
                  </div>
                </>
              )}
              
              {currentStep === 8 && (
                <>
                  <h1 className="register-left-heading">Secure Verification</h1>
                  <p className="register-left-description">
                    To comply with regulations and protect all parties, we need to verify your identity and investment qualifications.
                  </p>
                  <div className="register-security-box">
                    <p className="register-security-title">Your documents are:</p>
                    <ul className="register-security-list">
                      <li>• Encrypted with bank-level security</li>
                      <li>• Stored in compliance with regulations</li>
                      <li>• Never shared without your permission</li>
                      <li>• Reviewed only by authorized personnel</li>
                    </ul>
                  </div>
                </>
              )}
              
              {currentStep > 8 && (
                <>
                  <h1 className="register-left-heading">Tell Us About Yourself</h1>
                  <p className="register-left-description">
                    We'd love to get to know you better. This information helps us personalize your investment experience.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="register-right">
        <div className="register-form-container">
          <div className="register-form-header">
            <img src={emireqLogo} alt="Emireq" className="register-form-logo" />
            <div className="register-language-selector">
              <span>English(UK)</span>
              <svg width="14" height="10" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {renderStepIndicators()}

          <div className="register-form-content">
            {renderStepContent()}

            <div className="register-form-actions">
              <button 
                type="button" 
                onClick={handleBack}
                className="register-back-btn"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back
              </button>
              
              <button 
                type="button" 
                onClick={handleContinue}
                className="register-continue-btn"
              >
                {currentStep === totalSteps ? 'Submit' : 'Continue'}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <p className="register-support-text">
              Need assistance?{' '}
              <a href="/support" className="register-support-link">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
