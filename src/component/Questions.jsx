import Footer from "./Footer";
import Timer from "./Timer";
function Questions({question, dispatch, answer ,numberOfQuestions, index, remainingSeconds}) {

    const hasAnswered = answer!==null;
    return (
        <div >
            <h3>{question.question}</h3>
            <div className="options">
                {
                    question.options.map((ele,i)=>{
                        return <button 
                        className={`btn btn-option ${i===answer?'answer':''} ${hasAnswered? i===question.correctOption?'correct':'wrong':''}`} 
                        key={i}
                        disabled={hasAnswered}
                        onClick={()=>{
                            dispatch({type:'answerQuestion', payload:i})
                            dispatch({type:'updatePoints', payload:i})
                        }
                        }
                        >{ele}</button>
                    })
                }
            </div>
            <Footer>
                <Timer remainingSeconds={remainingSeconds} dispatch={dispatch}/>
            {
                hasAnswered?
                index<numberOfQuestions-1?<button className="btn btn-ui" onClick={()=>(dispatch({type:'nextQuestion'}))}>Next</button>:<button className="btn btn-ui" onClick={()=>(dispatch({type:'finishQuiz'}))}>Finish Quiz</button>:
                null
            }

            </Footer>
            
        </div>
    )
}

export default Questions
