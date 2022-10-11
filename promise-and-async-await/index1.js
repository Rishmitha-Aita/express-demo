// Synchronous:
console.log('Before');
// Asychronous:
getUser(1, function(user) {
    console.log('user', user)
})
// Synchronous:
console.log('After');

// Asynchronous:
function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from the database...')
        callback({ id: id, gitHubUsername: 'Isha' })
    }, 2000)
}