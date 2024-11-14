import Faq from "../models/faq.model.js";

// Create a new FAQ
export const createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).send({ message: 'Answer and question are required.' });
    }

    const newFaq = new Faq({
      question,
      answer
    });

    // Save the FAQ to the database
    const savedFaq = await newFaq.save();
    res.status(201).send(savedFaq);
  } catch (error) {
    res.status(500).send({ message: 'Failed to create FAQ', error });
  }
};



// Get all FAQs
export const getFaq = async (req, res) => {
    try {
      const faqs = await Faq.find();
      res.status(200).json(faqs);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve FAQs', error });
    }
  };
  

// Update an existing FAQ by ID
export const updateFaq = async (req, res) => {
    try {
      const { id } = req.params;
      const { answer, question } = req.body;
  
      if (!answer || !question) {
        return res.status(400).json({ message: 'Answer and question are required.' });
      }
  
      const updatedFaq = await Faq.findByIdAndUpdate(
        id,
        { answer, question },
        { new: true, runValidators: true }  
      );
  
      // Check if the FAQ exists
      if (!updatedFaq) {
        return res.status(404).json({ message: 'FAQ not found.' });
      }
  
      res.status(200).json(updatedFaq);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update FAQ', error });
    }
  };
  

// Delete an FAQ by ID
export const deleteFaq = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedFaq = await Faq.findByIdAndDelete(id);
  
      // Check if the FAQ exists
      if (!deletedFaq) {
        return res.status(404).json({ message: 'FAQ not found.' });
      }
  
      res.status(200).json({ message: 'FAQ deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete FAQ', error });
    }
  };
  