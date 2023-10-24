// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  try {
    const payload = req.body
    const baseUrl = 'https://paace-f178cafcae7b.nevacloud.io/api/notes'
    await fetch(`${baseUrl}`, {
      method: "POST", headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(payload)
    })

    res.status(200).json({
      success: true,
      message: 'success create data',

    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'error create data',
      error: error.message
    })
  }

}