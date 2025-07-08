'use client';

import React, { useRef, useState } from 'react';
import { Elo } from "@/elo";

export default function Home() {
  const places = [
    'Korean Express',
    'Omars',
    'Kati Shop',
    'Katagiri',
    'Chipotle',
    'Naya',
    'Fotia',
    'Chik Fil A',
    'Tinas',
    'Dos Toros',
    'Just Salad',
    'Digg',
    'Potbelly',
    'Koba',
    'Taco Bell',
    'Shake Shack',
    'Land of Plenty',
    'Kathi Roll',
    'Lenwich'
  ];
  const eloRef = useRef(new Elo(places));
  const matchups = eloRef.current.generatePairs();

  const [index, setIndex] = useState(0);

  const makeSelection = (c1: string, c2: string) => {
    eloRef.current.updateRatings(c1, c2);
    setIndex(index + 1);
  }

  return (
    <>
      <div>
        {index < matchups.length ?
          <div className="flex justify-between items-center">
            <button
              onClick={() => makeSelection(matchups[index][0], matchups[index][1])}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex-1 mr-2"
            >
              {matchups[index][0]}
            </button>
            <span className="text-gray-600 font-semibold">vs</span>
            <button
              onClick={() => makeSelection(matchups[index][1], matchups[index][0])}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex-1 ml-2"
            >
              {matchups[index][1]}
            </button>
          </div> :
          <div>{
            eloRef.current.getRankings().map((p: any) => (<div>{p}</div>))
          }</div>
        }
      </div>
    </>
  );
}
