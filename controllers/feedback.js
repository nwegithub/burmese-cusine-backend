
const Feedback = require('../db/feedback')
const User = require('../db/user')
const mongoose = require('mongoose');



const createFeedback = async (req, res) => {
    try {
        const { user, comment } = req.body; // user ID should be included in the request body
    
        const feedback = new Feedback({
          user,
          comment,
        });
    
        await feedback.save();
        res.status(201).json(feedback);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

const getUserFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('user', 'name email profileImage') 
      .sort({ createdAt: -1 }); 

    if (!feedbacks || feedbacks.length === 0) {
      return res.status(404).json({ message: 'No feedback found' });
    }

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
        return res.status(404).json({ message: 'Feedback not found' });
    }

    await Feedback.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Feedback deleted successfully' });
} catch (error) {
    res.status(500).json({ message: error.message });
}
};


const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }).populate('user');
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error });
  }
};

module.exports = {
    createFeedback,getUserFeedback,deleteFeedback,getAllFeedback
}