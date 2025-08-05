# AI Email Sender

A full-stack application that generates professional emails using AI and sends them to specified recipients.

## 🚀 Features

- AI-powered email generation using Groq
- Editable generated emails
- Multiple recipient support
- Professional email templates
- Real-time email sending
- Responsive web interface

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Axios, React Icons
- **Backend**: Node.js, Express
- **AI**: Groq SDK (Llama3-8B model)
- **Email**: Nodemailer
- **Security**: Helmet, CORS, Rate limiting

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Groq API key
- Gmail account (for email sending)

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ai-email-sender.git
cd ai-email-sender
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Install frontend dependencies

```bash
cd client
npm install
cd ..
```

### 4. Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your credentials:
   - **GROQ_API_KEY**: Get from [Groq Console](https://console.groq.com/)
   - **EMAIL_USER**: Your Gmail address
   - **EMAIL_PASS**: Your Gmail app password (not your regular password)

### 5. Gmail Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in your `.env` file

### 6. Run the application

#### Option 1: Run both servers simultaneously
```bash
npm install concurrently
npm run dev:both
```

#### Option 2: Run servers separately

Terminal 1 (Backend):
```bash
npm run dev
```

Terminal 2 (Frontend):
```bash
npm run client:dev
```

### 7. Access the application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🚀 Usage

1. **Enter Recipients**: Add comma-separated email addresses
2. **Add Subject**: Write an email subject line
3. **Create Prompt**: Describe the email you want to generate
4. **Generate Email**: Click "Generate Email" to create AI content
5. **Edit & Send**: Modify the generated email if needed and send

## 📡 API Endpoints

- `POST /api/email/generate` - Generate email using AI
- `POST /api/email/send` - Send email to recipients
- `GET /api/health` - Health check

## 🔒 Security Features

- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Helmet security headers
- Environment variable protection
- Input validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

1. **"nodemailer.createTransporter is not a function"**
   - Fixed: Use `createTransport` instead of `createTransporter`

2. **"Model decommissioned" error**
   - Fixed: Updated to use `llama3-8b-8192` model

3. **PowerShell command issues**
   - Use individual commands instead of `&&` operator
   - Or use the npm scripts provided

### Getting Help

- Check the [Issues](https://github.com/yourusername/ai-email-sender/issues) page
- Create a new issue if you encounter problems

## 📸 Screenshots

![AI Email Sender Interface](https://via.placeholder.com/800x400?text=Add+Your+Screenshot+Here)

---

⭐ **Star this repository if you found it helpful!**
