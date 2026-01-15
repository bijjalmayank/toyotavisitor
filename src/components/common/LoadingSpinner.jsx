import "./LoadingSpinner.css";

export default function LoadingSpinner({ size = "md" }) {
    const sizeClasses = {
        sm: "w-6 h-6",
        md: "w-10 h-10",
        lg: "w-16 h-16"
    };

    return (
        <div className="flex items-center justify-center">
            <div className={`${sizeClasses[size]} loading-spinner`}></div>
        </div>
    );
}
