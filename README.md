# How to Test LeetCode Problems Locally in VS Code

The **CPH VS Code Extension** helps simplify local testing for competitive programming problems. However, LeetCode's default templates require slight modifications for local testing in VS Code. Follow this guide to adapt your code for seamless testing.

---

## Workflow for Local Testing

### 1. Fetch Test Cases
1. Use the `CPH: Fetch Test Cases` command from the command palette (`Ctrl+Shift+P`).
2. Paste the LeetCode problem URL (e.g., `https://leetcode.com/problems/two-sum/`).
3. The extension will download the problem's test cases and save them locally in the `test_cases` folder:
   - Inputs: `test_cases/input_1.txt`, `test_cases/input_2.txt`, etc.
   - Outputs: `test_cases/output_1.txt`, `test_cases/output_2.txt`, etc.

---

### 2. Modify Code for Local Testing

LeetCode templates provide function signatures for input arguments. For local testing in VS Code, add an entry point (`main` function or equivalent) to handle inputs and outputs.

#### Steps to Modify:
1. **Input Handling**:
   - Read input using appropriate methods:
     - `cin`/`scanf` in C++
     - `input()` in Python
     - `process.stdin` in JavaScript
   - You can either hardcode test cases or read them from the saved test case files (e.g., `test_cases/input_1.txt`).

2. **Function Invocation**:
   - Instantiate the class (if required) and call the function with parsed inputs.

3. **Output Verification**:
   - Print the function's result and manually compare it with the expected output in the corresponding file (e.g., `test_cases/output_1.txt`).

---

### 3. Run Test Cases
1. Use the `CPH: Run Test Cases` command to execute your code against all test cases saved in the `test_cases` folder.
2. The extension will:
   - Compare your code's output with the expected output.
   - Highlight any mismatches for debugging.

---






## Installation

### Prerequisites
- **VS Code**: You need to have Visual Studio Code installed.
- **Node.js**: The extension requires Node.js for running the commands.

### Steps
1. **Clone the repository**:
   - Clone this repository to your local machine using the following command:
     ```bash
     git clone https://github.com/your-repo/cph-vs-code-extension.git
     ```

2. **Install dependencies**:
   - Navigate to the extension directory and install the necessary dependencies:
     ```bash
     cd cph-vs-code-extension
     npm install
     ```

3. **Open in VS Code**:
   - Open the extension folder in VS Code:
     ```bash
     code .
     ```

4. **Install the extension**:
   - Go to the Extensions view in VS Code (`Ctrl+Shift+X`), search for `CPH: LeetCode Helper`, and click **Install**.

---

## Configuration

You can configure the extension's settings to suit your preferred programming languages. The following settings can be added to your `settings.json` file in VS Code:

### Default Configuration for C++

```json
{
  "cph.language.cpp.compile": "g++ -std=c++17 -o $fileNameWithoutExt $fileName",
  "cph.language.cpp.run": "./$fileNameWithoutExt"
}
