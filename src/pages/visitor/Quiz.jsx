import { useState } from "react";

const QUESTIONS = [
    {
        q: "What should you do while walking inside plant?",
        options: ["Use mobile", "Run", "Walk carefully", "Listen to music"],
        a: 2,
    },
    {
        q: "Where should you cross the road?",
        options: ["Anywhere", "Zebra crossing", "Between vehicles", "No rule"],
        a: 1,
    },
    {
        q: "Helmet is required when?",
        options: ["Driving bike", "Walking", "Sitting", "Talking"],
        a: 0,
    },
    {
        q: "Mobile usage inside plant?",
        options: ["Allowed", "Not allowed", "Sometimes", "No rule"],
        a: 1,
    },
    {
        q: "Safety shoes are worn to?",
        options: ["Look good", "Protect feet", "Noise", "Decoration"],
        a: 1,
    },
    {
        q: "Emergency exits are?",
        options: ["Blocked", "Clearly marked", "Hidden", "Locked"],
        a: 1,
    },
    {
        q: "If alarm sounds?",
        options: ["Ignore", "Run randomly", "Follow instructions", "Panic"],
        a: 2,
    },
    {
        q: "PPE stands for?",
        options: [
            "Personal Protective Equipment",
            "Private Power Engine",
            "Plant Protection",
            "None",
        ],
        a: 0,
    },
    {
        q: "Smoking inside plant?",
        options: ["Allowed", "Only outside", "Not allowed", "Anytime"],
        a: 2,
    },
    {
        q: "Who to report unsafe condition?",
        options: ["No one", "Security / Supervisor", "Friends", "Ignore"],
        a: 1,
    },
];

export default function Quiz({
    onResult,
    onRetryWithVideo,
    onRetryWithoutVideo,
    failed,
}) {
    const [answers, setAnswers] = useState({});

    const score = Object.keys(answers).filter(
        (i) => answers[i] === QUESTIONS[i].a
    ).length;

    const submitQuiz = () => onResult(score);

    return (
        <div className="space-y-5 max-h-[65vh] overflow-y-auto pr-1">
            {/* QUESTIONS */}
            {!failed &&
                QUESTIONS.map((q, i) => (
                    <div
                        key={i}
                        className="rounded-xl border border-white/15 bg-black/30 backdrop-blur-md p-4 shadow-sm"
                    >
                        <p className="font-semibold mb-3 text-white">
                            {i + 1}. {q.q}
                        </p>

                        <div className="grid grid-cols-1 gap-3">
                            {q.options.map((opt, idx) => {
                                const selected = answers[i] === idx;
                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() =>
                                            setAnswers({ ...answers, [i]: idx })
                                        }
                                        className={`
                      flex items-center justify-between
                      w-full px-4 py-3 rounded-lg border
                      transition-all duration-200
                      ${selected
                                                ? "bg-blue-600/90 border-blue-400 shadow-md scale-[1.02]"
                                                : "bg-white/5 border-white/20 hover:bg-white/10"
                                            }
                    `}
                                    >
                                        <span className="text-sm text-left">{opt}</span>
                                        <span
                                            className={`h-4 w-4 rounded-full border flex items-center justify-center
                        ${selected
                                                    ? "border-white bg-white"
                                                    : "border-white/40"
                                                }`}
                                        >
                                            {selected && (
                                                <span className="h-2 w-2 rounded-full bg-blue-600" />
                                            )}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}

            {/* SUBMIT */}
            {!failed && (
                <div className="space-y-2">
                    <button
                        onClick={submitQuiz}
                        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-medium"
                    >
                        Submit Quiz
                    </button>

                    <p className="text-center text-sm text-white/60">
                        Score: {score} / 10 (Min 8 required)
                    </p>
                </div>
            )}

            {/* FAILED UI */}
            {failed && (
                <div className="text-center space-y-4">
                    <h2 className="text-xl font-semibold text-red-400">
                        Test Failed ❌
                    </h2>

                    <p className="text-sm text-white/70">
                        You scored less than 8. Please retry.
                    </p>

                    <button
                        onClick={onRetryWithVideo}
                        className="w-full py-2.5 rounded-xl bg-yellow-600 hover:bg-yellow-700 transition font-medium"
                    >
                        Re-watch Safety Video & Retake Test
                    </button>

                    <button
                        onClick={onRetryWithoutVideo}
                        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-medium"
                    >
                        Retake Test Without Video
                    </button>
                </div>
            )}
        </div>
    );
}
