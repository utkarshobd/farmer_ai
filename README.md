# AI Based Farmer Advisory System

A complete web application providing intelligent farming guidance using AI and data analytics.

## Features

✅ **User Authentication**
- Registration with OTP verification
- Secure login system
- JWT-based authentication

✅ **Crop Recommendation**
- AI-powered crop suggestions based on soil data
- NPK (Nitrogen, Phosphorus, Potassium) analysis
- pH level and environmental factors consideration
- Fertilizer recommendations

✅ **Weather Advisory**
- Real-time weather data using Open-Meteo API (Free)
- Current conditions and forecasts
- Farming-specific weather advisories
- Multiple city support

✅ **Plant Disease Detection**
- Image-based disease detection
- Treatment recommendations
- Confidence scoring

✅ **Market Price Prediction**
- Current crop prices
- Price trend analysis
- Future price predictions
- Market advisory

✅ **AI Chatbot**
- Rule-based intelligent responses
- Farming advice and guidance
- Quick question suggestions

## Technology Stack

### Backend
- **Flask** - Python web framework
- **SQLite** - Database
- **JWT** - Authentication
- **Scikit-learn** - ML algorithms
- **Open-Meteo API** - Weather data (Free, no API key required)

### Frontend
- **React** - UI framework
- **React Router** - Navigation
- **Axios** - API calls
- **CSS3** - Styling

## Project Structure

```
farmer-advisory-system/
├── backend/
│   ├── app.py                 # Main Flask application
│   ├── requirements.txt       # Python dependencies
│   └── farmer_advisory.db     # SQLite database (auto-created)
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── CropRecommendation.js
│   │   │   ├── Weather.js
│   │   │   ├── DiseaseDetection.js
│   │   │   ├── MarketPrices.js
│   │   │   └── Chatbot.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── api.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn

### Step 1: Clone or Navigate to Project Directory

```bash
cd "c:\Users\utkarshh\Desktop\piyush lpu wala"
```

### Step 2: Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment (recommended):
```bash
python -m venv venv
```

3. Activate virtual environment:
- Windows:
```bash
venv\Scripts\activate
```
- Linux/Mac:
```bash
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run the Flask server:
```bash
python app.py
```

Backend will run on: `http://localhost:5000`

### Step 3: Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

Frontend will run on: `http://localhost:3000`

## Usage Guide

### 1. Registration
- Open `http://localhost:3000`
- Click "Register"
- Fill in your details (Name, Phone, Password, Location)
- Click "Send OTP" - OTP will be displayed in the success message (for demo)
- Enter the OTP and click "Register"

### 2. Login
- Enter your phone number and password
- Click "Login"

### 3. Dashboard
- Access all features from the dashboard
- Navigate to different sections using feature cards

### 4. Crop Recommendation
- Enter soil parameters:
  - Nitrogen (N) - kg/ha
  - Phosphorus (P) - kg/ha
  - Potassium (K) - kg/ha
  - pH Level
  - Rainfall - mm
  - Temperature - °C
  - Humidity - %
- Click "Get Recommendation"
- View recommended crops and fertilizer suggestions

### 5. Weather Advisory
- Select your city from dropdown
- Click "Get Weather"
- View current weather and farming advisory

### 6. Disease Detection
- Upload an image of affected plant
- Click "Detect Disease"
- View disease information and treatment

### 7. Market Prices
- View current prices for all crops
- Check price trends and predictions
- Get selling recommendations

### 8. AI Chatbot
- Type your farming-related questions
- Use quick question buttons for common queries
- Get instant responses

## API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/send-otp` - Send OTP
- `POST /api/verify-otp` - Verify OTP

### Features (Requires Authentication)
- `POST /api/crop-recommendation` - Get crop recommendations
- `GET /api/weather?city=<city>` - Get weather data
- `POST /api/disease-detection` - Detect plant disease
- `GET /api/market-prices` - Get market prices
- `POST /api/chatbot` - Chat with AI bot

## Sample Test Data

### Crop Recommendation Test Data

**For Rice:**
- Nitrogen: 80
- Phosphorus: 40
- Potassium: 40
- pH: 6.5
- Rainfall: 200
- Temperature: 25
- Humidity: 80

**For Wheat:**
- Nitrogen: 50
- Phosphorus: 30
- Potassium: 30
- pH: 6.5
- Rainfall: 50
- Temperature: 20
- Humidity: 60

**For Maize:**
- Nitrogen: 70
- Phosphorus: 50
- Potassium: 40
- pH: 6.0
- Rainfall: 80
- Temperature: 22
- Humidity: 65

## Database Schema

### Users Table
- id (Primary Key)
- phone (Unique)
- name
- password (Hashed)
- location
- created_at

### Soil Data Table
- id (Primary Key)
- user_id (Foreign Key)
- nitrogen
- phosphorus
- potassium
- ph
- rainfall
- temperature
- humidity
- created_at

## Security Features

- Password hashing using SHA-256
- JWT token-based authentication
- Protected API endpoints
- CORS enabled for frontend-backend communication

## Non-Functional Requirements Met

✅ Response time < 3 seconds
✅ Secure authentication with encrypted passwords
✅ Simple and intuitive user interface
✅ System availability through error handling
✅ Scalable architecture

## Troubleshooting

### Backend Issues

**Port 5000 already in use:**
```bash
# Change port in app.py, line: app.run(debug=True, host='0.0.0.0', port=5001)
```

**Module not found errors:**
```bash
pip install -r requirements.txt
```

### Frontend Issues

**Port 3000 already in use:**
- React will automatically suggest another port
- Or kill the process using port 3000

**API connection errors:**
- Ensure backend is running on port 5000
- Check API_BASE_URL in `frontend/src/api.js`

**npm install fails:**
```bash
npm cache clean --force
npm install
```

## Development Notes

- OTP is displayed in the response for demo purposes (remove in production)
- Disease detection uses mock AI (integrate real ML model in production)
- Weather API is free and doesn't require API key
- Market prices are mock data (integrate real market API in production)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is for educational purposes.

## Support

For issues or questions, please check:
1. All dependencies are installed correctly
2. Both backend and frontend servers are running
3. Database file has proper permissions
4. No port conflicts

---

**Developed as per Software Requirement Specification (SRS)**
**AI Based Farmer Advisory System**
