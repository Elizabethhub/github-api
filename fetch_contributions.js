const axios = require('axios');
const fs = require('fs');
process.env.PORT //node --env-file=.env app.js
// Your personal GitHub username and personal access token
const username = process.env.USER_NAME;
const token = process.env.TOKEN_EK;

// Repository owner (organization) and repository name
const repoOwner = process.env.REPO_OWNER;
const repoName = process.env.REPO_NAME;

// Function to fetch contribution data from the repository
async function fetchContributions() {
    try {
        // Make a GET request to the GitHub API to fetch commit activity
        const response = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/stats/contributors`, {
            auth: {
                username: username,
                password: token
            }
        });

        // Check if response contains data
        if (response && response.data) {
            return response.data;
        } else {
            throw new Error('Response data is empty or undefined.');
        }
    } catch (error) {
        console.error('Error fetching contribution data:', error.message);
        return null;
    }
}

// Function to write contribution data to a file
async function writeContributionsToFile() {
    try {
        // Fetch contribution data
        const contributions = await fetchContributions();

        // Check if contributions data is valid
        if (contributions && Array.isArray(contributions)) {
            // Write contribution data to a JSON file
            fs.writeFileSync('contributions.json', JSON.stringify(contributions, null, 2));
            console.log('Contribution data has been written to contributions.json');
        } else {
            console.error('Invalid or empty contributions data. Unable to write to file.');
        }
    } catch (error) {
        console.error('Error writing contribution data to file:', error.message);
    }
}

// Run the script
writeContributionsToFile();