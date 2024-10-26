import React, { useState } from 'react';

export default function QRCodeGenerator() {
  const [inputText, setInputText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [size, setSize] = useState('200'); 
  const [error, setError] = useState('');

  const generateQRCode = async () => {
    setError('');
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(inputText)}&size=${size}x${size}`;
      setQrCodeUrl(url); 
    } catch (error) {
      setError('Failed to generate QR code.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-600 p-4">
      <div className="bg-white max-w-md w-full rounded-xl shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center text-blue-700">QR Code Generator</h1>
        {error && (
          <div className="text-red-600 font-medium text-center mb-2">{error}</div>
        )}
        <div className="flex flex-col items-center space-y-4">
          {qrCodeUrl ? (
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Your QR Code</h2>
              <a href={qrCodeUrl} target="_blank" rel="noopener noreferrer">
                <img src={qrCodeUrl} alt="Generated QR Code" className="w-full max-w-xs border rounded-lg shadow-md
                transition duration-300 ease-in-out transform hover:scale-95"
                />
              </a>
            </div>
          ) : (
            <div className="w-full h-52 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">QR Code Preview</p>
            </div>
          )}
          <input 
            type="text" 
            className="w-full p-3 border rounded-lg border-gray-300 focus:border-blue-500 focus:outline-none" 
            placeholder="Enter a URL" 
            value={inputText} 
            onChange={(e) => setInputText(e.target.value)} 
          />
          <input 
            type="number" 
            className="w-full p-3 border rounded-lg border-gray-300 focus:border-blue-500 focus:outline-none" 
            placeholder="Size (e.g., 200)" 
            value={size} 
            onChange={(e) => setSize(e.target.value)} 
          />
          <button 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-95" 
            onClick={generateQRCode}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}
