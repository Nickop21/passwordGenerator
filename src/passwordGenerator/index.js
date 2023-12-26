import React, { useCallback, useEffect, useRef, useState } from 'react'
import './style.css'

function PasswordGenerator() {
    const [Lenght, setLength] = useState(6);
    const [isNumber, setisNumbers] = useState(false);
    const [isCharacter, setisCharacter] = useState(false);
    const [Password, setpassword] = useState(null);

    
    // useCallback (callback,dependency)
    // do thecasching thing to optimize code and performance
    const passworegenerator = useCallback(() => {
        let pass = ""
        let defaultstring = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if (isNumber) defaultstring += "0123456789";
        if (isCharacter) defaultstring += "!@#$%^&*+~_[]{}"

        for (let index = 1; index <= Lenght; index++) {
            let randompos = Math.floor(Math.random() * defaultstring.length + 1)
            pass += defaultstring.charAt(randompos)

        }
        setpassword(pass)
    }, [Lenght, isNumber, isCharacter])


    // useEffect (callback,dependency)
    // use for memoziation only draw the tree node that changed not draw all
    //  tree on chnage any thing whch we are passing in dependency
    useEffect(() => {
        passworegenerator()
    }, [Lenght, isNumber, isCharacter, setpassword])


    // useRef
    const passworcopyref=useRef()
    const copyPasswordText=useCallback(()=>{
        passworcopyref.current?.select();
        window.navigator.clipboard.writeText(Password)
        console.log(Password);
    },[Password])
   
    return (
        <>
            <div className='passwordCard'>
                <div className='Passwordtext'>
                    <h3>
                        PasswordGenerator
                    </h3>
                </div>
                <div className='passwordInputbox'>
                    <input style={{ width: '70%', padding: '10px', borderRadius: '5px' }} type='text'
                        value={Password}
                        ref={passworcopyref}
                    />

                    <button style={{ padding: '10px', background: 'lightblue', borderRadius: '5px' }} 
                    onClick={()=>copyPasswordText()}
                    >
                        Copy
                    </button>
                </div>
                <div className='controlers'>
                    <input type='range'
                        min={6}
                        max={100}
                        onChange={(e) => setLength(e.target.value)}
                    />
                    <label>Lenght :{Lenght} </label>
                    <input type='checkbox'
                        defaultChecked={isNumber}
                    onChange={() => setisNumbers((prev)=>!prev)} //this the the way to know the previous state what we set
                    />
                    <label>Numbers</label>
                    <input type='checkbox'
                        defaultChecked={isCharacter}
                        onChange={() => setisCharacter((prev) => !prev)}

                    />
                    <label>Character</label>


                </div>

            </div>
        </>
    )
}

export default PasswordGenerator