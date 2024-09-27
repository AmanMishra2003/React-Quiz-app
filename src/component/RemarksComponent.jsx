import {useState} from 'react';

function RemarksComponent({questions, allAnswerArray}) {
    const [questionIndex, setQuestionIndex] = useState(0)
    
    return (
        <div className='remarksContainer'>
            <h3 style={{margin:'10px'}}>{questions[questionIndex].question}</h3>
            {
                questions[questionIndex].correctOption!==allAnswerArray[questionIndex]?
                <>
                <p className='remarkanswer wrong' style={{backgroundColor:'lightred'}}>❌ {questions[questionIndex].options[allAnswerArray[questionIndex]]}</p>
                <p className='remarkanswer correct'>✅ {questions[questionIndex].options[questions[questionIndex].correctOption]}</p>
                </>
                :
                <p className='btn remarkanswer correct'> ✅ {questions[questionIndex].options[allAnswerArray[questionIndex]]}</p>
            }

            <div className="btn-grp">
                {
                    questionIndex!==0?
                    <button className='btn btn-ui btn-grp-prev'  onClick={()=>setQuestionIndex(curr=>curr-1)}>Prev</button>:
                    null
                }
                {
                    questionIndex!==questions.length-1?
                    <button className='btn btn-ui btn-grp-next' onClick={()=>setQuestionIndex(curr=>curr+1)}>Next</button>:
                    null
                }
                
                
            </div>
            
            {/* <button className='btn btn-ui wrong' disabled="true">{questions[questionIndex]}</button> */}
        </div>
    )
}

export default RemarksComponent
