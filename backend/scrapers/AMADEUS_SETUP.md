# Amadeus API Setup Guide

## Step 1: Create Amadeus Account
1. Go to https://developers.amadeus.com/register
2. Sign up for a free account
3. Verify your email

## Step 2: Create an Application
1. Log in to the Amadeus Self-Service portal
2. Click "Create New App"
3. Name it "WanderWise"
4. Select "Self-Service" tier (free)

## Step 3: Get API Credentials
1. After creating the app, you'll see:
   - **API Key** (Client ID)
   - **API Secret** (Client Secret)
2. Copy both values

## Step 4: Set Environment Variables
For local testing:
```bash
export AMADEUS_API_KEY="your_api_key_here"
export AMADEUS_API_SECRET="your_api_secret_here"
```

For Cloud Run deployment, add these to Terraform:
```hcl
resource "google_cloud_run_service" "cash_scraper" {
  # ... existing config ...
  
  template {
    spec {
      containers {
        env {
          name  = "AMADEUS_API_KEY"
          value = var.amadeus_api_key
        }
        env {
          name  = "AMADEUS_API_SECRET"
          value = var.amadeus_api_secret
        }
      }
    }
  }
}
```

## Step 5: Test Locally
```bash
cd backend/scrapers/cash_scraper
pip install -r requirements.txt
uvicorn main:app --reload --port 8080
```

Then visit: http://localhost:8080/test

## API Limits (Free Tier)
- 2,000 API calls per month
- Rate limit: 10 calls per second
- Test environment (switch to production when ready)

## Next Steps
Once you have the credentials:
1. Set the environment variables
2. Rebuild the Docker image
3. Redeploy to Cloud Run
4. Test with real searches!
