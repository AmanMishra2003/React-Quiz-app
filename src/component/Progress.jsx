function Progress({index, numberOfQuestions, points, maxPoints}) {
    return (
        <div className="progress">
            <progress max={numberOfQuestions} value={index}/>
            <p>Question <strong>{index}</strong>/{numberOfQuestions} </p>
            <p>Points <strong>{points}</strong>/{maxPoints} </p>
        </div>
    )
}

export default Progress
