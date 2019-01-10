import NotificationsViewer from '../NotificationsViewer';
import renderer from 'react-test-renderer';
import React from 'react';
import delay from 'redux-saga';

jest.mock('../../services/NotificationsService');

//calling mock before require ensures that require does not get hoisted first
const notificationsService = require('../../services/NotificationsService').default;
describe("The Notification Viewer", ()=> {
    beforeAll(()=> {
        notificationService.__setCount(5);
    });
    it("Should display the number of notifications", async()=> {
        const tree = renderer.create(
            <NotificationsViewer />
        )
        await delay(1000);

        const instance = tree.root;
        const component = instance.findAllByProps({className: `notifications`});
        const text = component.children[0];
        expect(text).toEqual("5 Notifications");
    });
});