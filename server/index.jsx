import express from 'express';
import yields from 'express-yields';
import fs from 'fs-extra';
import webpack from 'webpack';
import { argv } from 'optimist';
import{ get } from 'request-promise';
import { questions, question } from '../src/data/api-real-url';
import { delay } from 'redux-saga';
import axios from 'axios';
import getStore from '../src/getStore';
import {renderToString} from 'react-dom/server';
import App from '../src/App';
import React from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import createHistory from 'history/createMemoryHistory';
import path from 'path';

const port = process.env.PORT ||  8080;

const app = express();

const useLiveData = argv.useLiveData === 'true';
const useServerRender = argv.useServerRender === 'true';

function * getQuestions(){
    let data;
    if(useLiveData){
        data = yield get(questions,{gzip: true})
    } else {
        data = yield fs.readFile('./data/mock-questions.json', "utf-8");
    }

    return JSON.parse(data);
}

function * getQuestion(question_id) {
    let data;
    if (useLiveData){
        data=yield get(question(question_id), {gzip:true, json:true})
    } else {
        //async call must use yield to return data, if not an empty object
        const questions = yield getQuestion();
        const question = questions.items.find(_question => _question.question_id === question_id);
        question.body = `Mock the Body : ${question_id}`;
        data = {items:[question]};
    }
    return data;
}
app.get('/api/questions', function * (req,res){
    const data = yield getQuestions();
    yield delay(150);
    res.json(data);
});
app.get('/api/questions/:id', function*(req, res) {
  const data = yield getQuestion(req.params.id);
  yield delay(150);
  res.json(data);
});


if(process.env.NODE_ENV === 'development'){
    const config = require('../webpack.config.dev.babel').default;
    //creates a compiler
    const compiler  = webpack(config);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true }
    ));

    app.use(require('webpack-hot-middleware')(compiler));
} else {
    app.use(express.static(path.resolve(__dirname, '../dist')));
}

app.get(['/', '/questions/:id'], function * (req, res, err) {
    let index =  yield fs.readFile('./public/index.html', "utf-8");

    const initialState = {
        questions:[]
    };

    const history = createHistory({
        initialEntries:[req.path],
    });

    if(req.params.id){
            const question_id = req.params.id;
            const response = yield getQuestion(question_id);
            const questionDetails = response.items[0];
            initialState.questions = [{...questionDetails, question_id}]
    }else {
        const questions = yield getQuestions();
    initialState.questions = questions.items;
    }

    
    const store = getStore(history,initialState);

    if(useServerRender){
        const appRender = renderToString(
            <Provider store={store}>
            <ConnectedRouter history={history}>
            <App />
            </ConnectedRouter>
            </Provider>
        );
        index = index.replace(`<%= preloadedApplication %>`, appRender);
    }else {
        index = index.replace(`<%= preloadedApplication %>`, `Please wait while we load the application`);
    }

    res.send(index);
});

// app.get('/star', function * (req,res) {
//     let index = yield fs.readFile('./public/boots.js', "utf-8")
//     res.send(index);
// });


// axios.get(`https://jsonplaceholder.typicode.com/todos`).then(t => t.json()).then(json => console.log(json));


app.listen(port, '0.0.0.0', () => console.log('Listening on Port ' +  port));

