// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy';
import Cookies from 'cookies';

type Data = {
    message: string
}

const proxy = httpProxy.createProxyServer({

});
export const config = {
    api: {
        bodyParser: false,
    },
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== "POST")
        return res.status(404).json({ message: "method not supported" })

    const cookies = new Cookies(req, res);
    cookies.set("access_token")
    res.status(200).json({ message: 'logout successfully' })
}
