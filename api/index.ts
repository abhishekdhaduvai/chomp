import type { VercelRequest, VercelResponse } from '@vercel/node';

import Logger from './logger';

export default function handler(req: VercelRequest, res: VercelResponse) {
    Logger.info('Test Request');

    res.status(200).json({ message: 'Hello World' });
}
