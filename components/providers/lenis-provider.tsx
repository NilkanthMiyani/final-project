"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        if (!lenisRef.current) {
            lenisRef.current = new Lenis({
                autoRaf: true,
                // Lenis owns anchor jumps; the offset clears the fixed header.
                anchors: { offset: -96 },
            });
        }

        return () => {
            lenisRef.current?.destroy();
            lenisRef.current = null;
        };
    }, []);

    return <>{children}</>;
}
