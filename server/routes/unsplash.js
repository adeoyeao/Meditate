const express = require(express)
const router = express.Router()

router.get("/unsplash", async (req, res) => {
      const color = req.body.color
      const theme = req.body.theme

      const results = await fetch(`api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${theme}&color=${color}`)

      const data = await results.json()

      console.log(data)
})

module.exports = router