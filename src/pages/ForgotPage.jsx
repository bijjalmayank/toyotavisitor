import { useState } from "react";

export default function ForgotPage() {
    const [step, setStep] = useState(1);
    const [identifier, setIdentifier] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [msg, setMsg] = useState("");

    const strength = password.length < 8
        ? "Weak"
        : /[A-Z]/.test(password) && /\d/.test(password)
            ? "Strong"
            : "Medium";

    const sendOtp = async () => {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}?action=sendForgotOtp&identifier=${identifier}`
        ).then(r => r.json());

        if (res.status === "OK") setStep(2);
        else setMsg(res.message);
    };

    const verifyOtp = async () => {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}?action=verifyForgotOtp&identifier=${identifier}&otp=${otp}`
        ).then(r => r.json());

        if (res.status === "OK") setStep(3);
        else setMsg(res.message);
    };

    const resetPassword = async () => {
        if (password !== confirm) {
            setMsg("Passwords do not match");
            return;
        }

        const res = await fetch(
            `${import.meta.env.VITE_API_URL}?action=resetForgotPassword&identifier=${identifier}&new_password=${password}`
        ).then(r => r.json());

        setMsg(res.message);
        if (res.status === "OK") setStep(4);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
            <div className="bg-slate-900 p-6 rounded-xl w-full max-w-sm space-y-4">
                <h1 className="text-xl font-bold text-center">Forgot Password</h1>

                {step === 1 && (
                    <>
                        <input placeholder="Username / Email / ID" onChange={e => setIdentifier(e.target.value)} />
                        <button onClick={sendOtp}>Send OTP</button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <input placeholder="Enter OTP" onChange={e => setOtp(e.target.value)} />
                        <button onClick={verifyOtp}>Verify OTP</button>
                    </>
                )}

                {step === 3 && (
                    <>
                        <input type="password" placeholder="New Password" onChange={e => setPassword(e.target.value)} />
                        <p className={`text-sm ${strength === "Strong" ? "text-green-400" : strength === "Medium" ? "text-yellow-400" : "text-red-400"}`}>
                            Strength: {strength}
                        </p>
                        <input type="password" placeholder="Confirm Password" onChange={e => setConfirm(e.target.value)} />
                        <button onClick={resetPassword}>Reset Password</button>
                    </>
                )}

                {step === 4 && (
                    <p className="text-green-400 text-center font-bold">
                        Password reset successful. Please login.
                    </p>
                )}

                {msg && <p className="text-red-400 text-sm">{msg}</p>}
            </div>
        </div>
    );
}
