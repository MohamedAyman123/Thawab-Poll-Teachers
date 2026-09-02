import React, { useState } from 'react';
import { LotteryId } from './types/lottery';
import TabBar from './components/TabBar';
import LotteryPage from './components/LotteryPage';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LotteryId>('umrah');

  return (
    <div className="min-h-screen bg-slate-50">
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <LotteryPage lotteryId={activeTab} key={activeTab} />
    </div>
  );
};

export default App;
