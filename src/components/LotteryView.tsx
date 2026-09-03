import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo
} from 'react';
import { Participant, ColorTheme } from '../types/lottery';
import { getThemeClasses } from '../config/lotteryConfig';

const base = import.meta.env.BASE_URL;

interface LotteryViewProps {
  participants: Participant[];
  onBack: () => void;
  onRemoveWinnerCenter: (winner: Participant) => void;
  colorTheme: ColorTheme;
  title: string;
  subtitle?: string;
  enableNasheed: boolean;
  centerFilterOptions?: string[];
}

const ITEM_HEIGHT = 75;
const SPIN_DURATION = 4000;
const SNAP_THRESHOLD = 0.9;
const VIEWPORT_CENTER_OFFSET = 275 - ITEM_HEIGHT / 2;

function secureRandomInt(max: number): number {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % max;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const LotteryView: React.FC<LotteryViewProps> = ({
  participants,
  onBack,
  onRemoveWinnerCenter,
  colorTheme,
  title,
  subtitle,
  enableNasheed,
  centerFilterOptions
}) => {
  const theme = getThemeClasses(colorTheme);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<Participant | null>(null);
  const [showWinner, setShowWinner] = useState(false);
  const [displayList, setDisplayList] = useState<Participant[]>([]);
  const [isNasheedPlaying, setIsNasheedPlaying] = useState(false);

  // Center filter state (only used when centerFilterOptions is provided)
  const hasCenterFilter = !!centerFilterOptions && centerFilterOptions.length > 0;
  const [selectedCenter, setSelectedCenter] = useState<string>('all');
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const reelRef = useRef<HTMLDivElement>(null);
  const lastOffsetRef = useRef(0);

  const spinSoundRef = useRef<HTMLAudioElement | null>(null);
  const applauseRef = useRef<HTMLAudioElement | null>(null);
  const nasheedRef = useRef<HTMLAudioElement | null>(null);

  // Derived filtered participants based on selected center (no duplication)
  const filteredParticipants = useMemo(() => {
    if (!hasCenterFilter || selectedCenter === 'all') return participants;
    return participants.filter(p => p.center === selectedCenter);
  }, [participants, selectedCenter, hasCenterFilter]);

  useEffect(() => {
    if (!filteredParticipants.length) return;

    const shuffled = shuffleArray(filteredParticipants);
    const LOOPS = 12;
    const list: Participant[] = [];

    for (let i = 0; i < LOOPS; i++) {
      list.push(...shuffled);
    }

    setDisplayList(list);
  }, [filteredParticipants]);

  // Reset draw state when selected center changes (prevents cross-center mixing)
  const handleCenterSelect = (center: string) => {
    if (center === selectedCenter) return;
    setSelectedCenter(center);
    setWinner(null);
    setShowWinner(false);
    setIsSpinning(false);
    lastOffsetRef.current = 0;
    if (reelRef.current) {
      reelRef.current.style.transform = 'translateY(0px)';
    }
  };

  const spin = useCallback(() => {
    if (isSpinning || filteredParticipants.length === 0) return;

    setIsSpinning(true);
    setShowWinner(false);
    setWinner(null);

    if (spinSoundRef.current) {
      spinSoundRef.current.currentTime = 0;
      spinSoundRef.current.volume = 1;
      const playPromise = spinSoundRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("فشل تشغيل صوت السحب:", error);
        });
      }
    }

    const shuffled = shuffleArray(filteredParticipants);
    const winnerIndex = secureRandomInt(shuffled.length);
    const selectedWinner = shuffled[winnerIndex];

    const baseIndex = displayList.length - shuffled.length + winnerIndex;
    const targetOffset = baseIndex * ITEM_HEIGHT - VIEWPORT_CENTER_OFFSET;

    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / SPIN_DURATION, 1);

      let offset: number;

      if (progress < SNAP_THRESHOLD) {
        const local = progress / SNAP_THRESHOLD;
        offset = targetOffset * local * local;
        lastOffsetRef.current = offset;
      } else {
        const snap = (progress - SNAP_THRESHOLD) / (1 - SNAP_THRESHOLD);
        offset = lastOffsetRef.current + (targetOffset - lastOffsetRef.current) * snap;
      }

      if (reelRef.current) {
        reelRef.current.style.transform = `translateY(-${offset}px)`;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setWinner(selectedWinner);

        if (spinSoundRef.current) {
          spinSoundRef.current.pause();
          spinSoundRef.current.currentTime = 0;
        }
      }
    };

    requestAnimationFrame(animate);
  }, [isSpinning, filteredParticipants, displayList]);

  const activeCentersCount = new Set(filteredParticipants.map(p => p.center)).size;
  const activeParticipantsCount = filteredParticipants.length;

  const selectedCenterLabel = selectedCenter === 'all' ? 'كل المراكز' : selectedCenter;

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center overflow-hidden font-['Cairo'] bg-cover bg-center"
      style={{ backgroundImage: `url(${base}background.png)` }}
    >
      <audio ref={spinSoundRef} src={`${base}sounds/wheel.mp3`} loop preload="auto" />
      {enableNasheed && <audio ref={nasheedRef} src={`${base}sounds/nasheed.mp3`} preload="auto" />}
      <audio ref={applauseRef} src={`${base}sounds/applause.mp3`} />

      <div className="w-full flex justify-between items-start px-16 mb-6 z-10">
        <div className="mt-4">
          <h1 className="text-4xl font-black text-white">{title}</h1>
          {subtitle && <h2 className="text-3xl font-black text-white text-center mt-1">{subtitle}</h2>}
        </div>
        <img
          src={`${base}new-logo.png`}
          alt="القرآن يجمعنا"
          className="w-44 h-auto object-contain mt-6"
        />
      </div>

      {!isSpinning && !winner && (
        <div className="text-center text-white mb-8 z-10">
          <div className="text-4xl md:text-5xl font-black drop-shadow-lg">
            بسم الله نبدأ السحب
          </div>
          <div className="text-xl md:text-2xl font-bold mt-2 opacity-90 drop-shadow-md">
            نسأل الله أن يكتبها نصيبًا مباركًا للفائز
          </div>
        </div>
      )}

      {hasCenterFilter && (
        <div className="w-full max-w-7xl px-10 mb-6 z-10">
          <div className="flex items-center justify-between w-full bg-white/25 backdrop-blur-md rounded-3xl border border-white/40 px-6 py-4 shadow-xl">
            <button
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className="flex items-center gap-3 text-white text-2xl font-black drop-shadow-lg"
            >
              <span className={`inline-block transition-transform duration-300 ${isPanelOpen ? '' : '-rotate-90'}`}>▼</span>
              اختيار المركز
            </button>
            {!isPanelOpen && (
              <div className="flex items-center gap-3">
                <span className="text-white/90 text-lg font-bold">السحب في:</span>
                <span className="bg-white text-emerald-900 px-4 py-1 rounded-full text-lg font-black">
                  {selectedCenterLabel}
                </span>
              </div>
            )}
            <img
              src={`${base}new-logo.png`}
              alt="القرآن يجمعنا"
              className="w-12 h-12 object-contain"
            />
          </div>

          {isPanelOpen && (
            <div className="mt-2 bg-white/25 backdrop-blur-md rounded-3xl border border-white/40 p-5 shadow-xl">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <button
                  onClick={() => handleCenterSelect('all')}
                  className={`px-4 py-3 rounded-2xl text-lg font-black text-center transition-all ${
                    selectedCenter === 'all'
                      ? 'bg-white text-emerald-900 shadow-lg scale-105 border-2 border-emerald-400'
                      : 'bg-white/60 text-white hover:bg-white/80'
                  }`}
                >
                  كل المراكز
                </button>
                {centerFilterOptions!.map((center) => (
                  <button
                    key={center}
                    onClick={() => handleCenterSelect(center)}
                    className={`px-4 py-3 rounded-2xl text-base font-black text-center transition-all ${
                      center === selectedCenter
                        ? 'bg-white text-emerald-900 shadow-lg scale-105 border-2 border-emerald-400'
                        : 'bg-white/60 text-white hover:bg-white/80'
                    }`}
                  >
                    {center}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isPanelOpen && (
            <div className="mt-3 flex items-center justify-center gap-3 text-white drop-shadow-lg">
              <span className="text-xl font-black">السحب في:</span>
              <span className="bg-white/90 text-emerald-900 px-6 py-2 rounded-full text-2xl font-black shadow-lg border-2 border-emerald-400">
                {selectedCenterLabel}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="relative flex-1 w-full max-w-7xl flex items-stretch justify-between z-10 bg-white/25 backdrop-blur-sm rounded-[2.5rem] border border-white/40 shadow-2xl px-10 py-10">
        <div className="absolute top-6 right-8 flex gap-4">
          <span className="bg-red-50 text-red-600 px-4 py-2 rounded-full text-lg font-black shadow-md">
            الأسماء: {activeParticipantsCount}
          </span>
          <span className={theme.centersBadge}>
            المراكز المتبقية: {activeCentersCount}
          </span>
        </div>

        {/* Left */}
        <div className="flex flex-col items-center w-48">
          <div className="flex-1 flex items-center justify-center">
            <button
              onClick={spin}
              disabled={isSpinning}
              className={theme.spinButton}
            >
              سحب
            </button>
          </div>
          <button onClick={onBack} className={theme.backText}>
            تعديل البيانات
          </button>
          {enableNasheed && (
            <button
              onClick={() => {
                if (!nasheedRef.current) return;
                if (nasheedRef.current.paused) {
                  nasheedRef.current.play().catch((error) => {
                    console.error("فشل تشغيل النشيد:", error);
                  });
                  setIsNasheedPlaying(true);
                } else {
                  nasheedRef.current.pause();
                  setIsNasheedPlaying(false);
                }
              }}
              className={theme.nasheedButton}
            >
              {isNasheedPlaying ? "⏸ إيقاف النشيد" : "▶ تشغيل النشيد"}
            </button>
          )}
        </div>

        {/* Reel */}
        <div className="relative flex-1 max-h-[550px] overflow-hidden">
          <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 w-full h-28 border-[8px] rounded-[3rem] ${theme.reelBorder} bg-white flex items-center justify-center`}>
            {showWinner && winner ? (
              <div className="text-center winner-pop">
                <div className={theme.winnerText}>{winner.name}</div>
                <div className={theme.winnerCenterText}>{winner.center}</div>
              </div>
            ) : (
              <span className={theme.spinnerText}>
                {isSpinning ? 'جاري الاختيار...' : '؟'}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center">
            <div ref={reelRef} className="flex flex-col items-center">
              {displayList.map((p, i) => (
                <div
                  key={i}
                  className="h-[75px] flex flex-col items-center justify-center opacity-50"
                >
                  <span className={theme.reelItemText}>{p.name}</span>
                  <span className={theme.reelItemCenter}>{p.center}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-center w-48">
          <div className="flex-1 flex items-center justify-center">
            {!showWinner ? (
              <button
                onClick={() => {
                  if (!winner) return;
                  setShowWinner(true);
                  if (enableNasheed && nasheedRef.current) {
                    nasheedRef.current.currentTime = 0;
                    nasheedRef.current.volume = 1;
                    nasheedRef.current.play().catch((error) => {
                      console.error("فشل تشغيل النشيد:", error);
                    });
                    setIsNasheedPlaying(true);
                  }
                }}
                disabled={!winner || isSpinning}
                className={theme.revealButton}
              >
                كشف
              </button>
            ) : (
              <button
                onClick={() => {
                  if (!winner) return;
                  onRemoveWinnerCenter(winner);
                  setWinner(null);
                  setShowWinner(false);
                }}
                className="w-36 h-36 rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white font-black text-sm"
              >
                تأكيد حذف المركز
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LotteryView;
