# CPH VS Code Extension (LeetCode)

**Competitive Programming Helper (CPH) VS Code Extension** is designed to make the competitive programming experience smoother by automating the fetching of LeetCode test cases, running your code against them, and comparing the results. It eliminates the need for submitting your solutions directly to LeetCode, focusing instead on local testing to debug and improve your solutions.

## Features

### 1. **Problem URL Fetching**
   - **Fetch test cases directly from LeetCode**: Simply provide a LeetCode problem URL, and the extension will extract the problem's test cases (both input and expected output).
   - **Multiple test cases**: It handles problems with multiple test cases and stores them for later use.

### 2. **Test Case Storage**
   - **Structured storage**: The test cases are saved locally in a structured format.
   - Input files are saved as `input_1.txt`, `input_2.txt`, etc.
   - Output files are saved as `output_1.txt`, `output_2.txt`, etc.
   - The test cases are saved in a directory named `test_cases` for easy access.

### 3. **Code Execution**
   - **Multi-language support**: You can write your solution in any supported language (currently Python, C++, and JavaScript are supported).
   - **Execute code locally**: The extension will execute your code against the fetched test cases.
   - **Comparison of results**: The actual output from your code is compared to the expected output, and you are notified if there are discrepancies.

### 4. **Multi-Language Support**
   - **Supported languages**:
     - **Python**: `python3`
     - **C++**: `g++`
     - **JavaScript**: `node`
   - Customizable compile and run commands for each language can be set in the extension settings.

### 5. **No Code Submission**
   - **No code submission**: This extension only provides a local testing environment, so there's no feature for submitting your code to LeetCode directly.

## User Workflow

### 1. **Fetch Problem Statement and Test Cases**
   - **Step 1**: Use the `CPH: Fetch Test Cases` command in VS Code to fetch test cases from LeetCode.
   - **Step 2**: Enter the URL of the LeetCode problem (e.g., `https://leetcode.com/problems/two-sum/`).
   - **Step 3**: The extension will extract the problem's test cases (both input and output) and save them in a folder named `test_cases`.

### 2. **Write and Test Your Code**
   - **Step 1**: Write your solution in the programming language of your choice (Python, C++, or JavaScript).
   - **Step 2**: Use the `CPH: Run Test Cases` command to execute your code against the saved test cases.
   - **Step 3**: The extension will compare the actual output with the expected output and highlight any discrepancies for debugging.

### 3. **View Results**
   - The extension will display the results of the test cases, showing:
     - Test case number
     - The expected output
     - The actual output from your code
   - If the output is incorrect, it will highlight the mismatch and provide detailed information to help you debug the issue.

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
