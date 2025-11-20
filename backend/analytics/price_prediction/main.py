import os
import random
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime, timedelta

app = FastAPI()

class PredictionRequest(BaseModel):
    route_id: str
    date: str # YYYY-MM-DD

class PredictionResponse(BaseModel):
    route_id: str
    date: str
    predicted_price_low: float
    predicted_price_high: float
    current_price_context: str # "High", "Low", "Fair"
    advice: str # "Buy Now", "Wait"
    confidence_score: float

@app.post("/predict", response_model=PredictionResponse)
async def predict_price(request: PredictionRequest):
    """
    Predicts flight prices for a given route and date.
    Currently uses mocked logic for demonstration.
    """
    # Mock Logic: Deterministic "random" based on route length
    seed = len(request.route_id) + int(request.date.replace("-", ""))
    random.seed(seed)
    
    base_price = 100 + (len(request.route_id) * 15)
    volatility = random.uniform(0.8, 1.2)
    
    predicted_low = base_price * volatility
    predicted_high = predicted_low * 1.15
    
    # Simulate "Buy Now" logic
    advice_roll = random.random()
    if advice_roll > 0.6:
        advice = "Buy Now"
        context = "Low"
    elif advice_roll > 0.3:
        advice = "Monitor"
        context = "Fair"
    else:
        advice = "Wait"
        context = "High"

    return {
        "route_id": request.route_id,
        "date": request.date,
        "predicted_price_low": round(predicted_low, 2),
        "predicted_price_high": round(predicted_high, 2),
        "current_price_context": context,
        "advice": advice,
        "confidence_score": round(random.uniform(0.7, 0.95), 2)
    }

@app.get("/")
def health_check():
    return {"status": "ok", "service": "price-prediction"}
