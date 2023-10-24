// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  try {
    const payload = req.body;
    const baseUrl = 'https://paace-f178cafcae7b.nevacloud.io/api/notes/update';
    const response = await fetch(`${baseUrl}/${req.query.edit}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      res.status(200).json({
        success: true,
        message: 'Success edit data',
        data,
      });
    } else {
      res.status(response.status).json({
        success: false,
        message: 'Error editing data',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Bad Status',
      error: error.message,
    });
  }
}