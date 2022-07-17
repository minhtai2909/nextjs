// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy';
type Data = {
    name: string
}

const proxy = httpProxy.createProxyServer({

});
export const config = {
    api: {
        bodyParser: false,
    },
}
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    req.headers.cookie = '';

    proxy.web(req, res, {
        target: process.env.API_URL,
        // target: 'https://jsonplaceholder.typicode.com',
        changeOrigin: true,
        selfHandleResponse: false,

    })


    // res.status(200).json({ name: 'Catch all  paths of xxxxxxx' })
}
