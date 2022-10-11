// Synchronous:
console.log('Before');

// Asychronous:

// console.log user object:
// const p = getUser(1);
// p.then(user => console.log(user));

//  chaining:
getUser(1)
  .then(user => getRepositories(user.gitHubUsername))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log('Commits', commits))
  .catch(err => console.log('Error', err.message));

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
            resolve(['repo1', 'repo2', 'repo3'])
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