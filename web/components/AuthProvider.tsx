"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useUserStore } from "../lib/store";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
        if (!auth) {
            setUser(null);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, [setUser]);

    return <>{children}</>;
}
