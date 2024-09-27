import { useEffect } from "react"

function Timer({remainingSeconds, dispatch}) {
    const min = Math.floor(remainingSeconds/60)
    const second = remainingSeconds%60
    useEffect(()=>{
        const id  = setInterval(()=>{
            dispatch({type:'timerTick'})
        },1000)

        return ()=>clearInterval(id)
    },[dispatch])
    return (
        <div className="timer">
           {min<10?"0":null}{min}:{second<10?"0":null}{second}
        </div>
    )
}

export default Timer
