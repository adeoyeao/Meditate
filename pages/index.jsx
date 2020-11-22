import Form from "../components/Form"
import styles from "../styles/layouts/index.module.scss"
import { useEffect, useState } from "react"

const Index = () => {
      const [ viewHeight, setViewHeight ] = useState(`100vh`)

      const handleResize = () => {
            setViewHeight(`${window.innerHeight}px`)
      }

      const mainStyle = {
            minHeight: viewHeight
      }

      useEffect(() => {
            handleResize()
            window.addEventListener("resize", handleResize)
            return (() => {
                  window.removeEventListener("resize", handleResize)
            })
      })

      return (
            <main className={styles.Index} style={mainStyle}> 
                  <Form />
            </main>
      )
}

export default Index