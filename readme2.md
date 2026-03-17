# Banksie

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#overview">Overview</a></li>
    <li>
      <a href="#architecture-diagrams">Architecture Diagrams</a>
      <ul>
        <li><a href="#backend-infrastructure">Backend</a></li>
        <li><a href="#frontend-infrastructure">Frontend</a></li>
      </ul>
    </li>
    <li><a href="#tech">Tech</a></li>
    <li><a href="#aws-infrastructure">AWS Infrastructure</a></li>
    <li><a href="#cicd-pipeline">CI/CD Pipeline</a></li>
    <li><a href="#app-features">App Features</a></li>
    <li><a href="#local-development">Local Development</a></li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## Overview 
Banksie is a full-stack banking application where users can create accounts, deposit and withdraw funds, and transfer money between accounts. Built with Flask and React, the entire infrastructure is provisioned on AWS via Terraform and deployed automatically through a CI/CD pipeline using GitHub Actions. -> [Live Website](https://banksie.app)

## Architecture Diagrams 
### Backend Infrastructure
### Frontend Infrastructure

## Tech
- Frontend - React
- Backend - Flask (Python), PostgreSQL
- AWS Services - ECS Fargate, ECR, RDS, S3, CloudFront, ALB, Route 53, ACM, Secrets Manager, CloudWatch, Lambda, Eventbridge
- Infrastructure - Terraform, Docker  
- CI/CD - GitHub Actions 
- Auth & Security - JWT, Refresh Tokens, HTTP-only Cookies
- Testing - Integration Tests, Linting 

## AWS Infrastructure
- **ECS Fargate** - Chose serverless containers over EC2 to eliminate instance management and enable automatic scaling
- **RDS PostgreSQL** - Managed database service for automated backups and high availability over self-hosted Postgres
- **S3 + CloudFront** -Static React build served via CDN for low latency globally with HTTPS enforced via ACM
- **Secrets Manager** - All credentials injected at runtime instead of being hardcoded or stored in environment files
- **ALB** - Handles SSL termination, accepting HTTPS traffic on port 443 and forwarding plain HTTP internally to Flask containers on port 80
- **Terraform** - All AWS infrastructure provisioned as code, enabling repeatable and version-controlled deployments
- **Lambda + EventBridge** - Scheduled rule triggers a Lambda function every 5 minutes to poll DNS propagation status, sending a Slack notification once propagation is complete 
  
## CI/CD Pipeline
Every push to backend triggers the following pipeline:

1. **Test** — Integration tests executed against all covered routes
2. **Lint** — Code quality checks run on the Flask backend
3. **Build** — Docker image built and tagged
4. **Push** — Image pushed to Amazon ECR
5. **Deploy** — ECS service updated with new task definition, rolling deployment with zero downtime
6. **Alert** — Slack notification sent to team channel on pipeline failure

Every push to frontend/src triggers the following pipeline:

1. **Build** — React app built and compiled
2. **Deploy** — Build files synced to S3 bucket
3. **Invalidate** — CloudFront cache invalidated to serve latest build immediately
4. **Alert** — Slack notification sent to team channel on pipeline failure
   
## App Features
- User registration and login with secure authentication
- Session management via refresh tokens, keeping users securely logged in without re-entering credentials
- Account dashboard with transaction history
- Fund transfers between accounts
- Real-time balance updates
- Full error handling with descriptive API responses
- Protected routes requiring valid authentication
  
## Local Development
See [Local Setup Guide](local-setup.md) for instructions on running the app locally.

## Testing
Integration tests cover core API routes including authentication and account operations. Tests run automatically in the CI/CD pipeline on every push to main.

## Contact
Natoria Milligan - [@natoriamilligan](https://x.com/natoriamilligan) - natoriamilligan@gmail.com - [LinkedIn](https://www.linkedin.com/in/natoriamilligan)

Project Link: [https://github.com/natoriamilligan/flask-react-app](https://github.com/natoriamilligan/flask-react-app)
