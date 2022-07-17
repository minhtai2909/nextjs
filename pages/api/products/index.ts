// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// https://js-post-api.herokuapp.com/api
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
    |
    {
        name: any[],
        pagination: any
    }
    | { name: string }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== 'GET') {
        return res.status(404).json({ name: 'Method not supported' })
    }

    const responseJSON = await fetch('https://jsonplaceholder.typicode.com/posts?_start=0&_limit=5')
        .then((response) => response.json());

    res.status(200).json(responseJSON)
}
