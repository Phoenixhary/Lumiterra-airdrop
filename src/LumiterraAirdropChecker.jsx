import React, { useState } from 'react';
import { motion } from 'framer-motion';

function djb2Hash(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) hash = (hash * 33) ^ str.charCodeAt(i);
  return Math.abs(hash >>> 0);
}

export default function LumiterraAirdropChecker() {
  const [username, setUsername] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = (e) => {
    e && e.preventDefault();
    if (!username.trim()) return;
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const seed = djb2Hash(username.trim().toLowerCase() + '::lumiterra');
      const percent = seed % 100;
      const hasPosted = (seed % 10) < 3; // 30% chance

      let tier = 'None';
      let amount = 0;

      if (hasPosted) {
        if (percent < 10) {
          tier = 'Legendary';
          amount = Math.round(((seed % 9000) + 2000));
        } else if (percent < 40) {
          tier = 'Rare';
          amount = Math.round(((seed % 5000) + 1000));
        } else {
          tier = 'Common';
          amount = Math.round(((seed % 2000) + 500));
        }
      }

      setResult({ tier, amount, hasPosted });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-2xl bg-yellow-50 border border-yellow-300 text-yellow-900 shadow-lg relative overflow-hidden font-sans">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-3xl font-extrabold mb-3 text-center"
      >
        Lumiterra Airdrop Checker
      </motion.h1>

      <p className="text-sm text-center mb-6 opacity-80">
        Enter your X username to check your allocation (PARODY)
      </p>

      <form onSubmit={handleCheck} className="flex gap-3 mb-3">
        <input
          type="text"
          placeholder="X username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 px-3 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 rounded-lg font-semibold transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Check'}
        </button>
      </form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 rounded-lg bg-yellow-100 border border-yellow-300 text-center"
        >
          {!result.hasPosted ? (
            <p className="mb-2">😢 NOT ELIGIBLE.</p>
          ) : result.tier === 'None' ? (
            <p className="mb-2">You’ve posted about Lumiterra, but no airdrop this round 😅</p>
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-1">{result.tier} Tier 🎉</h2>
              <p className="text-sm">
                You’re eligible for <span className="font-mono">{result.amount.toLocaleString()}</span> $LUMI
              </p>
            </div>
          )}

          <button
            onClick={() => {
              setUsername('');
              setResult(null);
            }}
            className="mt-3 px-3 py-1 rounded-md bg-yellow-300 hover:bg-yellow-400 text-yellow-900 text-sm"
          >
            Reset
          </button>
        </motion.div>
      )}
    </div>
  );
}
