// backend/index.js
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// app.post('/contact', (req, res) => {
//   const { name, email, message } = req.body;
//   console.log('Contact Form Data:', { name, email, message });
//   res.status(200).json({ message: 'Message received successfully!' });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// app.post('/contact', async (req, res) => {
//   // form se data save karne ka logic
// });
// app.get('/', (req, res) => {
//   res.send('Backend is running 🚀');
// });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./models/Message');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/portfolioDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB successfully connected!');
});
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});


// POST route
// app.post('/contact', async (req, res) => {
//   const { name, email, message } = req.body;
//   console.log("Contact Form Data:", req.body);

//   try {
//     const newMessage = new Message({ name, email, message });
//     await newMessage.save();
//     res.json({ success: true });
//   } catch (err) {
//     console.error("Failed to save:", err);
//     res.status(500).json({ success: false, error: 'Failed to save message' });
//   }
// });
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // MongoDB me save karo
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sr6447868@gmail.com',
        pass: 'chmpxzhcgfaqnawy'   // app password bina space ke
      }
    });

    // Mail options
    const mailOptions = {
      from: 'sr6447868@gmail.com', // apna Gmail
      to: 'sr6447868@gmail.com',   // email receive hoga
      subject: `New Message from ${name}`,
      text: `From: ${email}\n\nMessage: ${message}`,
      replyTo: email
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: '✅ Message saved & email delivered!' });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ message: 'Something went wrong!' });
  }
});


app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
