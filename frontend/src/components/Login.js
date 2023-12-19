import React, { useState } from 'react';

const EntryScreen = () => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [userId, setUserId] = useState(null);

  // Random number generator
  function generateRandomNumber() {
    return Math.floor(Math.random() * 1000);
  }

  // Yeni sayı oluşturma
  function handleNewNumber() {
    setRandomNumber(generateRandomNumber());
  }

  // Doğrulama işlemi
  async function handleVerification() {
    try {
      const response = await fetch('http://localhost:3000/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: verificationCode }),
      });

      const data = await response.json();

      if (data.success) {
        setIsVerified(true);
        setUserId(data.userId);
      } else {
        setIsVerified(false);
        setUserId(null);
      }
    } catch (error) {
      console.error('Auth API error:', error);
    }
  }

  // Yeni sayı ve kod oluşturma
  async function handleNewCodeAndNumber() {
    try {
      const response = await fetch('http://localhost:3000/generateCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (data.success) {
        setRandomNumber(data.code);
        setIsVerified(false);
        setVerificationCode('');
      } else {
        console.error('Code generation error:', data.message);
      }
    } catch (error) {
      console.error('Code generation error:', error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-screen-lg p-8 flex flex-col items-center">
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
                className="w-full p-4 mb-8 border rounded"
              />
              <div className="flex w-full justify-center"> {/* Center the buttons */}
                <button
                  className="w-48 p-4 bg-blue-500 text-white rounded-xl"
                  onClick={handleNewNumber}
                >
                  Yeni Sayı
                </button>
                <button
                  className="w-48 p-4 bg-green-500 text-white rounded-xl ml-4"
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