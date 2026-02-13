from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import sqlite3
import hashlib
import random
import requests
from datetime import datetime, timedelta
import os
import pickle
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'farmer-advisory-secret-key-2024'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)
CORS(app)
jwt = JWTManager(app)

# Database initialization
def init_db():
    conn = sqlite3.connect('farmer_advisory.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  phone TEXT UNIQUE NOT NULL,
                  name TEXT NOT NULL,
                  password TEXT NOT NULL,
                  location TEXT,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS soil_data
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  user_id INTEGER,
                  nitrogen REAL,
                  phosphorus REAL,
                  potassium REAL,
                  ph REAL,
                  rainfall REAL,
                  temperature REAL,
                  humidity REAL,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  FOREIGN KEY(user_id) REFERENCES users(id))''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS otp_store
                 (phone TEXT PRIMARY KEY,
                  otp TEXT NOT NULL,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    
    conn.commit()
    conn.close()

init_db()

# OTP Storage (in-memory for demo)
otp_storage = {}

# Crop recommendation data
CROP_DATA = {
    'rice': {'N': 80, 'P': 40, 'K': 40, 'ph': 6.5, 'rainfall': 200, 'temp': 25, 'humidity': 80},
    'wheat': {'N': 50, 'P': 30, 'K': 30, 'ph': 6.5, 'rainfall': 50, 'temp': 20, 'humidity': 60},
    'maize': {'N': 70, 'P': 50, 'K': 40, 'ph': 6.0, 'rainfall': 80, 'temp': 22, 'humidity': 65},
    'cotton': {'N': 60, 'P': 30, 'K': 50, 'ph': 7.0, 'rainfall': 70, 'temp': 28, 'humidity': 70},
    'sugarcane': {'N': 90, 'P': 45, 'K': 60, 'ph': 6.5, 'rainfall': 150, 'temp': 30, 'humidity': 75},
    'potato': {'N': 50, 'P': 50, 'K': 50, 'ph': 5.5, 'rainfall': 60, 'temp': 18, 'humidity': 70},
    'tomato': {'N': 40, 'P': 60, 'K': 40, 'ph': 6.0, 'rainfall': 50, 'temp': 24, 'humidity': 65},
}

# Disease detection data
DISEASE_DATA = {
    'healthy': {'description': 'Plant is healthy', 'treatment': 'Continue regular care'},
    'leaf_blight': {'description': 'Leaf blight detected', 'treatment': 'Apply fungicide, remove infected leaves'},
    'rust': {'description': 'Rust disease detected', 'treatment': 'Use copper-based fungicide'},
    'powdery_mildew': {'description': 'Powdery mildew detected', 'treatment': 'Apply sulfur-based fungicide'},
}

# Market price data (mock)
MARKET_PRICES = {
    'rice': {'current': 2500, 'trend': 'up', 'prediction': 2600},
    'wheat': {'current': 2200, 'trend': 'stable', 'prediction': 2200},
    'maize': {'current': 1800, 'trend': 'down', 'prediction': 1750},
    'cotton': {'current': 5500, 'trend': 'up', 'prediction': 5700},
    'sugarcane': {'current': 3000, 'trend': 'stable', 'prediction': 3000},
    'potato': {'current': 1500, 'trend': 'up', 'prediction': 1600},
    'tomato': {'current': 2000, 'trend': 'down', 'prediction': 1900},
}

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    phone = data.get('phone')
    name = data.get('name')
    password = data.get('password')
    location = data.get('location', '')
    
    if not phone or not name or not password:
        return jsonify({'error': 'Missing required fields'}), 400
    
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    
    try:
        conn = sqlite3.connect('farmer_advisory.db')
        c = conn.cursor()
        c.execute('INSERT INTO users (phone, name, password, location) VALUES (?, ?, ?, ?)',
                  (phone, name, hashed_password, location))
        conn.commit()
        user_id = c.lastrowid
        conn.close()
        
        token = create_access_token(identity=user_id)
        return jsonify({'message': 'Registration successful', 'token': token, 'user': {'id': user_id, 'name': name, 'phone': phone}}), 201
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Phone number already registered'}), 400

@app.route('/api/send-otp', methods=['POST'])
def send_otp():
    data = request.json
    phone = data.get('phone')
    
    if not phone:
        return jsonify({'error': 'Phone number required'}), 400
    
    otp = str(random.randint(100000, 999999))
    otp_storage[phone] = {'otp': otp, 'timestamp': datetime.now()}
    
    # In production, send SMS via API
    print(f"OTP for {phone}: {otp}")
    
    return jsonify({'message': 'OTP sent successfully', 'otp': otp}), 200  # Remove otp in production

@app.route('/api/verify-otp', methods=['POST'])
def verify_otp():
    data = request.json
    phone = data.get('phone')
    otp = data.get('otp')
    
    if not phone or not otp:
        return jsonify({'error': 'Phone and OTP required'}), 400
    
    stored = otp_storage.get(phone)
    if not stored:
        return jsonify({'error': 'OTP not found or expired'}), 400
    
    if stored['otp'] == otp:
        del otp_storage[phone]
        return jsonify({'message': 'OTP verified successfully'}), 200
    
    return jsonify({'error': 'Invalid OTP'}), 400

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    phone = data.get('phone')
    password = data.get('password')
    
    if not phone or not password:
        return jsonify({'error': 'Phone and password required'}), 400
    
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    
    conn = sqlite3.connect('farmer_advisory.db')
    c = conn.cursor()
    c.execute('SELECT id, name, phone FROM users WHERE phone = ? AND password = ?',
              (phone, hashed_password))
    user = c.fetchone()
    conn.close()
    
    if user:
        token = create_access_token(identity=user[0])
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': {'id': user[0], 'name': user[1], 'phone': user[2]}
        }), 200
    
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/crop-recommendation', methods=['POST'])
@jwt_required()
def crop_recommendation():
    data = request.json
    user_id = get_jwt_identity()
    
    N = float(data.get('nitrogen', 0))
    P = float(data.get('phosphorus', 0))
    K = float(data.get('potassium', 0))
    ph = float(data.get('ph', 0))
    rainfall = float(data.get('rainfall', 0))
    temperature = float(data.get('temperature', 0))
    humidity = float(data.get('humidity', 0))
    
    # Save soil data
    conn = sqlite3.connect('farmer_advisory.db')
    c = conn.cursor()
    c.execute('''INSERT INTO soil_data (user_id, nitrogen, phosphorus, potassium, ph, rainfall, temperature, humidity)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)''',
              (user_id, N, P, K, ph, rainfall, temperature, humidity))
    conn.commit()
    conn.close()
    
    # Simple recommendation algorithm
    scores = {}
    for crop, ideal in CROP_DATA.items():
        score = 0
        score -= abs(N - ideal['N']) * 0.5
        score -= abs(P - ideal['P']) * 0.5
        score -= abs(K - ideal['K']) * 0.5
        score -= abs(ph - ideal['ph']) * 10
        score -= abs(rainfall - ideal['rainfall']) * 0.2
        score -= abs(temperature - ideal['temp']) * 2
        score -= abs(humidity - ideal['humidity']) * 0.5
        scores[crop] = score
    
    recommended_crop = max(scores, key=scores.get)
    top_3 = sorted(scores.items(), key=lambda x: x[1], reverse=True)[:3]
    
    return jsonify({
        'recommended_crop': recommended_crop,
        'top_recommendations': [{'crop': c, 'score': round(s, 2)} for c, s in top_3],
        'fertilizer_suggestion': get_fertilizer_suggestion(N, P, K, ph)
    }), 200

