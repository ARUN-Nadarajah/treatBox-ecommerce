import type { ChangeEvent, FormEvent} from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
type FeedbackForm = {
  name: string;
  email: string;
  phone: string;
  feedback: string;
  rating: number;
};

const Feedback = () => {
  const [form, setForm] = useState<FeedbackForm>({
    name: "",
    email: "",
    phone: "",
    feedback: "",
    rating: 0,
  });

    const [errors, setErrors] = useState<Partial<FeedbackForm>>({});

  const [submitted, setSubmitted] = useState(false);

   // ✅ Auto-fill name and email from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setForm((prev) => ({
        ...prev,
        email: user.email || ''
      }));
    }
  }, []);

const validate = (): Partial<FeedbackForm> => {
    const newErrors: Partial<FeedbackForm> = {};
    if (form.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters.";
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email.";
    if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Phone must be exactly 10 digits.";
    if (form.feedback.trim().length < 10) newErrors.feedback = "Feedback must be at least 10 characters.";
    
    return newErrors;
  };

  // Typed event handler for inputs and textarea
const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // Explicit number parameter type for rating handler
  const handleRating = (stars: number) => {
    setForm((prev) => ({ ...prev, rating: stars }));
    setErrors((prev) => ({ ...prev, rating: undefined }));
  };

   

  // Typed form submit handler
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    const response = await fetch('http://localhost:5001/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error('Failed to submit feedback');
    }

    setSubmitted(true);
    alert("Thank you for your feedback!");
    setTimeout(() => {
      setSubmitted(false);
      setForm({
        name: "",
        email: form.email,
        phone: '',
        feedback: '',
        rating: 0,
      });
    }, 4000);
  } catch (error) {
    alert("Something went wrong. Please try again.");
    console.error('Submit error:', error);
  }
};


  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-8">
       {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-pink-500 font-semibold hover:underline"
      >
        ← Back
      </button>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-10 space-y-10 border border-pink-100"
      >
        <h1 className="text-4xl font-bold text-pink-500 text-center">Share Your Feedback</h1>

        {["name", "email", "phone"].map((field) => (
          <div key={field} className="flex flex-col gap-2">
            <label className="text-pink-600 font-semibold" htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={field}
              name={field}
              type={field === "phone" ? "tel" : field}
              value={form[field as keyof FeedbackForm] as string}
              onChange={handleChange}
              readOnly={field === "email"} // 👈 read-only for auto-filled fields
              className="rounded-md px-4 py-2 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700"
              required
            />
            {errors[field as keyof FeedbackForm] && (
              <span className="text-sm text-red-500">{errors[field as keyof FeedbackForm]}</span>
            )}
          </div>
        ))}

        <div className="flex flex-col gap-2">
          <label className="text-pink-600 font-semibold" htmlFor="feedback">
            Your Feedback
          </label>
          <textarea
            id="feedback"
            name="feedback"
            rows={4}
            value={form.feedback}
            onChange={handleChange}
           className={`rounded-md px-4 py-2 border ${
              errors.feedback ? "border-red-500" : "border-pink-200"
            } focus:outline-none focus:ring-2 ${
              errors.feedback ? "focus:ring-red-300" : "focus:ring-pink-300"
            } text-gray-700 resize-none`}
            required
          />
          {errors.feedback && <p className="text-sm text-red-500">{errors.feedback}</p>}
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
                  form.rating >= star ? "text-yellow-400 scale-110" : "text-gray-300 hover:text-yellow-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
         {errors.feedback && <p className="text-sm text-red-500">{errors.feedback}</p>}
        </div>

        <button
          type="submit"
          disabled={submitted}
          className="w-full bg-gradient-to-r from-pink-400 to-blue-400 text-white font-bold py-3 rounded-xl shadow-md hover:opacity-90 transition disabled:opacity-50"
        >
          {submitted ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default Feedback;