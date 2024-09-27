import { useEffect } from "react"
import RemarksComponent from "./RemarksComponent"
function FinishQuiz({points, maxPoints,highscore, dispatch, questions, allAnswerArray}) {
    const percentage = Math.ceil((points/maxPoints)*100)

    useEffect(()=>{
        if(points>highscore){
            dispatch({type:'setHighScore', payload:points})
        }
    },[])

    return (
        <>
        <div className="result">
            You scored <strong>{points}</strong> out of {maxPoints} ( {percentage}% )
        </div>
        <div className=" startscreenInfo">
            <p className="highscore">
            highscore: {highscore}
            </p>
            <button className="btn btn-ui" onClick={()=>dispatch({type:'restart'})}>Restart</button>
            
        </div>
        <RemarksComponent allAnswerArray={allAnswerArray} questions={questions} />
        </>
    )
}

export default FinishQuiz
