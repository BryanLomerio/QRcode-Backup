import { useState } from "react";
import QRCode from "react-qr-code";
import { toPng } from 'html-to-image';

function Qr() {
    const [qrCode, setQrCode] = useState('');
    const [input, setInput] = useState('');

    function handleGenerateQrCode() {
        setQrCode(input);
    }

    function handleScreenshot() {
        const qrElement = document.getElementById('qr-code-value');
        toPng(qrElement)
            .then((dataUrl) => {
                fetch(dataUrl)
                    .then(res => res.blob())
                    .then(blob => {
                        const url = URL.createObjectURL(blob);

                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'qr-code.png';

                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        URL.revokeObjectURL(url);
                    })
                    .catch(err => console.error('Failed to create Blob:', err));
            })
            .catch((err) => {
                console.error('Failed to capture screenshot:', err);
            });
    }

    return (
        <>
            <div className="flex justify-center mb-8 bg-[#9534eb] p-8">
                <h1 className="text-4xl font-semibold text-white">QR Code Generator</h1>
            </div>

            <div className="flex justify-center mb-8 space-x-4">
                <input
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    name="generate"
                    className="h-14 w-96 px-6 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                    placeholder="Enter text or URL"
                />
                <button
                    className={`h-14 px-8 bg-[#9534eb] text-white font-semibold rounded-lg transition-all duration-300 ease-in-out 
  ${input.trim() ? 'hover:bg-black hover:scale-105 shadow-xl' : 'bg-gray-400 cursor-not-allowed'}`}
                    disabled={input.trim() === ""}
                    onClick={handleGenerateQrCode}
                >
                    Generate QR
                </button>

            </div>

            {qrCode && (
                <div className="flex justify-center mb-8">
                    <div className="relative flex justify-center items-center w-80 h-80 bg-white shadow-xl rounded-xl border border-gray-200 transform transition-all duration-300 hover:scale-105">
                        <QRCode
                            id="qr-code-value"
                            value={qrCode}
                            size={256}
                        />
                    </div>
                </div>
            )}

            <div className="flex justify-center mb-8">
                <button
                    className="h-14 px-8 bg-[#9534eb] text-white font-semibold rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-black shadow-xl"
                    onClick={handleScreenshot}
                >
                    Download
                </button>

            </div>

            <footer className="flex justify-center items-center text-gray-500 py-8">
                <p className="text-lg">Made with ❤️ by BryanLomerio</p>
            </footer>
        </>
    );
}

export default Qr;
