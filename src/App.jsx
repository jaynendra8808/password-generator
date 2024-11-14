import { useCallback, useEffect, useRef, useState } from "react"

function App() {

  const [length, setLength] = useState(16)
  const [password, setPassword] = useState("")
  const [charAllowed, setCharAllowed] = useState(false)
  const [numberAllowed, setNumberAllowed] = useState(false)

  const passwordRef = useRef(null)

  const passwordGen = useCallback(() => {
    let pass = ""
    let charset = "ABCDEFGHIJKLMNOPQRSTVUWXYZabcdefghijklmnopqrstuvwxyz"
    if(charAllowed) {
      charset += "!@#$%^&*(){}?/"
    }
    if(numberAllowed) {
      charset += "123456789"
    }

    for(let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * charset.length)
      pass += charset.charAt(char)
    }
    setPassword(pass)

  }, [length, charAllowed, numberAllowed, setPassword])

  useEffect(() => {
    passwordGen()
  }, [length, charAllowed, numberAllowed, passwordGen])
  
  const passwordCopy = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 16)
    window.navigator.clipboard.writeText(password)
  }, [password])
  return (
    <>
    <div className="mx-auto mt-[150px] bg-blue-700 w-[30%] h-[120px] rounded-xl pt-2 pl-2 text-black ">
      <p className="flex justify-center text-red-700 font-semibold text-[18px] pb-3 ">Password Generator</p>
      <div>
        <input 
        value={password}
        readOnly
        ref={passwordRef}
        className="w-[84%] rounded-md focus:outline-none pl-1 pb-0.5 pt-0.5 " type="text" placeholder="password" />
        <button
        onClick={passwordCopy}
        className="ml-1.5 bg-white rounded-lg px-1 pb-0.5 ">copy</button>
      </div>


      <div className="flex mt-3">
        <input
        value={length}
        className="w-[25%] " type="range"
        min={16}
        max={32}
        onChange={(e) => setLength(e.target.value)}
        name="" id="" />
        <span className="ml-1 text-white ">{length} </span>

        
        <div className="mx-7">
          <input
          onChange={() => setCharAllowed((prev) => !prev)}
          className="mr-1" type="checkbox"  />
          <label>character</label>
        </div>

        <div>
          <input
          onChange={() => setNumberAllowed((prev) => !prev)}
          className="mr-1" type="checkbox" />
          <label>number</label>
        </div>

      </div>
    </div>
    </>
  )
}

export default App
