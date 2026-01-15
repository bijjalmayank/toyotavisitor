import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { jsPDF } from "jspdf";
import { createVisitor } from "../../services/sheetsApi";

export default function Result({ visitorData, score }) {
    const [loading, setLoading] = useState(true);
    const [apiData, setApiData] = useState(null);
    const [error, setError] = useState("");
    const hasCreatedRef = useRef(false);
    console.log("Visitor payload", visitorData);


    useEffect(() => {
        if (hasCreatedRef.current) return;   // 🔒 guard
        hasCreatedRef.current = true;

        console.log("Visitor payload", visitorData);

        (async () => {
            try {
                const res = await createVisitor({
                    visitor_name: visitorData?.name,
                    phone: visitorData?.phone,
                    email: visitorData?.email || "",
                    company: visitorData?.company || "",
                    visiting_employee_id: visitorData?.visiting_employee_id || "",
                    visiting_employee_username: visitorData?.visiting_employee_username || "",
                    visiting_employee_name: visitorData?.visiting_employee_name || "",
                    visiting_department: visitorData?.visiting_department || "",
                });

                if (res.status !== "OK") {
                    setError(res.message || "Failed to create visitor");
                } else {
                    setApiData(res);
                }
            } catch (e) {
                setError("Network error");
            } finally {
                setLoading(false);
            }
        })();
    }, [visitorData]);


    if (loading) {
        return <p className="text-center text-white/70">Creating visitor pass…</p>;
    }

    if (error) {
        return <p className="text-center text-red-400">{error}</p>;
    }

    const manualCode = apiData.manual_code;
    const qrValue = apiData.qr_token;

    const downloadQRImage = async () => {
        const canvas = document.createElement("canvas");
        await QRCode.toCanvas(canvas, qrValue, { width: 300 });
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "visitor_qr.png";
        link.click();
    };

    const downloadPDF = async () => {
        const pdf = new jsPDF();
        const canvas = document.createElement("canvas");
        await QRCode.toCanvas(canvas, qrValue, { width: 200 });
        const imgData = canvas.toDataURL("image/png");

        pdf.setFontSize(16);
        pdf.text("Visitor Safety Pass", 70, 20);
        pdf.addImage(imgData, "PNG", 55, 30, 100, 100);

        pdf.setFontSize(12);
        pdf.text(`Name: ${visitorData?.name}`, 20, 140);
        pdf.text(`Phone: ${visitorData?.phone}`, 20, 148);
        pdf.text(`Company: ${visitorData?.company}`, 20, 156);
        pdf.text(`Manual Code: ${manualCode}`, 20, 168);

        pdf.save("visitor_pass.pdf");
    };

    return (
        <div className="text-center space-y-5">
            <h2 className="text-xl font-semibold text-green-400">
                Test Passed 🎉
            </h2>

            <p className="text-sm text-white/70">
                Score: {score} / 10
            </p>

            <div className="bg-black/40 rounded-lg p-4 space-y-1">
                <p className="text-sm">Name: {visitorData?.name}</p>
                <p className="text-sm">Phone: {visitorData?.phone}</p>
                <p className="text-sm">Company: {visitorData?.company}</p>
            </div>

            <div className="border border-dashed border-white/30 rounded-lg p-4 space-y-2">
                <p className="text-sm text-white/60">QR Code</p>
                <QRCodeCanvas value={qrValue} />
                <p className="text-xs">Manual Code: {manualCode}</p>
            </div>

            <div className="space-y-3">
                <button
                    onClick={downloadQRImage}
                    className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
                >
                    Download QR Image
                </button>

                <button
                    onClick={downloadPDF}
                    className="w-full py-2 rounded-xl bg-green-600 hover:bg-green-700 transition"
                >
                    Download PDF Pass
                </button>
            </div>
        </div>
    );
}

function QRCodeCanvas({ value }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            QRCode.toCanvas(canvasRef.current, value, { width: 180 });
        }
    }, [value]);

    return <canvas ref={canvasRef} className="mx-auto" />;
}
