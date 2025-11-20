# Artifact Registry
resource "google_artifact_registry_repository" "repo" {
  location      = var.region
  repository_id = "wanderwise-repo"
  description   = "Docker repository for WanderWise services"
  format        = "DOCKER"
}

# Service Accounts
resource "google_service_account" "scraper_sa" {
  account_id   = "scraper-sa"
  display_name = "Service Account for Scrapers"
}

resource "google_service_account" "api_sa" {
  account_id   = "api-sa"
  display_name = "Service Account for API"
}

# IAM Bindings (Example: Scraper needs to publish to Pub/Sub)
resource "google_project_iam_member" "scraper_pubsub_publisher" {
  project = var.project_id
  role    = "roles/pubsub.publisher"
  member  = "serviceAccount:${google_service_account.scraper_sa.email}"
}
