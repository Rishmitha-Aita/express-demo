// Synchronous:
console.log('Before');
// Asychronous:
getUser(1, getRepositoriesCallback);

function getRepositoriesCallback(user) {
    getRepositories(user.gitHubUsername, getCommitsCallback);
}
function getCommitsCallback(repos) {
    let i = 0
    getCommits(repos[i], displayCommitsCallback)
}
function displayCommitsCallback(commits) {
    console.log('commits', commits)
}
// Synchronous:
console.log('After');

// Asynchronous:
function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from the database...')
        callback({ id: id, gitHubUsername: 'osha' })
    }, 2000)
};

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log(`Getting the repos of ${username}...`)
        callback(['repo1', 'repo2', 'repo3'])
    }, 2000)
};

function getCommits(repo, callback) {
    setTimeout(() => {
        console.log(`Getting the commits of ${repo}...`)
        callback(['commit1', 'commit2', 'commit3'])
    }, 2000)
};