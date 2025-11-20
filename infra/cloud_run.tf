# Cloud Run Services

# Search Subscription Service
resource "google_cloud_run_service" "search_subscription" {
  name     = "search-subscription"
  location = var.region

  template {
    spec {
      containers {
        image = "${var.region}-docker.pkg.dev/${var.project_id}/wanderwise-repo/search-subscription:latest"
        env {
          name  = "DB_HOST"
          value = google_sql_database_instance.instance.private_ip_address
        }
        env {
          name  = "DB_USER"
          value = google_sql_user.users.name
        }
        env {
          name  = "DB_PASS"
          value = google_sql_user.users.password
        }
        env {
          name  = "DB_NAME"
          value = google_sql_database.database.name
        }
      }
    }
    metadata {
      annotations = {
        "run.googleapis.com/vpc-access-connector" = google_vpc_access_connector.connector.name
        "run.googleapis.com/vpc-access-egress"    = "private-ranges-only"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
  
  depends_on = [google_project_service.services]
}

# Alert Dispatcher Service
resource "google_cloud_run_service" "alert_dispatcher" {
  name     = "alert-dispatcher"
  location = var.region

  template {
    spec {
      containers {
        image = "${var.region}-docker.pkg.dev/${var.project_id}/wanderwise-repo/alert-dispatcher:latest"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [google_project_service.services]
}

# Rewards Balance Service
resource "google_cloud_run_service" "rewards_balance" {
  name     = "rewards-balance"
  location = var.region

  template {
    spec {
      containers {
        image = "${var.region}-docker.pkg.dev/${var.project_id}/wanderwise-repo/rewards-balance:latest"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [google_project_service.services]
}

# Award Scraper Service
resource "google_cloud_run_service" "award_scraper" {
  name     = "award-scraper"
  location = var.region

  template {
    spec {
      containers {
        image = "${var.region}-docker.pkg.dev/${var.project_id}/wanderwise-repo/award-scraper:latest"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [google_project_service.services]
}

# Cash Scraper Service
resource "google_cloud_run_service" "cash_scraper" {
  name     = "cash-scraper"
  location = var.region

  template {
    spec {
      containers {
        image = "${var.region}-docker.pkg.dev/${var.project_id}/wanderwise-repo/cash-scraper:latest"
        
        env {
          name  = "PROJECT_ID"
          value = var.project_id
        }
        
        env {
          name  = "AMADEUS_API_KEY"
          value = "oAurKoFmqH3i7vPzW9goK91i2NJLny9x"
        }
        
        env {
          name  = "AMADEUS_API_SECRET"
          value = "Uxw8YXZCRfa4cWyz"
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [google_project_service.services]
}

# Allow unauthenticated access to Search Subscription (for public API)
resource "google_cloud_run_service_iam_member" "search_subscription_public" {
  service  = google_cloud_run_service.search_subscription.name
  location = google_cloud_run_service.search_subscription.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# Output the URL
output "search_subscription_url" {
  value = google_cloud_run_service.search_subscription.status[0].url
}
