# 1337 Web Jam 02 - Code Comprehension Verifier

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

<div align="center">
  <h3> AI-Powered Code Defense & Knowledge Check</h3>
  <p>
    An intelligent assessment platform that generates dynamic quizzes based on source code 
    to verify a developer's true understanding of their submission.
  </p>
  <br />
  <!-- OPTIONAL: Add a link to a live demo if you have one -->
  <!-- <a href="https://your-demo-link.com">View Demo</a> -->
</div>

---

##  The Problem
In the era of AI coding assistants and Copy/Paste solutions, submitting code is easy. Understanding it is the hard part. 
**How do we prove a student actually wrote—or at least understands—the logic they turned in?**

##  Our Solution
We built a **Full Stack Next.js** application that utilizes the **OpenAI API** to act as an automated oral examiner.
1.  **Analyze:** The system reads the user's submitted code.
2.  **Generate:** It dynamically creates a multiple-choice quiz tailored specifically to the logic, syntax, and architecture of that code.
3.  **Verify:** It calculates a "Comprehension Score" based on the user's answers.

---

##  How It Works

1.  **Code Submission**: The user uploads files or pastes their code into the editor.
2.  **AI Processing**: The backend sends the code context to OpenAI with a strict prompt to generate relevant technical questions.
3.  **Quiz Phase**: The user is presented with questions like:
    *   *"Why was `useEffect` used in line 42?"*
    *   *"What is the time complexity of the sorting function found in `utils.js`?"*
    *   *"What happens if the API returns a 500 error in your `fetchData` function?"*
4.  **Scoring**: The app grades the answers in real-time and issues a Pass/Fail status.

---

## Tech Stack

This project uses **Next.js** as a full-stack framework (Frontend + API Routes).

*   **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **AI Engine:** [OpenAI API](https://openai.com/) (GPT-4.1-nano)
*   **Language:** TypeScript / JavaScript
*   **State Management:** React Hooks / Context API

---

##  Getting Started

Follow these steps to run the project locally.

### Prerequisites
*   Node.js (v18 or higher)
*   npm or pnpm
*   An OpenAI API Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/1337-pool/web-jam02.git
    cd web-jam02
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Configure Environment Variables**
    Create a `.env.local` file in the root directory and add your OpenAI key:
    ```bash
    OPENAI_API_KEY=sk-your-openai-api-key-here
    # Add any other config variables here
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Open the app**
    Navigate to [https://hydrate-blush.vercel.app/]((https://hydrate-blush.vercel.app/)) in your browser.

---
