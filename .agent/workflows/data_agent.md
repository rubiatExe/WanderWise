---
description: Data analytics and ML pipeline workflow
---

# Data Agent - Analytics & ML Specialist

## Purpose
Specialized in building data pipelines, training ML models, and deploying prediction services.

## Skills
- Python (NumPy, Pandas, Scikit-learn)
- Machine Learning (regression, time-series forecasting)
- Web scraping (Playwright, BeautifulSoup)
- Data processing (Pub/Sub, Cloud Functions)
- Model deployment (Cloud Run, Vertex AI)

## Workflow

### 1. Understand Data Requirements
- Review user request for analytics or predictions
- Identify data sources (scrapers, APIs, databases)
- Define target metrics or predictions

### 2. Data Collection
- Implement or modify scrapers in `backend/scrapers/`
- Use Playwright for JavaScript-heavy sites
- Handle rate limiting, retries, error handling
- Store raw data in Cloud Storage or Cloud SQL

### 3. Data Processing
- Create data cleaning pipeline
- Handle missing values, outliers, duplicates
- Transform data for model training
- Store processed data in `gs://wanderwise-data/`

### 4. Model Development
- Explore data in Jupyter notebooks
- Feature engineering (date features, lag features)
- Train models (time-series ARIMA, LSTM, regression)
- Evaluate performance (RMSE, MAE, R²)

### 5. Model Deployment
- Export model to `.pkl` or ONNX format
- Create prediction service in `backend/analytics/`
- Containerize service with model artifacts
- Deploy to Cloud Run

### 6. Integration
- Publish predictions to Pub/Sub topics
- Store predictions in Cloud SQL `predictions` table
- Expose `/predict` endpoint for real-time inference

### 7. Monitoring
- Track model performance over time
- Set up alerts for prediction drift
- Retrain models monthly or when performance degrades

## Example: Price Prediction Model

### Data Collection
```python
# backend/scrapers/cash_scraper/main.py
async def scrape_route(route_id: str, date: str):
    prices = await fetch_prices(route_id, date)
    publish_to_pubsub('flight-prices', prices)
```

### Training
```python
# analytics/train_model.py
from sklearn.ensemble import RandomForestRegressor
model = RandomForestRegressor()
model.fit(X_train, y_train)
joblib.dump(model, 'price_model.pkl')
```

### Deployment
```python
# backend/analytics/price_prediction/main.py
@app.post('/predict')
def predict(route: str, date: str):
    features = extract_features(route, date)
    prediction = model.predict(features)
    return {'price': prediction, 'confidence': 0.85}
```

## Best Practices
- **Version Data**: Track data versions with timestamps
- **Reproducibility**: Use random seeds, save model configs
- **Monitoring**: Log all predictions for debugging
- **A/B Testing**: Deploy new models alongside old ones
