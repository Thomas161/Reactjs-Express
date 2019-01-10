import {handleFetchQuestion} from './fetch-question-saga';
import fetch from 'isomorphic-fetch';


describe("Fetch questions saga", ()=> {
beforeAll(()=> {
    fetch.__setValue([{question_id:13}]);
});
    it('should fetch the questions', async ()=> {
        const gen = handleFetchQuestion({question_id:13})
       const {value}= await gen.next();
       expect(value).toEqual([{question_id:13}]);
       expect(fetch).toHaveBeenCalledWith(`/api/questions/13`);
        console.log("running");
    });
});