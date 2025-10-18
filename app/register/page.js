"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    program: "",
    year: "",
    phone: "",
    street_address: "",
    city: "",
    province_state: "",
    postal_code: "",
    country: "Canada",
    tagline: "",
    image: ""
  });
  const [errors, setErrors] = useState({});
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));

    if (name === 'city' && value.trim().length >= 3) fetchWeather(value);
    else if (name === 'city') {
      setWeather(null);
      setWeatherError("");
    }
  };

  const fetchWeather = async (city) => {
    setWeatherLoading(true);
    setWeather(null);
    setWeatherError("");
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      if (res.ok) {
        const data = await res.json();
        setWeather(data);
      } else {
        setWeatherError("Weather data not available for this city");
      }
    } catch {
      setWeatherError("Failed to fetch weather data");
    } finally {
      setWeatherLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    ['first_name','last_name','email','program','year','city'].forEach(f => {
      if (!formData[f].trim()) newErrors[f] = `${f.replace('_',' ')} is required`;
    });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) newErrors.email = 'Invalid email';
    const postalRegex = /^[A-Za-z]\d[A-Za-z][\s\-]?\d[A-Za-z]\d$/;
    if (formData.postal_code && !postalRegex.test(formData.postal_code)) newErrors.postal_code = 'Invalid postal code';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Student registered successfully!');
        router.push('/');
      } else {
        if (res.status === 409) setErrors({ email: "Email already registered" });
        else alert(data.error || 'Registration failed');
      }
    } catch {
      alert('Error submitting form. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const programOptions = ["Web Development", "Software Concepts", "Database", "Software Development", "Computer Science", "Data Analytics", "Cybersecurity", "UX Design", "AI & ML", "Cloud Computing", "Network Analysis", "Information Systems", "IT Management"];
  const yearOptions = ["1", "2", "3", "4"];
  const provinceOptions = ["AB","BC","MB","NB","NL","NS","ON","PE","QC","SK","NT","NU","YT"];

  return (
    <div className="container">
      <h1 className="page-title">Student Registration</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-grid">
          {/* Two-column fields */}
          <div className="form-group">
            <label>First Name *</label>
            <input name="first_name" value={formData.first_name} onChange={handleChange} />
            {errors.first_name && <span className="error-msg">{errors.first_name}</span>}
          </div>
          <div className="form-group">
            <label>Last Name *</label>
            <input name="last_name" value={formData.last_name} onChange={handleChange} />
            {errors.last_name && <span className="error-msg">{errors.last_name}</span>}
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Program *</label>
            <select name="program" value={formData.program} onChange={handleChange}>
              <option value="">Select Program</option>
              {programOptions.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            {errors.program && <span className="error-msg">{errors.program}</span>}
          </div>
          <div className="form-group">
            <label>Year *</label>
            <select name="year" value={formData.year} onChange={handleChange}>
              <option value="">Select Year</option>
              {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            {errors.year && <span className="error-msg">{errors.year}</span>}
          </div>
          <div className="form-group">
            <label>Street Address</label>
            <input name="street_address" value={formData.street_address} onChange={handleChange} />
          </div>

          
          <div className="form-group">
            <label>City *</label>
            <input name="city" value={formData.city} onChange={handleChange} />
            {errors.city && <span className="error-msg">{errors.city}</span>}
            {weatherLoading && <div className="weather-msg">Loading weather...</div>}
            {weather && <div className="weather-msg">{weather.name}: {Math.round(weather.main.temp)}°C, {weather.weather[0].description}</div>}
            {weatherError && <div className="error-msg">{weatherError}</div>}
          </div>


          <div className="form-group">
            <label>Province</label>
            <select name="province_state" value={formData.province_state} onChange={handleChange}>
              <option value="">Select Province</option>
              {provinceOptions.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Postal Code</label>
            <input name="postal_code" value={formData.postal_code} onChange={handleChange} />
            {errors.postal_code && <span className="error-msg">{errors.postal_code}</span>}
          </div>
          <div className="form-group">
            <label>Country</label>
            <input name="country" value={formData.country} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Profile Image</label>
            <select name="image" value={formData.image} onChange={handleChange}>
              <option value="/default-avatar.jpg">default</option>
              <option value="/Ava.jpg">Ava</option>
              <option value="Liam.jpg">Liam</option>
              <option value="Sofia.jpg">Sofia</option>
              <option value="Noah.jpg">Noah</option>
              <option value="Emily.jpg">Emily</option>
              <option value="Mateo.jpg">Mateo</option>
              <option value="Isabella.jpg">Isabella</option>
              <option value="Jackson.jpg">Jackson</option>
              <option value="/shivparu.jpg">shivparu</option>
            </select>
          </div>
          <div className="form-group full-width">
            <label>Tagline</label>
            <input name="tagline" value={formData.tagline} onChange={handleChange} />
          </div>
        </div>

        <br/>
        <br/>

        <button type="submit" disabled={isSubmitting} className="btn">
          {isSubmitting ? "Submitting..." : "Register Student"}
        </button>
      </form>
      </div>
  );

}


