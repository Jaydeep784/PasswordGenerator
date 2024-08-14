import { useState, useEffect, useCallback, useRef} from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [passwordLength, setPasswordLength] = useState(6);

  const passwordRef = useRef(null);

  const generatePass = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghicjklmnopqrstuvwxyz";
    if (numbersAllowed) str += "1234567890";
    if (charactersAllowed) str += "!@#$%^&*";

    let pass = "";

    for (let i = 1; i < passwordLength; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [numbersAllowed, charactersAllowed, passwordLength])

  useEffect(() => {
    generatePass();
  }, [numbersAllowed, charactersAllowed, passwordLength])

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    // alert("Password Copied to Clipboard")
    passwordRef.current?.select();
  }

  return (
    <>
      <div className="">
        <h2 className="mb-3 text-xl">Password Generator</h2>
        <div className="flex">
          <input
            className="w-96 rounded-lg p-2 pl-3"
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyToClipboard} className="btn btn-blue rounded-lg p-2 text-base bg-blue-900">
            copy
          </button>
        </div>
        <div className="flex mt-2 ml-5">
          <input
            className="mr-2 cursor-pointer"
            type="range"
            value={passwordLength}
            min={6}
            max={80}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
          <label htmlFor="length">Length : {passwordLength}</label>
          <input
            className="ml-3 mr-1"
            type="checkbox"
            onClick={() => setNumbersAllowed((prev) => !prev)}
          />
          <label>Numbers</label>

          <input
            className="ml-3 mr-1"
            type="checkbox"
            onClick={() => setCharactersAllowed((prev) => !prev)}
          />
          <label>Character</label>
        </div>
      </div>
    </>
  );
}

export default App;
