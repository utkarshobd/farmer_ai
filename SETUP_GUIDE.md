# Quick Setup Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Python Dependencies

Open Command Prompt or Terminal in the project folder and run:

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### Step 2: Start Backend Server

While in the backend folder with virtual environment activated:

```bash
python app.py
```

You should see:
```
* Running on http://127.0.0.1:5000
```

**Keep this terminal open!**

### Step 3: Install Frontend Dependencies

Open a NEW terminal/command prompt:

```bash
cd frontend
npm install
```

This will take 2-3 minutes to install all React dependencies.

### Step 4: Start Frontend Server

After npm install completes:

```bash
npm start
```

Browser will automatically open at `http://localhost:3000`

### Step 5: Test the Application

1. **Register a new account:**
   - Click "Register"
   - Fill in details:
     - Name: Test Farmer
     - Phone: 9876543210
     - Password: test123
     - Location: Delhi
   - Click "Send OTP"
   - Copy the OTP from the green success message
   - Paste OTP and click "Register"

2. **Try Crop Recommendation:**
   - Go to Dashboard
   - Click "Crop Recommendation"
   - Enter sample data:
     - Nitrogen: 80
     - Phosphorus: 40
     - Potassium: 40
     - pH: 6.5
     - Rainfall: 200
     - Temperature: 25
     - Humidity: 80
   - Click "Get Recommendation"
   - You should see "RICE" as recommended crop

3. **Check Weather:**
   - Click "Weather Advisory"
   - Select city and click "Get Weather"
   - View real-time weather data

4. **Test Other Features:**
   - Disease Detection (upload any plant image)
   - Market Prices (view all crop prices)
   - AI Chatbot (ask farming questions)

## ✅ Verification Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can register new user
- [ ] Can login
- [ ] Can access dashboard
- [ ] Crop recommendation works
- [ ] Weather data loads
- [ ] All features accessible

## 🔧 Common Issues

### Issue: "pip not found"
**Solution:** Install Python from python.org (version 3.8+)

### Issue: "npm not found"
**Solution:** Install Node.js from nodejs.org (version 14+)

### Issue: "Port 5000 already in use"
**Solution:** 
1. Open `backend/app.py`
2. Change last line to: `app.run(debug=True, host='0.0.0.0', port=5001)`
3. Update `frontend/src/api.js` line 3 to: `const API_BASE_URL = 'http://localhost:5001/api';`

### Issue: "Module not found" errors
**Solution:** Make sure virtual environment is activated and run:
```bash
pip install -r requirements.txt
```

### Issue: Frontend won't start
**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

## 📱 Mobile Testing

The application is responsive and works on mobile browsers:
1. Find your computer's IP address
2. Update `frontend/src/api.js` to use your IP instead of localhost
3. Access from mobile browser: `http://YOUR_IP:3000`

## 🎯 Next Steps

After successful setup:
1. Explore all features
2. Test with different data
3. Customize the UI in `frontend/src/App.css`
4. Add more crops in `backend/app.py`
5. Integrate real ML models for disease detection

## 📞 Need Help?

Check these files:
- `README.md` - Complete documentation
- `backend/app.py` - Backend API code
- `frontend/src/` - Frontend React code

---

**Happy Farming! 🌾**
