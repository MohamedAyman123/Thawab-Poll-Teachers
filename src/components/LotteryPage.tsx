import React, { useState, useEffect } from 'react';
import { LotteryId, Participant, LotteryView as LotteryViewType } from '../types/lottery';
import { LOTTERY_CONFIGS, getThemeClasses } from '../config/lotteryConfig';
import SetupView from './SetupView';
import LotteryView from './LotteryView';

interface LotteryPageProps {
  lotteryId: LotteryId;
}

const LotteryPage: React.FC<LotteryPageProps> = ({ lotteryId }) => {
  const config = LOTTERY_CONFIGS[lotteryId];
  const theme = getThemeClasses(config.colorTheme);

  const [view, setView] = useState<LotteryViewType>('setup');
  const [participants, setParticipants] = useState<Participant[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(config.storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setParticipants(parsed);
        // If there are saved participants, go directly to lottery view
        if (parsed.length > 0) {
          setView('lottery');
        }
      } catch (e) {
        console.error(`Error loading data for ${config.id}:`, e);
      }
    }
  }, [config.storageKey]);

  const handleStartLottery = (newParticipants: Participant[]) => {
    setParticipants(newParticipants);
    localStorage.setItem(config.storageKey, JSON.stringify(newParticipants));
    setView('lottery');
  };

  const handleRemoveCenter = (winner: Participant) => {
    const updated = participants.filter(p => p.center !== winner.center);
    setParticipants(updated);
    localStorage.setItem(config.storageKey, JSON.stringify(updated));
  };

  const handleBackToSetup = () => {
    setView('setup');
  };

  return (
    <div className="min-h-screen pt-20">
      {view === 'setup' ? (
        <SetupView
          onStart={handleStartLottery}
          initialParticipants={participants}
          colorTheme={config.colorTheme}
          title={config.nameAr}
        />
      ) : (
        <LotteryView
          participants={participants}
          onBack={handleBackToSetup}
          onRemoveWinnerCenter={handleRemoveCenter}
          colorTheme={config.colorTheme}
          title={config.nameAr}
          enableNasheed={config.enableNasheed}
        />
      )}
    </div>
  );
};

export default LotteryPage;
