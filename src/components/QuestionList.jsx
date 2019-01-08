import React from 'react';

import { connect} from 'react-redux';
import TagsList from './TagsList';
import {Link} from 'react-router-dom';

const QuestionListItem = ({title, tags, question_id})=> {
return(
<div className="mb-3">
<h4>{title}</h4>
<div className="mb-2">
<TagsList tags={tags} />
</div>
<div>
    
    <Link to={`/questions/${question_id}`}>
    <button>INFO</button>
    </Link>
    </div>
</div>
);
}
const QuestionList = ({questions})=> (
    
    <div>
        {questions && questions.length ? <div>

            {questions.map(question=><QuestionListItem key={question.question_id} {...question} />)}
        </div> :<div> ... Loading Questions ... </div>}
        </div>
);

const mapStateToProps = ({questions})=> ({
    questions
})

export default connect (mapStateToProps)(QuestionList);
