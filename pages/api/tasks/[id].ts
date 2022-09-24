import { NextApiRequest, NextApiResponse } from 'next';


// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {


    const { method } = req;

    switch (method) {
        case 'GET':
            return res.json('getting a unique tasks');
        case 'PUT':
            return res.json('updating a unique tasks');
        case 'DELETE':
            return res.json('deleting a unique tasks');
        default:
            return res.status(400).json('method not allowed');
    }

}