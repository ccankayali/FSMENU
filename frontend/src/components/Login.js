import React, { useState } from 'react';

const EntryScreen = () => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());

  function generateRandomNumber() {
    return Math.floor(Math.random() * 1000);
  }

  function handleNewNumber() {
    setRandomNumber(generateRandomNumber());
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-screen-lg p-8 flex flex-col items-center">
        <div className="text-4xl mb-3 text-white">{randomNumber}</div>
        <div className="w-full max-w-xs">
            <h1 className="text-white flex items-center justify-center p-2">Lütfen Doğrulama Kodunu Giriniz</h1>
          <input
            type="text"
            placeholder="Doğrulama Kodu"
            className="w-full p-4 mb-8 border rounded"
          />
          <div className="flex w-full justify-between ">
            <button
              className="w-48 p-4 bg-blue-500 text-white rounded-xl"
              onClick={handleNewNumber}
            >
              Yeni Sayı
            </button>
            <button className="w-48 p-4 bg-blue-500 text-white rounded-xl">İlerle</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryScreen;
