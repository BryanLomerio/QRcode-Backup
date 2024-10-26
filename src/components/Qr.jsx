import { useState } from "react";
import QRCode from "react-qr-code";
import { toPng } from 'html-to-image';
import "./Qr.css";

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
            <span className="title1">
                <h1 className="title2">Qr Code Generator</h1>
            </span>
            <div className="input-btn">
                <input 
                    onChange={(e) => setInput(e.target.value)} 
                    type="text" 
                    name="generate" 
                />
                <button 
                    className="btn" 
                    disabled={input && input.trim() !== "" ? false : true} 
                    onClick={handleGenerateQrCode}>
                    Generate Qr
                </button>
            </div>
            <div className="qr">
                <QRCode
                    id="qr-code-value"
                    value={qrCode}
                />
            </div>

            <div className="screenshot-container">
                <button 
                    className="screenshot-btn" 
                    onClick={handleScreenshot}>
                    Screenshot me 
                </button>
            </div>

            <div>
                <footer>
                    <p className="footer">Made By: Anino</p>
                </footer>
            </div>
        </>
    );
}

export default Qr;
