import { Request, Response } from 'express';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabase: SupabaseClient = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_ANON_KEY || ''
);

export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }

        res.status(201).json({ message: 'User registered successfully', data });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            res.status(401).json({ error: error.message });
            return;
        }

        res.status(200).json({ message: 'Login successful', data });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const recoverPassword = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);

        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }

        res.status(200).json({ message: 'Password recovery email sent', data });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};