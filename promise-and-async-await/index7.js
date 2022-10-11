// Synchronous:
console.log('Before');

// Asychronous:
async function displayCommits() {
    try { //try to execute the next 4 lines
        const user = await getUser(1); // await result of function 
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log('Commits: ', commits);
    }
    catch (err) { //if anything goes wrong, catch the errors and execute this block
        console.log('Error', err.message);
    }
}
displayCommits()

// Synchronous:
console.log('After');

// Asynchronous:
function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from the database...')
            resolve({ id: id, gitHubUsername: 'osha' })
        }, 2000)
    });
};

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Getting the repos of ${username}...`)
            // resolve(['repo1', 'repo2', 'repo3'])
            reject(new Error('Could not get repos...'));
        }, 2000)
    });
};

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Getting the commits of ${repo}...`)
            resolve(['commit1', 'commit2', 'commit3'])
        }, 2000)
    });
};