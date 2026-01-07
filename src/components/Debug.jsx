import React from 'react';

export const Debug = ({ data }) => {
  return (
    <div className="fixed bottom-4 right-4 p-4 bg-slate-900/90 rounded-lg border border-cyan-500/20 text-xs text-slate-300 max-w-lg max-h-64 overflow-auto">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
