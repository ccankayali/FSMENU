import React, { useState } from 'react';

const EntryScreen = () => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  // Random number generator
  function generateRandomNumber() {
    return Math.floor(Math.random() * 1000);
  }

  // Handle verification process
  async function handleVerification() {
    try {
      const response = await fetch('http://localhost:3001/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: verificationCode }),
      });

      const data = await response.json();

      if (data.success) {
        setIsVerified(true);
      } else {
        setIsVerified(false);
      }
    } catch (error) {
      console.error('Auth API error:', error);
    }
  }

  // Handle generating a new random number and reset verification status
  function handleNewNumber() {
    setRandomNumber(generateRandomNumber());
    setIsVerified(false);
    setVerificationCode('');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <button className="p-4 mt-5 bg-red-500 text-white rounded-xl mb-16">Admin</button>
      <div className="max-w-screen-lg p-8 flex flex-col items-start">
        {isVerified ? (
          <h1 className="text-4xl mb-3 text-white">Doğrulama Başarılı!</h1>
        ) : (
          <div>
            <div className="text-4xl mb-3 flex items-center justify-center text-white">{randomNumber}</div>
            <div className="w-full max-w-xs">
              <h1 className="text-white flex items-center justify-center p-2">
                Lütfen Doğrulama Kodunu Giriniz
              </h1>
              <input
                type="text"
                placeholder="Doğrulama Kodu"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full p-4 mb-4 border rounded"
              />
              <div className="flex w-full flex-col items-center">
                <button
                  className="w-full p-4 bg-blue-500 text-white rounded-xl mb-2"
                  onClick={handleNewNumber}
                >
                  Yeni Sayı
                </button>
                <button
                  className="w-full p-4 bg-green-500 text-white rounded-xl"
                  onClick={handleVerification}
                >
                  İlerle
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntryScreen;