import { Request, Response, NextFunction } from 'express';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabase: SupabaseClient = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_ANON_KEY || ''
);

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Token not provided' });
        return;
    }

    try {
        const { data, error } = await supabase.auth.getUser(token);
        if (error || !data.user) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }

        req.body.user = data.user;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export default authMiddleware;