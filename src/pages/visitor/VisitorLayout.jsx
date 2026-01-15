import { useState } from "react";
import VisitorForm from "./VisitorForm";
import SafetyVideo from "./SafetyVideo";
import Quiz from "./Quiz";
import Result from "./Result";

export default function VisitorLayout() {
    const [step, setStep] = useState(1);
    const [visitorData, setVisitorData] = useState(null);
    const [quizScore, setQuizScore] = useState(0);
    const [quizFailed, setQuizFailed] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-glassDark backdrop-blur-xl border border-white/20 rounded-xl shadow-glass p-6 text-white">
                <h1 className="text-2xl font-bold text-center mb-2">
                    Visitor Safety System
                </h1>

                <p className="text-center text-sm text-white/60 mb-6">
                    Step {step} of 4
                </p>

                {/* STEP 1 */}
                {step === 1 && (
                    <VisitorForm
                        onNext={(data) => {
                            setVisitorData(data);
                            setStep(2);
                        }}
                    />
                )}

                {/* STEP 2 */}
                {step === 2 && <SafetyVideo onNext={() => setStep(3)} />}

                {/* STEP 3 */}
                {step === 3 && (
                    <Quiz
                        onResult={(score) => {
                            setQuizScore(score);
                            if (score >= 8) {
                                setQuizFailed(false);
                                setStep(4);
                            } else {
                                setQuizFailed(true);
                            }
                        }}
                        onRetryWithoutVideo={() => setQuizFailed(false)}
                        onRetryWithVideo={() => {
                            setQuizFailed(false);
                            setStep(2);
                        }}
                        failed={quizFailed}
                    />
                )}

                {/* STEP 4 */}
                {step === 4 && (
                    <Result visitorData={visitorData} score={quizScore} />
                )}
            </div>
        </div>
    );
}
