# Banksie

## ❓ About
I originally created this banking app to practice Python. After I got a grasp on the language I wanted to learn how APIs work and practice creating one. Soon after that, I started learning more about cloud computing and AWS. I wanted to have a multi tier app to deploy on the cloud so I decided to add a frontend to pair with the API. 

I also decided that this project would be a great way for me to learn React and React Bootstrap so you will see lots of mistakes and changes as I learn.

This app will primarily be used to practice cloud labs so there are many features that need to be implemented (see Roadmap), however I will continue to update the app frequently.

## 🧰 Tech
* ![Python][Python-badge]
* ![Flask][Flask-badge]
* ![React][React.js]
* ![React Bootstrap][React-bootstrap]
* ![Javascript][JS]
* ![HTML][HTML-badge]
* ![Docker][Docker.com]

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Python](https://www.python.org/downloads/)
- [Docker](https://docs.docker.com/desktop/)

### 🖥️ Installation

### Frontend
1. Install packages
```Bash
# Navigate into the frontend folder
cd frontend

# Install project dependencies
npm install

# Install React Bootstrap (if not already listed in package.json)
npm install react-bootstrap bootstrap

# Run the development server
npm run dev
```

### 🧠 Backend
2. Create a virtual environment and install Python packages
   
```bash
# Navigate into the backend folder
cd backend

# (Optional) Create and activate a virtual environment
python -m venv venv

# Activate for Windows
venv\Scripts\activate

# Activate for Mac/Linux
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```
3. Create a docker image and run your container
   
```Bash
# Build the Docker image
docker build -t myapp .

# Run the container

# For Windows
docker run -dp "${PWD}:/app" -w/app -v my-image

# For Mac/Linux
docker run -dp "$(pwd)":/app -w/app -v my-image
```


















[React.js]: https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=for-the-badge
[Python-badge]: https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white&style=for-the-badge
[Flask-badge]: https://img.shields.io/badge/Flask-3BABC3?logo=flask&logoColor=white&style=for-the-badge
[React-bootstrap]: https://img.shields.io/badge/React%20Bootstrap-41E0FD?logo=reactbootstrap&logoColor=white&style=for-the-badge
[HTML-badge]: https://img.shields.io/badge/HTML-E34F26?logo=html5&logoColor=white&style=for-the-badge
[Docker.com]: https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=for-the-badge
[JS]: https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=white&style=for-the-badge
