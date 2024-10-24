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
    <div className="px-6 py-12 flex flex-col items-center justify-center">
      <div className="rounded-xl border border-gray-500 m-4 p-4">
        <div className="bg-blue-600 rounded-xl p-4">
          {error && (
            <h2 className="text-red-700 font-bold mb-2">{error}</h2>
          )}
          
          {qrCodeUrl && (
            <>
              <h2 className="text-white font-semibold mb-2">Your QR Code</h2>
              <img src={qrCodeUrl} alt="QRCode" className="mt-2" />
            </>
          )}
        </div>
        <input 
          type="text" 
          className="border-solid rounded-md border-blue-500 focus:border-blue-800" 
          placeholder="Enter a URL" 
          value={inputText} 
          onChange={(e) => setInputText(e.target.value)} 
        />
        <input 
          type="number" 
          className="border-solid rounded-md p-1 mx-2 border-slate-500 focus:border-slate-800" 
          value={size} 
          onChange={(e) => setSize(e.target.value)} 
        />
        <button 
          className="mt-4 mx-4 bg-blue-300 hover:bg-blue-500 transition duration-500 ease-in-out hover:scale-90 text-white font-bold py-2 px-4 rounded-md" 
          onClick={generateQRCode}
        >
          GENERATE
        </button>
      </div>
    </div>
  );
}