def get_fertilizer_suggestion(N, P, K, ph):
    suggestions = []
    
    if N < 50:
        suggestions.append('Apply Urea (46-0-0) - 50 kg/acre')
    elif N > 100:
        suggestions.append('Reduce nitrogen fertilizer')
    
    if P < 30:
        suggestions.append('Apply DAP (18-46-0) - 40 kg/acre')
    elif P > 60:
        suggestions.append('Reduce phosphorus fertilizer')
    
    if K < 30:
        suggestions.append('Apply MOP (0-0-60) - 30 kg/acre')
    elif K > 60:
        suggestions.append('Reduce potassium fertilizer')
    
    if ph < 5.5:
        suggestions.append('Apply lime to increase pH')
    elif ph > 7.5:
        suggestions.append('Apply sulfur to decrease pH')
    
    if not suggestions:
        suggestions.append('Soil nutrients are balanced. Maintain current practices.')
    
    return suggestions

@app.route('/api/weather', methods=['GET'])
@jwt_required()
def get_weather():
    city = request.args.get('city', 'Delhi')
    
    # Using Open-Meteo API (free, no API key required)
    # First get coordinates for the city (simplified)
    city_coords = {
        'delhi': {'lat': 28.6139, 'lon': 77.2090},
        'mumbai': {'lat': 19.0760, 'lon': 72.8777},
        'bangalore': {'lat': 12.9716, 'lon': 77.5946},
        'chennai': {'lat': 13.0827, 'lon': 80.2707},
        'kolkata': {'lat': 22.5726, 'lon': 88.3639},
    }
    
    coords = city_coords.get(city.lower(), city_coords['delhi'])
    
    try:
        url = f"https://api.open-meteo.com/v1/forecast?latitude={coords['lat']}&longitude={coords['lon']}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia/Kolkata"
        response = requests.get(url, timeout=5)
        weather_data = response.json()
        
        current = weather_data['current']
        daily = weather_data['daily']
        
        advisory = generate_weather_advisory(current, daily)
        
        return jsonify({
            'city': city,
            'current': {
                'temperature': current['temperature_2m'],
                'humidity': current['relative_humidity_2m'],
                'precipitation': current['precipitation'],
                'wind_speed': current['wind_speed_10m']
            },
            'forecast': {
                'max_temp': daily['temperature_2m_max'][0],
                'min_temp': daily['temperature_2m_min'][0],
                'precipitation': daily['precipitation_sum'][0]
            },
            'advisory': advisory
        }), 200
    except Exception as e:
        return jsonify({'error': 'Weather data unavailable', 'message': str(e)}), 500

