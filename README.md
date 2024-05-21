
# QuestCraft

QuestCraft is a comprehensive web application for question paper generation and management. It features subject and chapter management, question handling, question paper generation, downloads, and translation services. The project uses React for the frontend, NodeJS with Express for one of the backends, and Java Spring Boot for another backend, with MongoDB as the database.

## Table of Contents
- [Introduction](#introduction)
- [App Features](#app-features)
- [Installation](#installation)
- [Frontend Installation](#frontend-installation)
- [NodeJS Backend Installation](#nodejs-backend-installation)
- [Spring Boot API Installation](#spring-boot-api-installation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

QuestCraft is designed to streamline the process of creating and managing question papers for educational purposes. It provides a user-friendly interface for managing subjects, chapters, and questions, and offers features such as question paper generation, downloading, and translation.

## App Features

- **Manage Subjects:** Add, update, and delete subjects within the application.
- **Manage Chapters:** Organize chapters under each subject.
- **Manage Questions:** Create, update, and delete questions for each chapter.
- **Generate Question Papers:** Easily set and generate question papers based on selected criteria.
- **Download Question Papers:** Download generated question papers in a convenient format.
- **Translate Questions:** Translate questions into different languages for wider accessibility.

## Installation

To install QuestCraft, follow these steps for the frontend, NodeJS backend, and Spring Boot API components.

### Frontend Installation

1. **Clone the Repository:**
	```bash
    git clone https://github.com/meetbutani/QuestCraft.git
	```
2. **Navigate to the Frontend Directory:**
	```bash
    cd QuestCraft/frontend
	```
3. **Install Dependencies:**
	```bash
    npm install
	```
4. **Run the App:**
	```bash
    npm start
	```
   The frontend will run on `http://localhost:3000`.

### NodeJS Backend Installation

1. **Navigate to the Backend Directory:**
	```bash
    cd QuestCraft/backend
	```
2. **Install Dependencies:**
	```bash
    npm install
	```
3. **Set Up Environment Variables:**
   - Create a `.env` file in the `backend` directory with the following content:
	```plaintext
    DATABASE_URL=your_mongodb_connection_string
	```
4. **Run the Server:**
	```bash
    npm start
	```
   The backend will run on `http://localhost:5000`.

### Spring Boot API Installation

1. **Navigate to the Spring Boot API Directory:**
	```bash
    cd QuestCraft/QuestCraftAPI
	```
2. **Set Up Environment Variables:**
   - Create an `application.properties` file in the `src/main/resources` directory with the following content:
	```properties
    spring.application.name = QuestCraftAPI
    spring.data.mongodb.uri = mogodb_connection_url
    spring.data.mongodb.database = QuestCraft
    spring.data.mongodb.auto-index-creation = true
    server.port = 8080
     ```
3. **Build and Run the Application:**
	```bash
    ./mvnw spring-boot:run
	```
   The Spring Boot API will run on `http://localhost:8080`.

## Contributing

We welcome contributions from the community to improve QuestCraft. To contribute, follow these steps:

1. **Fork the Repository:** Click the `Fork` button on the top right corner of the repository page.
2. **Create a Branch:**
	```bash
    git checkout -b feature/your-feature-name
	```
3. **Make Your Changes:** Implement your feature or bug fix.
4. **Commit Your Changes:**
	```bash
    git commit -m "Description of your changes"
	```
5. **Push to Your Branch:**
	```bash
	git push origin feature/your-feature-name
	```
6. **Create a Pull Request:** Go to the repository on GitHub and open a pull request.

## License

QuestCraft is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any inquiries, issues, or suggestions, please contact us at:

- Email: meet.butani2702@gmail.com
- GitHub Issues: [QuestCraft Issues](https://github.com/meetbutani/QuestCraft/issues)

Thank you for using QuestCraft! We hope it simplifies and enhances your question paper generation and management process.
