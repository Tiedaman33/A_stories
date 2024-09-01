# StoryWeaver

## Introduction

StoryWeaver is an interactive storytelling platform that allows users to create, share, and explore engaging stories. Users can register, log in, view their profile, upload new stories, and browse through a collection of featured stories.

[Visit the Deployed Site](https://Tiedaman33.github.io/story_time)

[Final Project Blog Article](#)

### Author

- [LinkedIn - Bravin](#)

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/lenny/tom.git
    cd tom
    ```

2. Install dependencies for both the frontend and backend:
    ```bash
    # Install frontend dependencies
    cd interactive-storytelling-platform
    npm install

    # Install backend dependencies
    cd ../backend
    npm install
    ```

3. Create a `.env` file in the `backend` directory with the following content:
    ```plaintext
    MONGODB_URI=mongodb://localhost:27017/storyweaver
    PORT=4000
    JWT_SECRET=your_jwt_secret
    ```

4. Start the development servers:
    ```bash
    # Start the backend server
    cd backend
    npm start

    # Start the frontend server
    cd ../interactive-storytelling-platform
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. Register a new account or log in with an existing account.
2. Once logged in, you will be redirected to your dashboard where you can:
    - View your profile
    - Upload new stories
    - Browse featured stories
3. Use the navigation links to explore different sections of the platform.

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-branch
    ```
3. Make your changes.
4. Commit your changes:
    ```bash
    git commit -m 'Add some feature'
    ```
5. Push to the branch:
    ```bash
    git push origin feature-branch
    ```
6. Open a pull request.

## Related Projects

Here are some related projects that might interest you:

- [Interactive Storytelling](https://github.com/related-project-1)
- [Story Sharing Platform](https://github.com/related-project-2)

## Licensing

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Resources

- [What your code repository says about you](https://help.github.com/articles/ignoring-files/)
- [Here’s an awesome list of READMEs](https://github.com/matiassingers/awesome-readme)

## Screenshot

![StoryWeaver Screenshot](screenshot.png)

