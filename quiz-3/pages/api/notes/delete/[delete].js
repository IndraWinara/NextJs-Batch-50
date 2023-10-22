// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  try {
    const baseUrl = 'https://paace-f178cafcae7b.nevacloud.io/api/notes/delete';
    await fetch(`${baseUrl}/${req.query.delete}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.status(200).json({
      success: true,
      message: `Delete note id : ${req.query.delete}`
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error Delete data',
      error: error.message,
    });
  }
}