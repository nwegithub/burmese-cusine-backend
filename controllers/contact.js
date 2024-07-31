const Contact = require('../db/contact')

const createContact = async (req, res) => {
  try {
    const { name, email, text } = req.body;
    const contact = new Contact({ name, email, text });
    await contact.save();
    res.status(201).json({ message: 'Contact request submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting contact request', error });
  }
};

const getAllContacts = async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.status(200).json(contacts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

module.exports = {
    createContact,getAllContacts
}
