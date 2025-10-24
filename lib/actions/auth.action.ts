'use server';

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";
import { success } from "zod";

export async function signUp(params: SignUpParams) {
    const { uid, name, email } = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get();
        if(userRecord.exists){
            return {
                success: false,
                message: 'User already exists.'
            }
        }

        await db.collection('users').doc(uid).set({
            name,
            email,
            createdAt: new Date().toISOString()
        })

        return {
            success: true,
            message: 'User created successfully.'
        }

    } catch (e : any) {
        console.error('Error during sign-up:', e);

        if(e.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: 'Email already in use.'
            }
        }

        return {
            success: false,
            message: 'An unexpected error occurred during sign-up.'
        }
    }
}

export async function setSessionCookie(idToken : string) {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {expiresIn: 60 * 60 * 24 * 7 * 1000});

    cookieStore.set('session', sessionCookie, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax'
    })
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;

    try{
        const userRecord = await auth.getUserByEmail(email);

        if(!userRecord){
            return {
                success: false,
                message: 'User does not exist.'
            }
        }

        await setSessionCookie(idToken);
    } catch (e) {
        console.error('Error during sign-in:', e);
        return {
            success: false,
            message: 'An unexpected error occurred during sign-in.'
        }
    }
}

export async function getCurrentUser() : Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if(!sessionCookie){
        return null;
    }

    try{
        const decodedToken = await auth.verifySessionCookie(sessionCookie, true);
        const userRecord = await db.collection('users').doc(decodedToken.uid).get();

        if(!userRecord.exists){
            return null;
        }

        return {
            ...userRecord.data(),
            id: userRecord.id
        } as User;
    } catch (e) {
        console.error('Error fetching current user:', e);
        return null;
    }
}

export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;
}