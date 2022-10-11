const p1 = Promise.resolve(3);
const p2 = new Promise((resolve, reject) => {
    // resolve and reject are functions
    // async:
    setTimeout(() => {
        reject(new Error('message'));
    }, 2000);
}); 

// consume promise:
p1
    .then(result => console.log('P1 Result', result))
    .catch(err => console.log('P2 Error', err.message));

p2
    .then(result => console.log('P2 Result',result))
    .catch(err=> console.log('P2 Error',err.message))
    .finally(() => console.log('P2 Experiment completed'));

// all returns result as an array if all are succesful
// rejects the promises immediately when encountered reject or error
// Promise.all([p1, p2])
//     .then((values) => {
//         console.log(values);
//     });

//Returns result as soon as any of the promise fulfills
Promise.any([p1, p2])
    .then((values) => {
        console.log("Promise.any",values);
    });

// fulfills or rejects as soon as one promise is fulfilled or rejected
Promise.race([p1, p2])
.then((values) => {
    console.log("Promise.race",values);
});