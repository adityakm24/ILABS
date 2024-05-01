import React from "react";
import "./feedback.css"; // Import CSS file

export default function FeedbackForm() {
  return (
    <div className="container mt-5">
      <h2 className="text-center form-label">Feedback Form</h2>
      <form>
        {/* Email Section */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" id="email" className="form-control" placeholder="Enter your email" required />
        </div>

        {/* Lab Staff Section */}
        <div className="mb-3">
          <label htmlFor="lab_staff" className="form-label">How would you rate the assistance provided by lab staff?</label>
          <select id="lab_staff" className="form-select" required>
            <option value="">Select rating</option>
            <option value="5">Excellent</option>
            <option value="4">Good</option>
            <option value="3">Average</option>
            <option value="2">Poor</option>
            <option value="1">Very Poor</option>
          </select>
        </div>

        {/* Facilities Section */}
        <div className="mb-3">
          <label htmlFor="facilities" className="form-label">How satisfied are you with the facilities provided?</label>
          <select id="facilities" className="form-select" required>
            <option value="">Select satisfaction level</option>
            <option value="5">Very Satisfied</option>
            <option value="4">Satisfied</option>
            <option value="3">Neutral</option>
            <option value="2">Dissatisfied</option>
            <option value="1">Very Dissatisfied</option>
          </select>
        </div>

        {/* Satisfaction Section */}
        <div className="mb-3">
          <label className="form-label">Overall, how satisfied are you with your experience in the lab?</label>
          <div className="form-check">
            <input type="radio" id="satisfaction_5" name="satisfaction" value="5" required className="form-check-input" />
            <label htmlFor="satisfaction_5" className="form-check-label">5 - Very Satisfied</label>
          </div>
          <div className="form-check">
            <input type="radio" id="satisfaction_4" name="satisfaction" value="4" className="form-check-input" />
            <label htmlFor="satisfaction_4" className="form-check-label">4 - Satisfied</label>
          </div>
          <div className="form-check">
            <input type="radio" id="satisfaction_3" name="satisfaction" value="3" className="form-check-input" />
            <label htmlFor="satisfaction_3" className="form-check-label">3 - Neutral</label>
          </div>
          <div className="form-check">
            <input type="radio" id="satisfaction_2" name="satisfaction" value="2" className="form-check-input" />
            <label htmlFor="satisfaction_2" className="form-check-label">2 - Dissatisfied</label>
          </div>
          <div className="form-check">
            <input type="radio" id="satisfaction_1" name="satisfaction" value="1" className="form-check-input" />
            <label htmlFor="satisfaction_1" className="form-check-label">1 - Very Dissatisfied</label>
          </div>
        </div>

        {/* Rating Scales Section */}
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">Rate the lab environment:</label>
          <div className="px-4 py-2 bg-gray-100 rounded-lg">
          <input type="range" id="rating" className="form-range w-full cursor-pointer" style={{ height: '8px', cursor: 'pointer' }}  min="0"
              max="10"
              step="1"
              required
            />
          </div>
        </div>

        {/* Open-ended Text Fields */}
        <div className="mb-3">
          <label htmlFor="comments" className="form-label">Additional Comments:</label>
          <textarea id="comments" className="form-control" rows={4} placeholder="Enter your comments"></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-4">  {/* Adding mt-4 for some spacing before the button */}
          <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md">Submit</button>
        </div>

      </form>
    </div>
  );
}
