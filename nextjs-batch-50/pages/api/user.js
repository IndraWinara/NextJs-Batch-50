export default function handler(req, res) {
  try {
    const data = {
      name: "Indra Winara",
      email: "winaraindra@gmail.com",
      Job: "Fullstack Web Developer",
      hobby: "Coding"
    }
    res.status(200).json({
      success: true,
      data
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error
    })
  }

}