export type PersonaType =
    | "DFSR" | "DFSS" | "DFPR" | "DFPS"
    | "DFVR" | "DFVS" | "DSVR" | "DSVS"
    // Add all combinations... there are 16. 
    // Actually simplicity: Let's just return the code.
    | string;

export function calculatePersona(scores: { Command: number; Time: number; Play: number; Value: number }): string {
    // Simplified mapping based on scores
    const a1 = scores.Command >= 0 ? "C" : "S"; // Command / Saver
    const a2 = scores.Time >= 0 ? "F" : "S";    // Fast / Slow
    const a3 = scores.Play >= 0 ? "P" : "R";    // Play / Realistic
    const a4 = scores.Value >= 0 ? "V" : "I";   // Value(Social) / Individual

    return `${a1}${a2}${a3}${a4}`;
}
