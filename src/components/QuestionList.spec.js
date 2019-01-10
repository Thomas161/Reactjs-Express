import { setTimeout, setInterval } from "timers";

describe(`The questions list`, ()=> {
    beforeEach(()=> {
        console.log("Before Each");
    });
        beforeAll(() => {
          console.log("Before All");
        });
        afterEach(()=> {
console.log('After each');
        });
        afterAll(() => {
          console.log("After all");
        });
    it(`Should display list of items`, ()=>{
expect(2+3).toEqual(5);
});
    it.skip(`Good god`, () => {
      expect(2 * 3).toEqual(7);
    });
});


// //asynchronous methods

// //with a promise
// it('async test', ()=>{
//    return new Promise(
//        resolve => setTimeout(resolve, 200)
//    )
// });

// //with async
// it('async test 22222', async() => await delay(100));

// //with a done
// it('async test 3333', done=> {
// setTimemout(done,100);
// });
