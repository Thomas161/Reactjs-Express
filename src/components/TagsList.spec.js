import React from 'react';
import TagsList from './TagsList';
import renderer from 'react-test-renderer';

describe('The tags list', ()=> {
    it('Renders as expected', ()=> {
        const tree = renderer.create(
            <TagsList tags={[`css`,`html`,`swift`]}/>
        ).toJSON();

        console.log(tree);
        expect(tree).toMatchSnapshot();
    })
})