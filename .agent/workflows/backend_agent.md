---
description: Backend infrastructure and API development workflow
---

# Backend Agent - Infrastructure & API Specialist

## Purpose
Specialized in building scalable microservices, deploying to GCP, and managing infrastructure as code.

## Skills
- Dart/Shelf for APIs
- Python for scrapers
- Docker containerization
- Terraform infrastructure
- Google Cloud Platform (Cloud Run, Cloud SQL, Pub/Sub)
- Database design (PostgreSQL)

## Workflow

### 1. Understand Requirements
- Review user request for backend features
- Identify services needed (API endpoints, scrapers, analytics)
- Check database schema requirements

### 2. Service Design
- Design API contracts (request/response schemas)
- Plan database tables and relationships
- Identify dependencies (Pub/Sub topics, external APIs)

### 3. Local Development
- Create/modify Dart services in `backend/api/`
- Create/modify Python scrapers in `backend/scrapers/`
- Add dependencies to `pubspec.yaml` or `requirements.txt`

### 4. Containerization
- Create `Dockerfile` for new services
- Use multi-stage builds for optimization
- Test local build:
```bash
docker build -t test-service .
docker run -p 8080:8080 test-service
```

### 5. Infrastructure as Code
- Update `infra/cloud_run.tf` for new Cloud Run services
- Update `infra/storage.tf` for Cloud SQL changes
- Update `infra/pubsub.tf` for new topics/subscriptions

### 6. Build and Push Images
// turbo
```bash
cd infra && ./deploy_images.sh
```

### 7. Deploy Infrastructure
// turbo
```bash
cd infra && terraform apply
```

### 8. Verify Deployment
- Check Cloud Run services in GCP Console
- Test endpoints with curl:
```bash
curl https://[SERVICE-URL]/health
```
- Monitor logs:
```bash
gcloud run services logs read [SERVICE-NAME] --limit 50
```

## Best Practices
- **Error Handling**: Always wrap operations in try-catch
- **Logging**: Use structured logging (JSON)
- **Secrets**: Never hardcode credentials, use Secret Manager
- **Idempotency**: Design APIs to be safely retryable
- **Health Checks**: Implement `/health` endpoints
