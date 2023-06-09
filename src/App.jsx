import { useEffect,  useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Webcam from 'react-webcam'
import * as tf from '@tensorflow/tfjs'
import * as cocoModele from '@tensorflow-models/coco-ssd'
import './App.css'

function App() {
  const [model, setModel] =useState()
  const [objectName, setObjenctName] = useState("")
  const [score, setScore] =useState("")
  async function loadModel(){
    try{
      const dataset = await cocoModele.load()
      setModel(dataset)
      console.log("data set ready");

    }catch(err){
      console.log(err);
    }


  }

  useEffect(() =>{
    tf.ready().then(() => {
      loadModel()
    })
  }, [])
  

  async function predict() {
    const detection = await model.detect(document.getElementById("vidioSource"))
    if(detection.length >0){
      detection.map((result, i) => {
        setObjenctName(result.class)
        setScore(result.score)
      }) 
    }
    console.log(detection);
  }

  const vidioOption = {
    width: 720,
    height: 480,
    facingMode:"environment"
  }
  
  console.log(model);

  <style>
    app {
      
    }
  </style>
  return (
    <div class="app">
      <h1> AING MACAN </h1>
      <h3>{objectName ? objectName.toString() : ""}</h3>
      <h3>{score ? score.toString() : ""}</h3>
      <button onClick={() => predict()} >Tebak</button>
      <Webcam
      id="vidioSource"
      audio = {false}
      videoConstraints = {vidioOption}
      ></Webcam>
    </div>
  )
}

export default App
