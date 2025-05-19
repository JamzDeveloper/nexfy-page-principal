import { NextResponse } from 'next/server';

export async function POST() {
    const res = NextResponse.json({ success: true });

    // Eliminar las cookies 
    res.cookies.set('session-token', '', { maxAge: 0 });
    res.cookies.set('role', '', { maxAge: 0 });

    return res;
}