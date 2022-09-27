import { NextApiRequest, NextApiResponse } from 'next';
import { conn } from "utils/database";


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { method, query, body } = req;

    console.log(query)

    switch (method) {
        case 'GET':
            try {
                const sql = 'SELECT * FROM tasks WHERE id = $1';
                const value = [query.id];
                const result = await conn.query(sql, value);

                if(result.rows.length === 0){
                    return res.status(404).json({message: "Task not found"});
                }

                return res.json(result.rows[0]);
            } catch (error: any) {
                return res.status(500).json({message: error.message});
            }
        case 'PUT':
            try {
                const { title, description } = body;
                const sql = 'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *';
                const value = [title, description, query.id];
                const result = await conn.query(sql, value);

                if(result.rows.length === 0){
                    return res.status(404).json({message: "Task not found"});
                }

                return res.json(result.rows[0]);
            } catch (error: any) {
                return res.status(500).json({message: error.message});
            }
        case 'DELETE':
            try {
                const sql = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
                const value = [query.id];
                const result = await conn.query(sql, value);

                if(result.rowCount === 0){
                    return res.status(404).json({message: "Task not found"});
                }

                return res.json(result.rows[0]);
            } catch (error: any) {
                return res.status(500).json({message: error.message});
            }
        default:
            return res.status(400).json('method not allowed');
    }

}