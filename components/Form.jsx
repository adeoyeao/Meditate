import Logo from "./Logo"
import { useState } from "react"
import { useRouter } from "next/router"
import styles from "../styles/components/form.module.scss"

const Form = () => {
      const router = useRouter()

      const [ heading, setHeading ] = useState()
      const [ mode, setMode ] = useState("login")

      const [ input, setInput ] = useState({
            username: "",
            password: ""
      })

      const changeMode = () => {
            mode === "login" ? setMode("register") : setMode("login")
      }

      const handleOauth = (oauth) => {
            router.push(`/auth/${oauth}`)
      }

      const handleChange = (e) => {
            const { name, value } = e.target
            setInput(prev => ({
                  ...prev,
                  [name]: value
            }))
      }

      const handleSubmit = (e) => {
            e.preventDefault()
            fetch(`/${mode}`, {
                  method: "POST",
                  headers: {
                        "content-type": "application/json"
                  },
                  body: JSON.stringify({username: input.username, password: input.password})
            })
            .then(res => res.json())
            .then(response => {
                  setHeading(response.message)
                  setTimeout(() => router.push("/home"), 500)
            })
            .catch(err => {
                  console.error(err)
                  setHeading(`${mode} Failed`)
                  setInput({
                        username: "",
                        password: ""
                  })
            })
      }

      return (
            <form className={styles.Form} onSubmit={handleSubmit}>
                  { !heading ? <Logo /> : <h1>{heading}</h1> }
                  <div className={styles.Form_inputs}>
                  <input
                  type="text" 
                  name="username"
                  value={input.username}
                  placeholder="Enter Username"
                  onChange={handleChange}
                  autoComplete="off"/>
                  <input
                  type="password" 
                  name="password"
                  value={input.password}
                  placeholder="Password"
                  onChange={handleChange}
                  autoComplete="off"/>
                  </div>
                  <button 
                  type="submit"
                  className={styles.Form_submitButton}>{mode}</button>
                  <p>or login with</p>
                  <div className={styles.Form_oauth}>
                        <button onClick={(e) => (e.preventDefault(), handleOauth("facebook"))}>Facebook</button>
                        <button onClick={(e) => (e.preventDefault(), handleOauth("google"))}>Google</button>
                  </div>
                  { mode === "login" ? <p>Don't have an account? <span onClick={changeMode}>Sign up now.</span></p> : 
                  <p>Already have an account? <span onClick={changeMode}>Return to login.</span></p> }
            </form>
      )
}

export default Form