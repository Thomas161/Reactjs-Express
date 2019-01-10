import {mapStateToProps, QuestionDetailDisplay} from '../QuestionDetail';
import renderer from 'react-test-renderer';
import React from 'react';

describe(`The Question Component`, ()=> {
    describe(`The Container Element`, ()=> {
        describe(`mapStateToProps`, ()=>{
            it("should map state to props correctly", ()=> {
                const sampleQuestion = {
question_id:13,
body:"Space is big"
                };
                
                const app = {
                    questions: [sampleQuestion]
                };
                const ownProps = {
                    question_id: 13
                };
                const componentState = mapStateToProps(app,ownProps);
                console.log(componentState);
                expect(componentState).toEqual(sampleQuestion);
            });
        });
    });
    describe('The display element', ()=> {
        it(`Should not regress`, ()=> {
            const tree = renderer.create(
                <QuestionDetailDisplay 
                title="The meaning of life"
                body="15"
                answer_count={0}
                tags={['Hitchhiker']}
                />
            );

            expect(tree.toJSON()).toMatchSnapshot();
    });


    //lack of assertion is a pass
});
});