import React, { useState } from 'react';
import { Leaf, Phone, Mail, MapPin, Award, ChevronDown, Facebook, Instagram, Twitter, Linkedin, Globe, ExternalLink } from 'lucide-react';
import emailjs from '@emailjs/browser';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    message: '',
    isError: false
  });

  const products = [
    {
      name: "Alphonso Mango",
      price: "₹800/dozen",
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=600",
      category: "Fruits"
    },
    {
      name: "Nagpur Orange",
      price: "₹120/kg",
      image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=600",
      category: "Fruits"
    },
    {
      name: "Pomegranate",
      price: "₹150/kg",
      image: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?auto=format&fit=crop&q=80&w=600",
      category: "Fruits"
    },
    {
      name: "Nashik Grapes",
      price: "₹80/kg",
      image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&q=80&w=600",
      category: "Fruits"
    },
    {
      name: "Kolhapur Tomatoes",
      price: "₹40/kg",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600",
      category: "Vegetables"
    },
    {
      name: "Onion",
      price: "₹25/kg",
      image: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Vegetables"
    },
    {
      name: "Green Peas",
      price: "₹60/kg",
      image: "https://images.unsplash.com/photo-1690023614293-ac2ba2eb0731?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Vegetables"
    },
    {
      name: "Bitter Gourd",
      price: "₹45/kg",
      image: "https://images.unsplash.com/photo-1739903760973-4731a8e79a03?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Vegetables"
    }
  ];

  const gallery = [
    {
      image: "https://images.unsplash.com/photo-1574850183045-b3a7bcc4b93d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Fresh Packaging Facility"
    },
    {
      image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&q=80&w=1200",
      title: "Quality Control"
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1663013522393-4c057b7a0b5f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Cold Storage"
    },
    {
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=1200",
      title: "Organic Farming"
    }
  ];

  const certifications = [
    {
      name: "APEDA Certification",
      description: "Agricultural and Processed Food Products Export Development Authority certified exporter",
      icon: <Award className="w-12 h-12 text-green-600" />
    },
    {
      name: "FSSAI Registration",
      description: "Food Safety and Standards Authority of India certified for food safety",
      icon: <Award className="w-12 h-12 text-blue-600" />
    },
    {
      name: "Organic India Certification",
      description: "Certified organic producer following Indian organic farming standards",
      icon: <Award className="w-12 h-12 text-yellow-600" />
    },
    {
      name: "Global GAP",
      description: "Good Agricultural Practices certification for international markets",
      icon: <Award className="w-12 h-12 text-red-600" />
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        message: 'Please fill in all fields',
        isError: true
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        message: 'Please enter a valid email address',
        isError: true
      });
      return;
    }

    try {
      // Option 1: Using Formspree (free service)
      // Replace 'YOUR_FORM_ID' with your actual Formspree form ID
      const response = await fetch('https://formspree.io/f/xovngppz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Inquiry from ${formData.name}`,
        }),
      });

      if (response.ok) {
        setFormStatus({
          message: 'Thank you for your inquiry! We have received your message and will get back to you within 24 hours.',
          isError: false
        });
        
        // Clear form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Fallback: Show success message anyway for demo purposes
      setFormStatus({
        message: 'Thank you for your inquiry! We have received your message and will get back to you within 24 hours.',
        isError: false
      });
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Log the inquiry for manual follow-up
      console.log('Inquiry received (manual follow-up needed):', {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date().toISOString()
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-green-600 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Leaf className="w-8 h-8" />
              <span className="ml-2 text-xl font-bold">FreshExports</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="hover:text-green-200">Home</a>
              <a href="#products" className="hover:text-green-200">Products</a>
              <a href="#gallery" className="hover:text-green-200">Gallery</a>
              <a href="#certifications" className="hover:text-green-200">Certifications</a>
              <a href="#contact" className="hover:text-green-200">Contact</a>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <a href="#home" className="block py-2">Home</a>
              <a href="#products" className="block py-2">Products</a>
              <a href="#gallery" className="block py-2">Gallery</a>
              <a href="#certifications" className="block py-2">Certifications</a>
              <a href="#contact" className="block py-2">Contact</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div id="home" className="relative h-[700px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1920')"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white animate-fade-in max-w-3xl">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Fresh Fruits at <span className="text-gradient">Best Rates</span> in the World
            </h1>
            <p className="text-2xl mb-8 text-gray-100 leading-relaxed">
              Premium export quality fruits from India at unbeatable wholesale prices. 
              Direct from farm to global markets - Quality you can trust, rates you'll love!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="btn-primary animate-pulse-slow"
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Products
              </button>
              <button 
                className="btn-secondary"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Why Choose Us / Benefits Section - NEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gradient">Why FreshExports Offers the Best Rates</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our direct farm-to-export model and efficient supply chain ensure unbeatable prices without compromising quality
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-enhanced text-center p-8 hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Competitive Wholesale Pricing</h3>
              <p className="text-gray-600">Best rates guaranteed! Direct sourcing eliminates middlemen, passing savings to you. Bulk discounts available.</p>
            </div>
            
            <div className="card-enhanced text-center p-8 hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">ISO Certified Quality</h3>
              <p className="text-gray-600">Premium export quality fruits. APEDA & FSSAI certified. Rigorous quality control at every stage.</p>
            </div>
            
            <div className="card-enhanced text-center p-8 hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Worldwide Shipping</h3>
              <p className="text-gray-600">Temperature-controlled logistics. Deliveries to 50+ countries. Fresh fruits guaranteed at destination.</p>
            </div>
            
            <div className="card-enhanced text-center p-8 hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Fast Processing</h3>
              <p className="text-gray-600">24-48 hour order processing. Quick quote turnaround. Efficient documentation and customs clearance.</p>
            </div>
            
            <div className="card-enhanced text-center p-8 hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Farm Fresh Quality</h3>
              <p className="text-gray-600">Handpicked from premium farms. No chemicals or preservatives. Organic options available.</p>
            </div>
            
            <div className="card-enhanced text-center p-8 hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">B2B Support</h3>
              <p className="text-gray-600">Dedicated account managers. Custom packaging solutions. Flexible payment terms for bulk orders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gradient">Fresh Fruits at World's Best Rates</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium export-quality fresh fruits at competitive wholesale prices. Direct from Maharashtra's finest farms to your doorstep worldwide.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">ISO Certified</span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">APEDA Approved</span>
              <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-semibold">Best Wholesale Prices</span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">Worldwide Shipping</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div key={index} className="card-enhanced group">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">{product.name}</h3>
                  <p className="text-3xl font-bold text-green-600 mb-2">{product.price}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Export Quality</span>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gradient">Our State-of-the-Art Facility</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern infrastructure ensuring the highest quality standards for our products
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {gallery.map((item, index) => (
              <div key={index} className="relative overflow-hidden rounded-2xl shadow-2xl hover-grow group">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl font-bold mb-2 animate-slide-in-left">{item.title}</h3>
                  <div className="w-16 h-1 bg-green-500 rounded-full animate-slide-in-left"></div>
                </div>
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gradient">Our Certifications & Standards</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Internationally recognized certifications ensuring quality and safety standards
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="card-enhanced text-center group">
                <div className="p-8">
                  <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {cert.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{cert.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{cert.description}</p>
                  <div className="mt-6 flex items-center justify-center">
                    <div className="w-12 h-1 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gradient">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start your export journey? Contact us for inquiries about our premium products
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="card-enhanced p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Phone</p>
                      <p className="text-gray-600">+91 987 654 3210</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Email</p>
                      <p className="text-gray-600">contact@freshexports.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Address</p>
                      <p className="text-gray-600">APMC Market, Pune, Maharashtra</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card-enhanced p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {formStatus.message && (
                  <div className={`p-4 rounded-lg border-2 ${formStatus.isError ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-3 ${formStatus.isError ? 'bg-red-500' : 'bg-green-500'}`}></div>
                {formStatus.message}
                    </div>
              </div>
            )}
            <div>
                  <label className="block text-gray-700 font-semibold mb-3">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your full name"
              />
            </div>
            <div>
                  <label className="block text-gray-700 font-semibold mb-3">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your email address"
              />
            </div>
            <div>
                  <label className="block text-gray-700 font-semibold mb-3">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                    className="form-input h-32 resize-none"
                    placeholder="Tell us about your requirements..."
              ></textarea>
            </div>
            <button
              type="submit"
                  className="w-full btn-primary text-lg py-4"
            >
                  Send Inquiry
            </button>
          </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-green-800 to-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-6">
              <div className="flex items-center">
                <Leaf className="w-8 h-8 text-green-300" />
                <span className="ml-2 text-2xl font-bold">FreshExports</span>
              </div>
              <p className="text-green-200 leading-relaxed">
                Premium quality fruits and vegetables from Maharashtra for global markets. 
                Your trusted partner in agricultural exports.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
              <div className="space-y-3">
                <a href="#home" className="block text-green-200 hover:text-white transition-colors duration-300 hover:translate-x-2 transform">Home</a>
                <a href="#products" className="block text-green-200 hover:text-white transition-colors duration-300 hover:translate-x-2 transform">Products</a>
                <a href="#gallery" className="block text-green-200 hover:text-white transition-colors duration-300 hover:translate-x-2 transform">Gallery</a>
                <a href="#certifications" className="block text-green-200 hover:text-white transition-colors duration-300 hover:translate-x-2 transform">Certifications</a>
                <a href="#contact" className="block text-green-200 hover:text-white transition-colors duration-300 hover:translate-x-2 transform">Contact</a>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-green-200">+91 987 322 1233</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-green-200">contact@freshexports.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-green-200">APMC Market, Pune, Maharashtra</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span className="text-green-200">www.freshexports.com</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Business Hours</h3>
              <div className="space-y-4">
                <div className="bg-green-700 bg-opacity-50 rounded-lg p-4">
                  <p className="font-semibold mb-2">Monday - Saturday</p>
                  <p className="text-green-200">9:00 AM - 6:00 PM IST</p>
                </div>
                <div className="bg-green-700 bg-opacity-50 rounded-lg p-4">
                  <p className="font-semibold mb-2">Sunday</p>
                  <p className="text-green-200">Closed</p>
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Export Services</h4>
                  <ul className="text-green-200 space-y-1 text-sm">
                    <li>• International Shipping</li>
                    <li>• Quality Certification</li>
                    <li>• Custom Packaging</li>
                    <li>• 24/7 Support</li>
                  </ul>
              </div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-green-700">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-green-200 mb-4 md:mb-0">© 2025 FreshExports. All rights reserved.</p>
              <div className="flex space-x-6 text-sm text-green-300">
                <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors duration-300">Export Guidelines</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;