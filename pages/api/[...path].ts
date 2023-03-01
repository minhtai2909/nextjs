// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy';
import Cookies from 'cookies';

// type Data = {
//     message: string
// }

const proxy = httpProxy.createProxyServer({

});
export const config = {
    api: {
        bodyParser: false,
    },
}

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    return new Promise((resolve) => {
        // convert cookies to header Authorization
        const cookies = new Cookies(req, res);
        let accessToken = cookies.get('access_token');
        if (accessToken) {
            req.headers.authorization = `Bearer ${accessToken}`
        }

        // don't send cookies to API server
        req.headers.cookie = '';

        // https://js-post-api.herokuapp.com
        proxy.web(req, res, {
            target: process.env.API_URL,
            changeOrigin: true,
            selfHandleResponse: false
        })

        proxy.once('proxyRes', () => {
            resolve(true);
        })
        // res.status(200).json({ name: 'Catch all  paths of xxxxxxx' })
    })
}
