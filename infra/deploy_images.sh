#!/bin/bash
set -e

PROJECT_ID="wanderwise-478707"
REGION="us-central1"
REPO="wanderwise-repo"
BASE_URL="$REGION-docker.pkg.dev/$PROJECT_ID/$REPO"

echo "Authenticating Docker..."
gcloud auth configure-docker $REGION-docker.pkg.dev --quiet

build_and_push() {
  SERVICE=$1
  DIR=$2
  echo "Building $SERVICE..."
  docker build -t $BASE_URL/$SERVICE:latest $DIR --platform linux/amd64
  echo "Pushing $SERVICE..."
  docker push $BASE_URL/$SERVICE:latest
}

# API Services
build_and_push "search-subscription" "../backend/api/search_subscription"
build_and_push "alert-dispatcher" "../backend/api/alert_dispatcher"
build_and_push "rewards-balance" "../backend/api/rewards_balance"

# Scrapers
build_and_push "award-scraper" "../backend/scrapers/award_scraper"
build_and_push "cash-scraper" "../backend/scrapers/cash_scraper"

echo "All images pushed successfully!"