def generate_weather_advisory(current, daily):
    advisories = []
    
    temp = current['temperature_2m']
    humidity = current['relative_humidity_2m']
    precipitation = daily['precipitation_sum'][0]
    
    if temp > 35:
        advisories.append('High temperature alert. Ensure adequate irrigation.')
    elif temp < 10:
        advisories.append('Low temperature alert. Protect sensitive crops from frost.')
    
    if humidity > 80:
        advisories.append('High humidity. Monitor for fungal diseases.')
    elif humidity < 30:
        advisories.append('Low humidity. Increase irrigation frequency.')
    
    if precipitation > 50:
        advisories.append('Heavy rainfall expected. Ensure proper drainage.')
    elif precipitation > 10:
        advisories.append('Moderate rainfall expected. Adjust irrigation accordingly.')
    else:
        advisories.append('No significant rainfall. Maintain regular irrigation.')
    
    return advisories

@app.route('/api/disease-detection', methods=['POST'])
@jwt_required()
def disease_detection():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    
    try:
        # Simple image analysis (mock AI detection)
        img = Image.open(io.BytesIO(file.read()))
        
        # Mock detection based on image properties
        diseases = list(DISEASE_DATA.keys())
        detected = random.choice(diseases)
        
        disease_info = DISEASE_DATA[detected]
        
        return jsonify({
            'disease': detected,
            'description': disease_info['description'],
            'treatment': disease_info['treatment'],
            'confidence': round(random.uniform(0.75, 0.98), 2)
        }), 200
    except Exception as e:
        return jsonify({'error': 'Image processing failed', 'message': str(e)}), 500

@app.route('/api/market-prices', methods=['GET'])
@jwt_required()
def market_prices():
    crop = request.args.get('crop', None)
    
    if crop and crop.lower() in MARKET_PRICES:
        data = MARKET_PRICES[crop.lower()]
        return jsonify({
            'crop': crop,
            'current_price': data['current'],
            'trend': data['trend'],
            'predicted_price': data['prediction'],
            'unit': 'INR per quintal'
        }), 200
    
    return jsonify({'prices': MARKET_PRICES}), 200

@app.route('/api/chatbot', methods=['POST'])
@jwt_required()
def chatbot():
    data = request.json
    query = data.get('query', '').lower()
    
    # Simple rule-based chatbot
    responses = {
        'weather': 'You can check weather updates in the Weather section. It provides current conditions and forecasts.',
        'crop': 'For crop recommendations, go to Crop Recommendation and enter your soil data.',
        'disease': 'To detect plant diseases, upload a photo of the affected plant in the Disease Detection section.',
        'price': 'Market prices are available in the Market Prices section with trend predictions.',
        'fertilizer': 'Fertilizer suggestions are provided with crop recommendations based on your soil analysis.',
        'irrigation': 'Irrigation needs depend on crop type, soil moisture, and weather. Check weather advisory for guidance.',
        'pest': 'For pest control, identify the pest first. Common solutions include neem oil, biological control, or appropriate pesticides.',
    }
    
    for keyword, response in responses.items():
        if keyword in query:
            return jsonify({'response': response}), 200
    
    return jsonify({
        'response': 'I can help you with weather updates, crop recommendations, disease detection, market prices, and farming advice. What would you like to know?'
    }), 200

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
