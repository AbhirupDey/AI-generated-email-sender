import React, { useState } from 'react';
import axios from 'axios';
import { FiMail, FiSend, FiEdit3, FiUsers } from 'react-icons/fi';
import './App.css';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState('');

  const handleGenerateEmail = async () => {
    if (!prompt.trim()) {
      setMessage('Please enter a prompt for email generation');
      return;
    }

    setIsGenerating(true);
    setMessage('');

    try {
      const response = await axios.post(`${API_BASE}/email/generate`, {
        prompt,
        recipients: recipients.split(',').map(email => email.trim()).filter(Boolean),
        subject
      });

      setGeneratedEmail(response.data.email.content);
      setMessage('Email generated successfully! You can now edit it before sending.');
    } catch (error) {
      setMessage('Error generating email: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendEmail = async () => {
    if (!recipients.trim()) {
      setMessage('Please enter recipient email addresses');
      return;
    }

    if (!generatedEmail.trim()) {
      setMessage('Please generate or enter email content');
      return;
    }

    setIsSending(true);
    setMessage('');

    try {
      const recipientList = recipients.split(',').map(email => email.trim()).filter(Boolean);
      
      await axios.post(`${API_BASE}/email/send`, {
        recipients: recipientList,
        subject: subject || 'Generated Email',
        content: generatedEmail
      });

      setMessage(`Email sent successfully to ${recipientList.length} recipient(s)!`);
      
      // Reset form
      setRecipients('');
      setSubject('');
      setPrompt('');
      setGeneratedEmail('');
    } catch (error) {
      setMessage('Error sending email: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1><FiMail className="icon" /> AI Email Sender</h1>
        <p>Generate professional emails using AI and send them instantly</p>
      </header>

      <main className="main">
        <div className="form-section">
          <div className="input-group">
            <label><FiUsers className="icon" /> Recipients (comma-separated)</label>
            <input
              type="text"
              placeholder="john@example.com, jane@example.com"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Subject</label>
            <input
              type="text"
              placeholder="Email subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Email Prompt</label>
            <textarea
              placeholder="Describe what kind of email you want to generate..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
            />
          </div>

          <button 
            onClick={handleGenerateEmail} 
            disabled={isGenerating}
            className="generate-btn"
          >
            <FiEdit3 className="icon" />
            {isGenerating ? 'Generating...' : 'Generate Email'}
          </button>
        </div>

        {generatedEmail && (
          <div className="email-section">
            <label>Generated Email (Editable)</label>
            <textarea
              value={generatedEmail}
              onChange={(e) => setGeneratedEmail(e.target.value)}
              rows={12}
              className="email-content"
            />
            
            <button 
              onClick={handleSendEmail} 
              disabled={isSending}
              className="send-btn"
            >
              <FiSend className="icon" />
              {isSending ? 'Sending...' : 'Send Email'}
            </button>
          </div>
        )}

        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
