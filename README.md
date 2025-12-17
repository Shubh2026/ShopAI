# 🛍️ Retail AI Shopping Assistant(B2C Agent)

An AI-powered retail assistant embedded directly into an e-commerce interface.  
The system enables conversational product discovery, personalized recommendations, and order tracking using a combination of LLM-based intent understanding, real product data, and deterministic system logic.

---

## ✨ Features

### 🗣️ Conversational Shopping
- Search products using natural language
- Ask follow-up questions without repeating context

### 🧠 AI-Powered Intent Understanding
- Uses **Google Gemini** for intent classification
- Detects search, upsell, follow-up, and tracking intents

### 🎯 Personalized Recommendations
- Maintains session-level memory
- Adapts responses based on prior user interactions

### 🗂️ Product Catalog Integration
- Products are retrieved from a structured data source
- Easily extensible to a database or external inventory service

### 🛡️ Reliable Agent Design
- Combines LLM reasoning with deterministic fallbacks
- Critical flows (e.g., order tracking) do not rely on AI

---

## 🧠 How It Works

1. The user interacts with the chat interface inside the store  
2. Messages are sent to the backend agent via an API  
3. Gemini AI analyzes the message to determine intent and context  
4. Deterministic logic and session memory refine the decision  
5. Relevant products are fetched from the product catalog  
6. The response is returned as structured data and rendered in the UI  

---

## 🧱 Architecture

### Frontend
- React  
- Vite  
- Component-based UI with dynamic product rendering  

### Backend
- Node.js  
- Express  
- TypeScript  

### AI Layer
- Google Gemini (free tier)  
- Used for intent detection and language understanding  

### Data Layer
- JSON-based product catalog  
- Designed to be replaceable with a database (PostgreSQL, MongoDB, etc.)

---

## 🔁 Request Flow
User Input
↓
Chat Interface
↓
/api/chat (Backend Agent)
↓
Gemini Intent Detection
↓
Fallback + Memory Logic
↓
Product Retrieval
↓
Structured Response
↓
UI Rendering

---

## 🛠️ Setup & Run
### Install Dependencies
npm install

### Run Backend
npm run dev

### Run Frontend
npm run dev:client


### Frontend will be available at:

http://localhost:5000


### Backend runs on:

http://localhost:3001

## 🧪 Example Queries
Show me running shoes
Anything better?
Something cheaper
Track my order

## 🔒 Design Principles

Agent-first architecture

LLM where reasoning is needed

Deterministic logic for reliability

Separation of concerns

Scalable and extensible design

## 🔮 Future Improvements

Persistent user profiles

Real-time inventory integration

Pricing and recommendation optimization

Multimodal inputs (image-based search)

## 📌 Notes

This project is designed as a modular foundation for building AI-driven retail experiences and can be adapted for production systems with minimal changes.


## 🚧 Demo Limitations

Add to Cart / Checkout
Cart and checkout actions are UI-only in this demo and are not connected to a real commerce backend or payment system.

User Profile Section
The profile and account-related UI components are present for visual completeness but do not persist user data or authentication.

Static Product Media
Product images are loaded from static URLs for demonstration purposes and are not managed by a media service or CDN.

Session-Only Memory
Personalization is maintained only for the current session. User preferences are not persisted across reloads.


## 📄 License

MIT
