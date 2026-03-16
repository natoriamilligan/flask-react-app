<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#-overview">Overview</a>
      <ul>
        <li><a href="#-tech">Tech</a></li>
        <ul>
          <li><a href="#application">Application</a></li>
          <li><a href="#aws-infrastructure">AWS Infrastructure</a></li>
          <li><a href="#devops--cicd">DevOps / CI/CD</a></li>
          <li><a href="#dev-tools">Dev Tools</a></li>
        </ul>
      </ul>
    </li>
    <li>
      <a href="#%EF%B8%8F-architecture-setup">Architecture Setup</a>
      <ul>
        <li><a href="#%EF%B8%8F-frontend">Frontend</a></li>
        <li><a href="#%EF%B8%8F-database">Database</a></li>
        <li><a href="#%EF%B8%8F-backend">Backend</a></li>
      </ul>
    </li>
    <li><a href="#-troubleshooting">Troubleshooting</a></li>
    <li><a href="#-what-i-learned">What I Learned</a></li>
    <li><a href="#-contact">Contact</a></li>
  </ol>
</details>


## ❓ Overview 
Full-stack banking application deployed on AWS (ECS, S3/CloudFront, RDS) with Terraform-provisioned infrastructure and CI/CD via GitHub Actions.
Go to website -> [Live Website](https://banksie.app)

## Architecture Diagrams 
### Backend Infrastructure
### Frontend Infrastructure

## 🧰 Tech
Frontend        - React
Backend         - Flask (Python), PostgreSQL
AWS Services    - ECS Fargate, ECR, RDS, S3, CloudFront, ALB, Route 53, ACM, Secrets Manager, CloudWatch
Infrastructure  - Terraform, Docker  
CI/CD           - GitHub Actions 
Auth & Security - JWT, Refresh Tokens, HTTP-only Cookies
Testing         - Integration Tests, Linting 

## AWS Infrastructure
- **ECS Fargate** - Chose serverless containers over EC2 to eliminate instance management and enable automatic scaling
- **RDS PostgreSQL** - Managed database service for automated backups and high availability over self-hosted Postgres
- **S3 + CloudFront** -Static React build served via CDN for low latency globally with HTTPS enforced via ACM
- **Secrets Manager** - All credentials injected at runtime instead of being hardcoded or stored in environment files
- **ALB** - Handles SSL termination, accepting HTTPS traffic on port 443 and forwarding plain HTTP internally to Flask containers on port 80
- **Terraform** - All AWS infrastructure provisioned as code, enabling repeatable and version-controlled deployments
  
## CI/CD Pipeline
## App Features
## Local Development
## Testing

## 📫 Contact
Natoria Milligan - [@natoriamilligan](https://x.com/natoriamilligan) - natoriamilligan@gmail.com - [LinkedIn](https://www.linkedin.com/in/natoriamilligan)

Project Link: [https://github.com/natoriamilligan/flask-react-app](https://github.com/natoriamilligan/flask-react-app)
