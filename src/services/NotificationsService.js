import {delay} from 'redux-saga';
export default {
    async getNotifications(){
        console.warn("Real NOTIFICATION SERVICE! REALLY CONTACTING API'S");
        await delay(1000);
        return { count: 13}
    }
}