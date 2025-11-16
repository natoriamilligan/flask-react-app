# Banksie

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#-about">About</a>
      <ul>
        <li><a href="#-tech">Tech</a></li>
      </ul>
    </li>
    <li>
      <a href="#-getting-started">Getting Started</a>
      <ul>
        <li><a href="#-prerequisites">Prerequisites</a></li>
        <li>
          <a href="#%EF%B8%8F-installation">Installation</a>
          <ul>
            <li><a href="#%EF%B8%8F-frontend">Frontend</a></li>
            <li><a href="#-backend">Backend</a></li>
            <li><a href="#-docker">Docker</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li><a href="#%EF%B8%8F-roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

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

### 📝 Prerequisites

Before you begin, make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Python](https://www.python.org/downloads/)
- [Docker](https://docs.docker.com/desktop/)

### ⚙️ Installation

1. Clone the repo
```
git clone https://github.com/natoriamilligan/Python-Simple-Banking-System.git
```

### 🖥️ Frontend

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

### 🐳 Docker Compose

3. Create a docker image and run your container
   
```Bash
# Build the Docker image
docker compose up --build

# To stop the container
docker compose down

## 🗺️ Roadmap

- [ ] Add dates to transactions (transactions component) 
- [ ] Make website responsive
- [ ] Limit amount of transactions shown on dashboard
- [ ] Add see more to list more transactions in dashboard
- [ ] Implement refresh tokens
- [ ] Implement better error handling throughout website
- [ ] Relogin/type password to delete account
- [ ] Add loading icon for dashboard loads

## 🤝 Contributing

Any contributions you make are **greatly appreciated**. There are a lot of features and bugs that I have not gotten to. I am really just using the app as a way for me to practice AWS.

If you would like to help make this app better, please fork the repo and create a pull request. You can also open an [issue](https://github.com/natoriamilligan/Python-Simple-Banking-System/issues) with the tag "improvement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📫 Contact

Natoria Milligan - [@natoriamilligan](https://x.com/natoriamilligan) - natoriamilligan@gmail.com

Project Link: [https://github.com/natoriamilligan/Python-Simple-Banking-System](https://github.com/natoriamilligan/Python-Simple-Banking-System)

[React.js]: https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=for-the-badge
[Python-badge]: https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white&style=for-the-badge
[Flask-badge]: https://img.shields.io/badge/Flask-3BABC3?logo=flask&logoColor=white&style=for-the-badge
[React-bootstrap]: https://img.shields.io/badge/React%20Bootstrap-41E0FD?logo=reactbootstrap&logoColor=white&style=for-the-badge
[HTML-badge]: https://img.shields.io/badge/HTML-E34F26?logo=html5&logoColor=white&style=for-the-badge
[Docker.com]: https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=for-the-badge
[JS]: https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=white&style=for-the-badge
