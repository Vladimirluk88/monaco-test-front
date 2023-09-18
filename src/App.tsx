import { useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {PythonShell} from 'python-shell';

import * as monaco from 'monaco-editor';
import { Editor } from '@monaco-editor/react';

function App() {
  const [count, setCount] = useState(0)
  const [monacoValue, setMonacoValue] = useState<string | undefined>('')
  const [res, setRes] = useState<string[] | undefined>([])

  const onSubmit = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/test', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // referrerPolicy: "no-referrer", // no-referrer, *client
      body: JSON.stringify({'testField': monacoValue}), // body data type must match "Content-Type" header
    }).then(res => res.json());

    if(response.statusCode >= 400) {
      throw new Error()
    }
    setRes(response)
    } catch {
      console.log('error ocuured')
    }
  }, [monacoValue])
  
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div className="read-the-docs">
        <Editor language='javascript' value={monacoValue} onChange={(val) => setMonacoValue(val)} />
      </div>
      <button type='button' onClick={(e) => {
        e.stopPropagation()
        onSubmit()
      }}>Click</button>
      <div>
        {res?.map(p => <div>{p}</div>)}
      </div>
    </>
  )
}

export default App
