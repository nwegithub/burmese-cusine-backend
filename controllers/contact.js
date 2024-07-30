const Contact = require('../db/contact')

exports.createContact = async (req, res) => {
  try {
    const { name, email, text } = req.body;
    const contact = new Contact({ name, email, text });
    await contact.save();
    res.status(201).json({ message: 'Contact request submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting contact request', error });
  }
};
