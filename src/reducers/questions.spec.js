import {questions} from './questions'
describe("the questions reducer", ()=> {
    it("should work", ()=> {
console.log("Test");
const arr = ["Hope", "Faityh"];
const arrClone = ["Hope", "Faityh"];
const newState = questions(arr, {type: 'Unrecognised_Action'})

expect(newState).toEqual(arr);
//expect(newState).toBe(arrClone);
    });

    it("should add new question", ()=> {
        const state = [{question_id: 'foo'}, {question_id: 'bar'}];
        const newQuestion = {question_id: 'baz'};
        const newQuestionClone = { question_id: "baz" };
        const newState = questions(state, {type: `FETCHED_QUESTION`, question:newQuestion});
        console.log(newState);

        expect(newState).toContain(newQuestionClone);
        expect(state).not.toContain(newQuestion);
        expect(state).toHaveLength(2);
    });
});