import React from 'react';

const RateContent = () => {
    return (
        <div>
            <h1>Rate Our Content</h1>
            <p>We value your feedback. Please rate our content and share your thoughts.</p>
            <form>
                <label htmlFor="rating">Rating:</label>
                <select id="rating" name="rating" required>
                    <option value="5">Excellent</option>
                    <option value="4">Good</option>
                    <option value="3">Average</option>
                    <option value="2">Below Average</option>
                    <option value="1">Poor</option>
                </select>

                <label htmlFor="feedback">Feedback:</label>
                <textarea id="feedback" name="feedback" required></textarea>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default RateContent;
