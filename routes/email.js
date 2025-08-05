const express = require('express');
const Groq = require('groq-sdk');
const nodemailer = require('nodemailer');
const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Generate email using AI
router.post('/generate', async (req, res) => {
  try {
    const { prompt, recipients, subject } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const systemPrompt = `You are a professional email writer. Generate a well-structured, professional email based on the user's prompt. The email should be:
    - Professional and clear
    - Properly formatted with appropriate greetings and closings
    - Concise but comprehensive
    - Appropriate for business communication
    
    Return only the email content without any additional text or explanations.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 1024
    });

    const generatedEmail = completion.choices[0]?.message?.content;

    res.json({
      success: true,
      email: {
        subject: subject || 'Generated Email',
        content: generatedEmail,
        recipients: recipients || []
      }
    });

  } catch (error) {
    console.error('Error generating email:', error);
    res.status(500).json({ error: 'Failed to generate email' });
  }
});

// Send email
router.post('/send', async (req, res) => {
  try {
    const { recipients, subject, content } = req.body;

    if (!recipients || !recipients.length) {
      return res.status(400).json({ error: 'Recipients are required' });
    }

    if (!content) {
      return res.status(400).json({ error: 'Email content is required' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipients.join(', '),
      subject: subject || 'No Subject',
      html: content.replace(/\n/g, '<br>')
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: `Email sent successfully to ${recipients.length} recipient(s)`
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
