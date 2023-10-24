// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const baseUrl = 'https://paace-f178cafcae7b.nevacloud.io/api/notes'
  const response = await fetch(`${baseUrl}`, {
    method: "GET", headers: {
      "Content-Types": "application/json"
    }
  })
  const responseJSON = await response.json()
  res.status(200).json({
    ...responseJSON
  })
}
