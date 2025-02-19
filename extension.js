const vscode = require('vscode');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

async function fetchTestCases(problemUrl) {
    try {
        const match = problemUrl.match(/problems\/([\w-]+)\//);
        if (!match) {
            console.error('Incorrect LeetCode URL!');
            vscode.window.showErrorMessage('Please enter a valid LeetCode problem URL.');
            return;
        }

        const titleSlug = match[1];
        const response = await axios.get(`https://alfa-leetcode-api.onrender.com/select?titleSlug=${titleSlug}`);
        const data = response.data;

        if (!data.question) {
            console.error('No example test cases found!');
            vscode.window.showErrorMessage('No example test cases found for this problem.');
            return;
        }

        const questionHTML = data.question;
        const exampleRegex = /<strong>Input:<\/strong>\s*(.*?)\s*<strong>Output:<\/strong>\s*([^\n<]*)/gs;
        const examples = [...questionHTML.matchAll(exampleRegex)];

        const input = [];
        const output = [];

        examples.forEach((example) => {
            let inputCase = example[1].replace(/<.*?>/g, '').trim(); 
            let outputCase = example[2].replace(/<.*?>/g, '').trim(); 

            
            inputCase = inputCase
                .replace(/\[(.*?)\]/g, (_, arrayContent) => arrayContent.replace(/,/g, ' ')) 
                .replace(/([a-zA-Z0-9]+)\s*=\s*/g, '')
                .replace(/, /g, '\n'); 

            outputCase = outputCase.replace(/\[(.*?)\]/g, (_, arrayContent) => arrayContent.replace(/,/g, ' ')); 

            input.push(inputCase);
            output.push(outputCase);
        });

       
        await saveTestCases(input, output);

        console.log('Test cases fetched successfully!');
        return {
            input,
            output
        };
    } catch (error) {
        console.error('Error fetching test cases:', error);
        vscode.window.showErrorMessage('Error fetching test cases. Please try again.');
    }
}


async function saveTestCases(inputs, outputs) {
    try {
        const folderPath = path.join(__dirname, 'test_cases');
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        for (let i = 0; i < inputs.length; i++) {
            const inputPath = path.join(folderPath, `input_${i + 1}.txt`);
            const outputPath = path.join(folderPath, `output_${i + 1}.txt`);

            fs.writeFileSync(inputPath, inputs[i]);
            fs.writeFileSync(outputPath, outputs[i]);
        }

        console.log('Test cases saved successfully!');
    } catch (error) {
        console.error('Error saving test cases:', error);
    }
}

async function runCode(language, filePath, inputFilePath) {
    try {
        let command = '';
        
        if (language === 'python') {
            command = `python ${filePath} < ${inputFilePath}`;
        } else if (language === 'cpp') {
            command = `g++ -std=c++17 ${filePath} -o program.exe && program.exe < ${inputFilePath}`;
        } else if (language === 'javascript') {
            command = `node ${filePath} < ${inputFilePath}`;
        } else if (language === 'java') {
            command = `javac ${filePath} && java ${filePath.replace('.java', '')} < ${inputFilePath}`;
        } else if (language === 'ruby') {
            command = `ruby ${filePath} < ${inputFilePath}`;
        }

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }

            compareOutputs(stdout, inputFilePath);
        });
    } catch (error) {
        console.error('Error executing code:', error);
    }
}

function compareOutputs(actualOutput, inputFilePath) {
    const expectedOutputPath = inputFilePath.replace('input', 'output');
    const expectedOutput = fs.readFileSync(expectedOutputPath, 'utf8').trim();

    
    if (actualOutput.trim() === expectedOutput) {
        console.log(`Test Passed for ${inputFilePath}`);
        vscode.window.showInformationMessage(`Test Passed for ${inputFilePath}`);
    } else {
        console.log(`Test Failed for ${inputFilePath}`);
        vscode.window.showErrorMessage(`Test Failed for ${inputFilePath}`);
        console.log('Actual Output:', actualOutput.trim());
        console.log('Expected Output:', expectedOutput);
    }
}


function activate(context) {
    console.log('Congratulations, your extension "cph-extension-leet-code-vs-" is now active!');

    
    const disposable = vscode.commands.registerCommand('cph-extension-leet-code-vs-.fetchTestCases', async function () {
        const url = await vscode.window.showInputBox({
            prompt: 'Enter the LeetCode problem URL'
        });

        if (url) {
            await fetchTestCases(url);
        }
    });

    const runTestCommand = vscode.commands.registerCommand('cph-extension-leet-code-vs-.runTestCases', async function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("No active editor found.");
            return;
        }

        const filePath = editor.document.fileName;
        const language = filePath.endsWith('.cpp') ? 'cpp' :
                         filePath.endsWith('.py') ? 'python' :
                         filePath.endsWith('.js') ? 'javascript' :
                         filePath.endsWith('.java') ? 'java' :
                         filePath.endsWith('.rb') ? 'ruby' : '';

        if (!language) {
            vscode.window.showErrorMessage("Unsupported language.");
            return;
        }

        const testCasesDir = path.join(__dirname, 'test_cases');
        const inputFiles = fs.readdirSync(testCasesDir).filter(file => file.startsWith('input'));

        
        for (const inputFile of inputFiles) {
            const inputFilePath = path.join(testCasesDir, inputFile);
            await runCode(language, filePath, inputFilePath);
        }
    });

    context.subscriptions.push(runTestCommand);
    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
