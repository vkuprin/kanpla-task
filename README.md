# Kanpla React Native Challenge
Welcome to the React Native challenge! 👋

This exercise is designed to test your ability to work in a production environment and uncover your work practices. The existing codebase is intentionally messy, just like the real world sometimes is (we promise our codebase looks better).

We’re excited to see how you tackle the tasks! Happy coding 🚀

## Getting Started
When you're ready to start the challenge:

1. **Clone** (not fork) this repository.

2. Implement each task as a separate **pull request (PR)** against your version of the repository.
   * Each PR should be prepared as if you were contributing to a live team project.
   * Provide a brief description of your solution and your reasoning in each PR.

3. **Merge each PR** upon completion of a task, so we can review your approach to each challenge individually.

4. When you’re ready to submit your solution, share the link to your repo with us. If you prefer to keep it private, let us know so we can provide emails for repo access.

5. Include a **5-minute Loom video presentation** explaining your approach and demoing the solution. This helps us understand your thought process and the implemented features.

>**Questions?** If you have questions or need clarification, feel free to reach out to. We’re here to help!

### Approach and Notes

We’d love to understand your approach. Feel free to include notes on your decision-making process and anything you prioritized or deprioritized. 

>**Note**: Timebox this challenge to 2-3 hours. Don’t worry if some parts are incomplete — just be prepared to discuss your approach for any unfinished sections.

## Challenge Overview
This challenge involves adding features to our very-much in-progress React Native POS (Point of Sale) app. You’ll be handling error management, optimistic updates, and responsive design to improve the app’s functionality and user experience.

### Tasks

#### Task: Optimize Order Creation
* Handle order creation in offline mode with syncing when back online.
* Since the API can be slow, implement optimistic updates to keep the app responsive.
* Implement clear error handling and user-friendly messages for errors.

#### Bonus: Improve the UI Design
* Improve the visual design and add support for different screen orientations.
* Feel free to apply your design skills to make the app look polished.

## Development Environment

### React Native POS App
The app is built with React Native and Expo.

How to run the app:

1. Install dependencies: `npm install`

2. Start the app in development mode: `npm start`

3. Follow the **Expo** instructions in your terminal to load the app on a simulator or physical device.

### Mock API
The app uses a mock API server for data fetching and order creation. Please use the token provided in the email to authenticate with the API.

>**Note**: The API is intentionally sometimes slow and a bit flaky to simulate real-world conditions.

You can find the API documentation [here](https://kanpla-code-challenge.up.railway.app/docs).