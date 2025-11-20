resource "google_pubsub_topic" "flight_data_stream" {
  name = "flight-data-stream"
}

resource "google_pubsub_subscription" "flight_data_processor" {
  name  = "flight-data-processor-sub"
  topic = google_pubsub_topic.flight_data_stream.name

  # 7 days retention
  message_retention_duration = "604800s"
  retain_acked_messages      = true
  ack_deadline_seconds       = 20
}

resource "google_pubsub_topic" "alerts_stream" {
  name = "alerts-stream"
}

resource "google_pubsub_subscription" "alert_dispatcher" {
  name  = "alert-dispatcher-sub"
  topic = google_pubsub_topic.alerts_stream.name
  ack_deadline_seconds = 20
}
