function StartScreen({numberOfQuestions, startQuiz, highscore}) {
    return (
        <div className="start">
            <h2>Welcome To The React Quiz!!</h2>
            <h3>{numberOfQuestions} question to test your React mastery</h3>
            <div className="startscreenInfo">
                <p className="highscore">HighScore: <strong>{highscore}</strong></p>
                <button className="btn btn-ui" onClick={startQuiz}>Let's Start</button>
            </div>
            
        </div>
    )
}

export default StartScreen
