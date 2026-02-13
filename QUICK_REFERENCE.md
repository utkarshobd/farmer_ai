# 🚀 QUICK START REFERENCE

## Start the Application (Windows)

### Option 1: Using Batch Scripts (Easiest)
1. Double-click `start-backend.bat`
2. Double-click `start-frontend.bat`
3. Browser opens automatically at http://localhost:3000

### Option 2: Manual Start

**Terminal 1 (Backend):**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm install
npm start
```

## 📝 Test Credentials

**Register New User:**
- Phone: 9876543210
- Name: Test Farmer
- Password: test123
- Location: Delhi

**OTP:** Will be shown in green success message

## 🧪 Sample Test Data

### Crop Recommendation (Rice)
```
Nitrogen: 80
Phosphorus: 40
Potassium: 40
pH: 6.5
Rainfall: 200
Temperature: 25
Humidity: 80
```

### Crop Recommendation (Wheat)
```
Nitrogen: 50
Phosphorus: 30
Potassium: 30
pH: 6.5
Rainfall: 50
Temperature: 20
Humidity: 60
```

### Weather Cities
- Delhi
- Mumbai
- Bangalore
- Chennai
- Kolkata

### Disease Detection
Upload any plant image (JPG, PNG)

## 🔗 URLs

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API Health: http://localhost:5000/api/health

## 📂 Important Files

| File | Purpose |
|------|---------|
| `backend/app.py` | Main backend code |
| `frontend/src/App.js` | Main frontend code |
| `README.md` | Full documentation |
| `SETUP_GUIDE.md` | Setup instructions |
| `PROJECT_OVERVIEW.md` | Project details |

## 🛠️ Common Commands

### Backend
```bash
# Activate virtual environment
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
python app.py

# Deactivate virtual environment
deactivate
```

### Frontend
```bash
# Install dependencies
npm install

# Start dev server
npm start

# Build for production
npm run build
```

## ⚡ Features Checklist

- [ ] User Registration with OTP
- [ ] User Login
- [ ] Crop Recommendation
- [ ] Weather Advisory
- [ ] Disease Detection
- [ ] Market Prices
- [ ] AI Chatbot

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 5000 in use | Change port in app.py |
| Module not found | Run `pip install -r requirements.txt` |
| npm errors | Delete node_modules, run `npm install` |
| Database error | Delete .db file, restart backend |

## 📊 API Quick Reference

### Authentication
```bash
# Register
POST /api/register
Body: {"phone", "name", "password", "location"}

# Login
POST /api/login
Body: {"phone", "password"}
```

### Features (Add JWT token in header)
```bash
# Crop Recommendation
POST /api/crop-recommendation
Body: {N, P, K, ph, rainfall, temperature, humidity}

# Weather
GET /api/weather?city=Delhi

# Disease Detection
POST /api/disease-detection
Body: FormData with image

# Market Prices
GET /api/market-prices

# Chatbot
POST /api/chatbot
Body: {"query": "your question"}
```

## 🎯 Project Structure

```
farmer-advisory-system/
├── backend/
│   ├── app.py              ← Main backend
│   └── requirements.txt    ← Python packages
├── frontend/
│   ├── src/
│   │   ├── pages/         ← All pages
│   │   ├── App.js         ← Main app
│   │   └── api.js         ← API config
│   └── package.json       ← Node packages
├── README.md              ← Full docs
├── SETUP_GUIDE.md         ← Setup help
├── start-backend.bat      ← Backend launcher
└── start-frontend.bat     ← Frontend launcher
```

## 💡 Tips

1. **Always start backend first**, then frontend
2. **Keep both terminals open** while using the app
3. **OTP is displayed** in success message (demo mode)
4. **Use Chrome** for best experience
5. **Check console** for any errors

## 📱 Access from Mobile

1. Find your PC's IP address: `ipconfig`
2. Update `frontend/src/api.js`: Change localhost to your IP
3. Access from mobile: `http://YOUR_IP:3000`

## ✅ Verification Steps

1. ✅ Backend shows "Running on http://127.0.0.1:5000"
2. ✅ Frontend opens browser automatically
3. ✅ Can see login page
4. ✅ Can register new user
5. ✅ Can access dashboard
6. ✅ All features work

---

**Need Help?** Check README.md or SETUP_GUIDE.md

**Everything Working?** Start testing all features! 🎉
