                import React, { useState } from 'react';
                import { useLocation } from 'react-router-dom';

                const Feedback = () => {
                const location = useLocation();
                const product = location.state || {};

                const [form, setForm] = useState({
                    name: '',
                    email: '',
                    phone: '',
                    feedback: '',
                    rating: 0,
                });
                const [submitted, setSubmitted] = useState(false);

                const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                    const { name, value } = e.target;
                    setForm({ ...form, [name]: value });
                  };

                const handleRating = (stars: number) => {
                    setForm({ ...form, rating: stars });
                };

                const handleSubmit = async (e: React.FormEvent) => {
                    e.preventDefault();
                    try {
                    const feedbackData = { ...form, productName: product.name || 'N/A' };

                    const res = await fetch('http://localhost:5000/api/feedback', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(feedbackData),
                    });

                    if (res.ok) {
                        setSubmitted(true);
                        setForm({ name: '', email: '', phone: '', feedback: '', rating: 0 });
                        setTimeout(() => setSubmitted(false), 4000);
                        alert('Thank you for your feedback!');
                    } else {
                        alert('Failed to submit feedback. Try again.');
                    }
                    } catch (error) {
                    console.error('Error submitting feedback:', error);
                    alert('Server error. Please try again later.');
                    }
                };

                return (
                    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-8">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-3xl bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-10 space-y-10 border border-pink-100"
                    >
                        <h1 className="text-4xl font-bold text-pink-500 text-center">Share Your Feedback</h1>

                        {/* Show Product Details if exists */}
                        {product?.name && (
                        <div className="flex flex-col items-center text-center">
                            <img src={product.image} alt={product.name} className="w-40 rounded-xl shadow-md mb-4" />
                            <h2 className="text-xl font-semibold text-pink-600">{product.name}</h2>
                            <p className="text-md font-medium text-gray-700 mb-4">Rs. {product.price?.toLocaleString()}</p>
                        </div>
                        )}

                        {/* User Fields */}
                        {['name', 'email', 'phone'].map((field) => (
                        <div key={field} className="flex flex-col gap-2">
                            <label className="text-pink-600 font-semibold" htmlFor={field}>
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                            id={field}
                            name={field}
                            type={field === 'phone' ? 'tel' : field}
                            value={form[field]}
                            onChange={handleChange}
                            className="rounded-md px-4 py-2 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700"
                            required
                            />
                        </div>
                        ))}

                        {/* Feedback Field */}
                        <div className="flex flex-col gap-2">
                        <label className="text-pink-600 font-semibold" htmlFor="feedback">Your Feedback</label>
                        <textarea
                            id="feedback"
                            name="feedback"
                            rows="4"
                            value={form.feedback}
                            onChange={handleChange}
                            className="rounded-md px-4 py-2 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700 resize-none"
                            required
                        ></textarea>
                        </div>

                        {/* Rating */}
                        <div className="flex flex-col items-center gap-2">
                        <label className="text-pink-600 font-semibold">Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                type="button"
                                key={star}
                                onClick={() => handleRating(star)}
                                className={`text-3xl transition transform ${
                                form.rating >= star ? 'text-yellow-400 scale-110' : 'text-gray-300 hover:text-yellow-300'
                                }`}
                            >
                                ★
                            </button>
                            ))}
                        </div>
                        </div>

                        {/* Submit Button */}
                        <button
                        type="submit"
                        disabled={submitted}
                        className="w-full bg-gradient-to-r from-pink-400 to-blue-400 text-white font-bold py-3 rounded-xl shadow-md hover:opacity-90 transition disabled:opacity-50"
                        >
                        {submitted ? 'Submitting...' : 'Submit Feedback'}
                        </button>
                    </form>
                    </div>
                );
                };

                export default Feedback;
