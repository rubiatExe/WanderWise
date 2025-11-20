variable "project_id" {
  description = "The Google Cloud Project ID"
  type        = string
}

variable "region" {
  description = "The Google Cloud Region"
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "The Google Cloud Zone"
  type        = string
  default     = "us-central1-a"
}
