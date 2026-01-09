"use client";

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from "recharts";

interface PersonaRadarProps {
    scores: {
        Command: number;
        Time: number;
        Play: number;
        Value: number;
    };
}

export function PersonaRadar({ scores }: PersonaRadarProps) {
    // Normalize scores to be positive for the chart (assuming -10 to 10 range per question? No, cumulative)
    // Max score per axis approx: 3 q * 10 = 30. Min -30.
    // Let's normalize to 0-100 or keep it centered.
    // Radar charts usually work best with positive values radiating from center.
    // Center = 0. Range 0 to 100.
    // If score is -30 (Saver) -> 0? +30 (Spender) -> 100?
    // Or display 4 axes? But we have 4 binary axes.
    // Command: Spender vs Saver. 
    // If we want a radar chart, we probably want 4 points? 
    // "Spender", "Saver", "Fast", "Slow"... that's 8 points?
    // Usually MBTI radar charts show the strength of the dominant trait.

    // Let's treat the positive axis as the label, and map the value.
    // Axis 1: Command (Spending Power) - Value high = Spender, Value low = Saver.
    // Actually, let's map it to 4 directions:
    // Top: Command (Spend)
    // Right: Time (Fast)
    // Bottom: Play (Experience)
    // Left: Value (Social)

    // What if score is negative?
    // We can normalize everything to 0-100 where 50 is neutral.
    // -30 -> 0, 0 -> 50, +30 -> 100.

    const normalize = (val: number) => {
        // Max possible absolute value is 30 (3 questions * 10 points)
        // Map -30..30 to 0..100
        return Math.round(((val + 30) / 60) * 100);
    };

    const data = [
        {
            subject: "투자 성향", // Command
            A: normalize(scores.Command),
            fullMark: 100,
        },
        {
            subject: "위험 감수", // Time
            A: normalize(scores.Time),
            fullMark: 100,
        },
        {
            subject: "경험 중시", // Play
            A: normalize(scores.Play),
            fullMark: 100,
        },
        {
            subject: "가치 지향", // Value
            A: normalize(scores.Value),
            fullMark: 100,
        },
    ];

    return (
        <div className="w-full h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#e5e5e5" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="My Persona"
                        dataKey="A"
                        stroke="#0071E3"
                        strokeWidth={2}
                        fill="#0071E3"
                        fillOpacity={0.4}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
