import Quiz from "./Quiz"
import { questions } from "./questions"

function App() {

  return (
    <div className={` pt-[100px]`}>
      <Quiz questionsArr={questions}/>
    </div>
  )
}

export default App
