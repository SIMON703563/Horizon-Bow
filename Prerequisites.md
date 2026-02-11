Alright! Let's walk through the process of setting up your Angular project using **Visual Studio Code** and **GitHub**.

We'll start from the point where you want to **clone a GitHub repository** that doesn't have any code or solution yet, and set up an Angular project from scratch.

---

### 1. **Install Prerequisites**

Before we begin, ensure the following tools are installed:

* **Visual Studio Code** (VS Code) [Download Here](https://code.visualstudio.com/)
* **Git** (For version control) [Download Here](https://git-scm.com/)
* **Node.js** (which includes npm, the Node package manager) [Download Here](https://nodejs.org/)

Once these are installed, you're ready to get started!

---

### 2. **Clone the GitHub Repository**

#### Step 1: Clone the Empty GitHub Repo

1. **Open GitHub** in your browser and navigate to the repository that you want to clone.

   * If the repo doesn't exist yet, you can create an empty repository first on GitHub.

2. **Copy the Git Clone URL**: In the repository's page on GitHub, click the green **"Code"** button and copy the URL of the repository (either HTTPS or SSH).

   * Example:

     * HTTPS: `https://github.com/SIMON703563/horizon-bow.git`
     * SSH: `git@github.com:SIMON703563/horizon-bow.git`

#### Step 2: Open Visual Studio Code and Clone the Repo

1. **Open Visual Studio Code**.
2. **Open the Command Palette**: You can do this by pressing `Ctrl + Shift + P` (Windows/Linux) or `Cmd + Shift + P` (Mac).
3. **Select "Git: Clone"** in the Command Palette.
4. **Paste the URL** you copied earlier.
5. **Choose the Folder** where you want to clone the repository.
6. **Open the cloned repository** in VS Code.

---

### 3. **Initialize the Angular Project in the Cloned Repository**

Now that you have the empty repository cloned, we can initialize the Angular project.

#### Step 1: Install Angular CLI

If you haven't installed the Angular CLI globally yet, you'll need to do that.

1. **Open the Terminal** in VS Code:

   * From the top menu, select **Terminal** > **New Terminal** or press `Ctrl + ` (backtick).
2. **Install Angular CLI globally**:

   Run this command in the terminal:

   ```bash
   npm install -g @angular/cli
   ```

#### Step 2: Create an Angular Project

1. In the **VS Code terminal**, run the following command to create a new Angular project. Since you're in the cloned repo directory, we want to create the Angular app directly inside this folder.

   ```bash
   ng new .
   ```

   The `.` tells Angular CLI to create the project in the current directory (which is the cloned repo folder).

2. When prompted, answer the following:

   * **Would you like to add Angular routing?** (Type `y` for Yes or `n` for No): `n` (or `y` if you plan to add routing)
   * **Which stylesheet format would you like to use?** (Choose one based on your preference):

     * `CSS` (or choose another like `SCSS` if you're familiar with it)

3. After running this command, Angular CLI will create a new Angular project and install all necessary dependencies.


### 3. **Create Your Own Branch Before Committing**

#### Step 1: **Check the Current Git Status**

After cloning the repository and setting up the Angular project, let's first check the status of the Git repository to ensure everything is clean and we’re on the right track.

In the **VS Code terminal**, run the following command:

```bash
git status
```

You should see that there are uncommitted changes in your repository (since you just created the Angular project).

---

#### Step 2: **Create a New Branch**

Now, let’s create a **new branch** to make changes without affecting the main branch directly.

1. **Create a new branch** with a descriptive name (e.g., `feature/angular-setup` or `feature/initial-commit`):

   ```bash
   git checkout -b feature/initial-setup
   ```

   This command will:

   * Create a new branch named `feature/initial-setup` (you can choose your own name for the branch).
   * Switch to that new branch automatically.

2. **Verify you're on the new branch**:

   After running the command, check if you're now on the new branch by running:

   ```bash
   git status
   ```

   It should show you are on `feature/initial-setup` instead of `main`.

---

#### Step 3: **Stage and Commit Changes in the New Branch**

Now that you're on your own branch, you can **stage** and **commit** the changes without affecting the `main` branch.

1. **Stage all changes**:

   In the terminal, run:

   ```bash
   git add .
   ```

2. **Commit your changes** with a meaningful message:

   ```bash
   git commit -m "Initial Angular setup with Angular CLI"
   ```

3. **Verify the commit**:

   Run `git status` again to ensure that all changes are committed. You should see something like:

   ```bash
   On branch feature/initial-setup
   nothing to commit, working tree clean
   ```

---

#### Step 4: **Push the New Branch to GitHub**

After committing your changes to the local branch, the next step is to **push the branch** to GitHub.

1. **Push your branch to GitHub** (replace `feature/initial-setup` with your actual branch name if it's different):

   ```bash
   git push origin feature/initial-setup
   ```

   This will upload the new branch to your GitHub repository.

2. **Verify the branch is on GitHub**:

   * Open your GitHub repository in the browser.
   * You should now see your newly pushed branch (`feature/initial-setup`) listed on the repository page under the "Branch" dropdown.

---

#### Step 5: **Create a Pull Request (PR)**

Once your changes are pushed to GitHub, you can create a **Pull Request (PR)** to merge your branch back into the `main` branch. This is the next logical step after feature work is complete.

1. Go to the GitHub repository page.
2. You should see a **"Compare & pull request"** button after pushing the branch.
3. Click the **"Compare & pull request"** button.
4. Write a title and description for the PR, then click **Create pull request**.

Now, your changes are in a separate branch and can be reviewed before merging into the `main` branch.

---



Keep the main branch clean and focused while working on feature branches. It also helps ensure that any changes go through code review (via Pull Requests) before being merged into the main branch, maintaining good project hygiene.

Let me know if you need further clarification or help with Git commands!

### 6. **Start the Angular Development Server**

Let’s ensure everything is working. In VS Code’s terminal:

1. Run the following command to start the Angular development server:

   ```bash
   ng serve
   ```

2. Open your browser and navigate to [http://localhost:4200](http://localhost:4200) to see your Angular app running!

---

### 7. **Install Extensions in VS Code (Optional but Recommended)**

To make your development experience smoother, install a few useful extensions:

* **Angular Essentials**: Adds Angular snippets and other helpful tools.
* **Prettier**: Auto-formatting for your code.
* **ESLint**: Linting for TypeScript/JavaScript code.
* **Debugger for Chrome**: Helps you debug your Angular app directly in the browser.

To install these, go to the Extensions view in VS Code by clicking the **Extensions icon** on the left sidebar (or pressing `Ctrl + Shift + X`), and search for the extension names.

---

### 8. **Commit Changes as You Go**

Whenever you make changes to your project, follow these steps to commit and push updates:

### Summary of Branching Workflow:

1. **Clone the repository** and **set up the Angular project**.
2. **Create a new branch** to work on your changes:

   ```bash
   git checkout -b feature/initial-setup
   ```
3. **Stage** and **commit your changes** in the new branch:

   ```bash
   git add .
   git commit -m "Initial Angular setup with Angular CLI"
   ```
4. **Push the branch** to GitHub:

   ```bash
   git push origin feature/initial-setup
   ```
5. **Create a Pull Request (PR)** for review and merge into `main` after completion.

---

1. **Stage changes**:

   ```bash
   git add .
   ```

2. **Commit changes**:

   ```bash
   git commit -m "Description of the changes made"
   ```

3. **Push to GitHub**:

   ```bash
   git push origin feature/{other}
   ```

This ensures that your work is safely pushed to the remote GitHub repository.

---
