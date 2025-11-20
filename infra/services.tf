resource "google_project_service" "services" {
  for_each = toset([
    "compute.googleapis.com",
    "servicenetworking.googleapis.com",
    "sqladmin.googleapis.com",
    "pubsub.googleapis.com",
    "run.googleapis.com",
    "artifactregistry.googleapis.com",
    "cloudfunctions.googleapis.com",
    "firestore.googleapis.com",
    "vpcaccess.googleapis.com"
  ])

  service            = each.key
  disable_on_destroy = false
}
