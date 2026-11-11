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
  const [selectedCenter, setSelectedCenter] = useState<string>('all');

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

  const handleStartLottery = (newParticipants: Participant[], center: string) => {
    setParticipants(newParticipants);
    setSelectedCenter(center);
    localStorage.setItem(config.storageKey, JSON.stringify(newParticipants));
    setView('lottery');
  };

  const handleRemoveCenter = (winner: Participant) => {
    const updated = participants.filter(p => p.center !== winner.center);
    setParticipants(updated);
    localStorage.setItem(config.storageKey, JSON.stringify(updated));
  };

  const handleRemoveWinner = (winner: Participant) => {
    const updated = participants.filter(p => p.name !== winner.name || p.center !== winner.center);
    setParticipants(updated);
    localStorage.setItem(config.storageKey, JSON.stringify(updated));
  };

  const handleBackToSetup = () => {
    setView('setup');
  };

  const headerTitle = config.headerNameAr || config.nameAr;
  const namesOnly = !!config.namesOnly;

  // Participants used in the draw, filtered by the center chosen on setup
  const drawParticipants = namesOnly || selectedCenter === 'all'
    ? participants
    : participants.filter(p => p.center === selectedCenter);

  const drawCenterLabel = namesOnly
    ? undefined
    : (selectedCenter === 'all' ? 'كل المراكز' : selectedCenter);

  return (
    <div className="min-h-screen pt-20">
      {view === 'setup' ? (
        <SetupView
          onStart={handleStartLottery}
          initialParticipants={participants}
          colorTheme={config.colorTheme}
          title={headerTitle}
          subtitle={config.subtitleAr}
          centerFilterOptions={config.centerFilterOptions}
          logoImage={config.logoImage}
          namesOnly={namesOnly}
        />
      ) : (
        <LotteryView
          participants={drawParticipants}
          onBack={handleBackToSetup}
          onRemoveWinnerCenter={handleRemoveCenter}
          onRemoveWinner={handleRemoveWinner}
          singleCenter={namesOnly || selectedCenter !== 'all'}
          colorTheme={config.colorTheme}
          title={headerTitle}
          subtitle={config.subtitleAr}
          enableNasheed={config.enableNasheed}
          drawCenterLabel={drawCenterLabel}
          logoImage={config.logoImage}
          namesOnly={namesOnly}
        />
      )}
    </div>
  );
};

export default LotteryPage;
