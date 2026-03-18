# Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Python](https://www.python.org/downloads/)
- [Docker](https://docs.docker.com/desktop/)

### Installation

1. Clone the repo

```
git clone https://github.com/natoriamilligan/flask-react-app.git
```

#### Frontend

2. Install packages

```Bash
# Navigate into the frontend folder
cd frontend

# Install project dependencies
npm install

# Install React Bootstrap
npm install react-bootstrap bootstrap

# Run the development server
npm run dev
```

#### Backend

3. Create a virtual environment and install Python packages

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

#### Docker Compose

4. Create a docker image and run your container

```Bash
# Build the Docker image
docker compose up --build

# To stop the container
docker compose down
```

## Contributing

Any contributions you make are **greatly appreciated**.

If you would like to help make this app better, please fork the repo and create a pull request. You can also open an [issue](https://github.com/natoriamilligan/flask-react-app/issues) with the tag "improvement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

Natoria Milligan - [@natoriamilligan](https://x.com/natoriamilligan) - natoriamilligan@gmail.com

Project Link: [https://github.com/natoriamilligan/flask-react-app](https://github.com/natoriamilligan/flask-react-app)
