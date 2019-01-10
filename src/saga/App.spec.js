import delay from 'redux-saga'

it("Async test", done=> {
setTimeout(done,1000);
});

it("async test 2", ()=>{
    return new Promise(
        resolve => setTimeout(resolve, 2000)
    );
});

it('async test 3', async ()=> {
    await delay(200);
});

//ASYNCHRONOUS METHODS IN PRACTICE