import React, { useState, useEffect } from 'react';
import { Skull, Shield, RefreshCw, Trophy, Zap, Radio, Crosshair, Crown } from 'lucide-react';

// ==========================================
// [ASSETS & CONFIG] 
// 로컬 실행 시 public/images/ 으로 들ㅇ감
// ==========================================
const GAME_IMAGES = {
  orderMain: "/images/orderMainImg.png", 
  hereticMain: "/images/hereticMainImg.png",
  orderParrot: "/images/orderParrotImg.png",
  hereticDino1: "/images/hereticDino1Img.png",
  hereticDino2: "/images/hereticDino2Img.png",
  hereticDino3: "/images/hereticDino3Img.png",
  orderGood: "/images/orderGoodImg.png",
  orderBad: "/images/orderBadImg.png",
  hereticGood: "/images/hereticGoodImg.png",
  hereticBad: "/images/hereticBadImg.png",
};

const OrderIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" className={className}>
    <circle cx="12" cy="12" r="9" strokeWidth="1" />
    <circle cx="12" cy="12" r="7" strokeDasharray="2 2" strokeOpacity="0.5" />
    <path d="M12 3v18M3 12h18" strokeWidth="0.5" strokeOpacity="0.4" />
    <path d="M5 12h14M12 5v7" strokeWidth="2.5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const HereticIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
    <path d="M12 2l1.5 4.5M19 9l-4.5 1M21 20l-6-3M3 20l5-3M5 9l4.5 1" />
    <path d="M11 13l2-2" strokeWidth="3" />
    <path d="M12 2l2 4M22 9l-5 1.5M17 21l-4-3.5M7 21l4-3.5M2 9l5 1.5" strokeOpacity="0.4" />
  </svg>
);



const QUIZ_DATA = {
  order: {
    name: "질서교",
    engName: "ORDER",
    themeColor: "text-[#00e5ff]", 
    // 호버 시 사용할 클래스를 명시적으로 지정
    hoverClass: "hover:bg-[#7FF2FF] hover:text-black",
    borderColor: "shadow-[0_0_0_2px_#000,0_0_0_4px_#7FF2FF,0_0_15px_#7FF2FF]",
    buttonColor: "bg-[#00e5ff]",
    questions: [
      { q: "수도교회 종탑의 계단 개수에 가장 가까운 것은?", options: ["400개", "500개", "600개", "700개"], answer: 2 },
      { q: "다음 중 질서가 '전쟁에 개입하지 않는' 규칙을 모두 준수한 사례는?", options: ["선전포고 없이 야간 기습을 감행한다", "신전 안으로 대피한 자를 죽이지 않고, 강에 독도 풀지 않았으나, 선전포고 후 약탈을 한다", "선전포고 후 전투를 벌이되, 신전 근처의 공용수로에 독을 탄다", "선전포고 후 전투를 벌이되, 신전 안으로 들어온 자를 사살한다"], answer: 1 },
      { q: "다음 중 수도교회 도서관 본관 지하층의 '망각의 베일' 규칙과 '본관에서 나가면 허락되지 않는 지식은 잊는' 규칙을 함께 고려할 때, 가장 논리적으로 불가능한 진술은?", options: ["어떤 이는 본관을 나가며 특정 지식을 잊고 다시 돌아와 기억을 되찾았다", "어떤 이는 20층 아래로 내려간 뒤, 계단을 오르는 법을 잊어서 돌아오지 못하였다", "어떤 이는 20층 아래에서 알게 된 내용을 자신의 본체에게 전달하였다", "D. 어떤 이는 24층 아래로 내려갔으나, ◼◼◼ ◼◼◼ ◼◼◼."], answer: 3 },
      { q: "세례를 받은 이는 살아서도 죽어서도 질서에 속하며, 어떤 것도 진정으로 소유할 수 없다'는 법칙을 고려할 때, 세례 받은 독송사에게 할 때 가장 '이단적인 행위'로 여겨질 법한 것은?", options: ["'당신은 내 것'이라고 말하며 본인 가문의 인장 반지를 끼워 준다.", "당신에게 반했으나 내 영혼은 로클렘의 것이라고 선언한다.", "기도 시간마다 예배당에서 무혈제를 참가하자고 제안한다.", "'당신의 세례명이 마음에 들지 않으니, 내가 새 이름을 지어 주겠다' 라고 마음 속으로 생각하였으나 곧 철회한다."], answer: 0 },
      { q: "질서의 세례와 이름에 관한 규정을 고려하였을 때 가장 정합적이지 못한 결론은?", options: ["질서가 지배하는 현 시대에서 세례받지 못한 자는 이름이 없다.", "세례받지 못한 인간에게 이름을 붙인 경우 교리상 이단적 행위에 해당할 수 있다.", "동물에게는 영혼이 없으므로 이름을 붙여 주더라도 세례로 치지 않는다.", "영혼이 있는 것에 이름을 붙이는 행위를 신의 권리라고 단정지을 수는 없다."], answer: 3 },
      { q: "성역과 성유물에 관련하여 틀린 설명은?", options: ["매개 없이 원격으로 이적을 쓰는 것은 불가능하다.", "성유물에는 신성력을 미리 담아둘 수 있다.", "성역은 이동할 수 없다.", "제 시간에 타종하는 것과 동시에 성역 선포를 할 시 종소리가 닿는 곳이 모두 성역이 된다."], answer: 2 },
      { q: "공의회에 관하여 옳은 설명은?", options: ["선제후의 수는 총 아홉 명이다.", "대주교의 과반 참석이 보장될 경우 개최된다.", "사도의 과반 이상이 동의하면 공의회를 선포할 수 있다.", "공의회에서 이루어진 논의는 사도회의 승인을 반드시 거쳐야 한다."], answer: 3 },
      { q: "질서의 휘하신의 성수와 상징 색상에 대하여 틀린 설명은?", options: ["기록의 신의 성수는 바다거북이 아닌 육지거북이다.", "레데아의 사제는 성체 집단의 상태를 원격으로 제어할 수 있다.", "얼어붙은 겨울의 신의 상징색은 백색이고, 그 때문에 처형당했다.", "위안의 오피아의 상징색은 연보라색이다."], answer: 2 },
      { q: "예배의 종과 그 울리는 시간에 대하여 옳은 설명은?", options: ["하루에 15번 울린다.", "새벽 6시부터 밤 6시까지 울린다.", "새벽 6시부터 밤 9시까지 울린다.", "하루에 9번 울린다."], answer: 2 },
      { q: "당신의 아름다움을 객관화하였을때 그 수치는?", options: ["10% 미만", "30% 미만", "50% 미만", "수치로 객관화할 수 있는 아름다움이 아님"], answer: 3 },
    ],
    endings: {
      bad: { title: "화형식", subTitle: "BAD ENDING", desc: "당신의 신앙심은 부족했습니다. 질서의 불이 당신을 정화시켜줍니다.", imageKey: "orderBad" },
      good: { title: "예비 사도 임명식(임시)", subTitle: "TRUE ENDING", desc: "완벽합니다! 당신은 훌륭하게 질서교에 녹아들었습니다. (사실 질서 트루엔딩을 아직 못정했습니다...)", imageKey: "orderGood" }
    }
  },
  heretic: {
    name: "이단",
    engName: "HERETIC",
    themeColor: "text-[#ff00ff]", 
    // 호버 시 사용할 클래스를 명시적으로 지정
    hoverClass: "hover:bg-[#ff00ff] hover:text-black",
    borderColor: "shadow-[0_0_0_2px_#000,0_0_0_4px_#ff00ff,0_0_15px_#ff00ff]",
    buttonColor: "bg-[#ff00ff]",
    questions: [
      { q: "컨클루드에서 ‘승리 조건’을 달성하기 위해 필요한 최소 조건으로 옳은 것은?", options: ["유일신이 되는 것", "다크렐름의 95%가 영향권 내 + 최소 5만 명 생존", "다크렐름의 90%가 영향권 내 + 최소 1만 명 생존", "다크렐름의 95%가 영향권 내 + 최소 1만 명 생존"], answer: 3 },
      { q: "다음 중 질서 교단의 추적을 회피하는 방법으로 적절하지 않은 것은?", options: ["잡히기 전 유닛 자결시키기", "땅 속에 묻힌 채로 지속 기도 유지", "축복을 유지한 채 기도-재머 설치하기", "(사제가 없을 시) 추적자를 모두 살해해서 흔적을 없애기"], answer: 2 },
      { q: "컨클루드에서 '영혼'에 대한 설명으로 옳은 것은?", options: ["하나의 영혼은 여러 개체에 분산될 수 있다", "원본을 죽이면 복제가 진짜가 된다", "복제는 충돌을 일으켜 반드시 미쳐버린다", "플레이어가 선택한 자만 진짜가 된다"], answer: 3 },
      { q: "다음 중 질서교의 사제를 살해했을 때 발생할 수 있는 위험으로 가능성이 가장 높은 것은?", options: ["즉시 게임 오버", "천벌-트랩 발동", "이단심문관의 개입 가능성", "신앙 포인트 자동 감소"], answer: 2 },
      { q: "당신이 알고 있는 컨클루드의 최종 판매 부수는?", options: ["60만 부 이하", "65만 부 이상", "70만 부 이상", "100만 부 이상"], answer: 0 },
      { q: "아더갓의 신앙 포인트 수급 구조에 대한 설명으로 가장 옳은 설명은?", options: ["반드시 교주를 통해서만 신앙 포인트가 수급된다", "관장 영역의 영향력이 확산되어도 믿음을 강요하지 않으면 수급이 불가능하다", "신상을 설치하는 것만으로도 포인트 수급이 가능한 경우도 있다", "신앙 포인트는 계약 이후에만 발생한다"], answer: 2 },
      { q: "마더갓의 생체 정보 시스템에 대한 설명으로 가장 옳은 설명은?", options: ["혈액만으로 생체 정보의 온전한 복제가 가능하다", "신의 권능까지 포함해 완전 복제가 가능하다", "수집한 생체 데이터를 이용한 강화는 모든 유닛에 적용할 수 있다", "재탄생은 영혼 분열을 허용한다"], answer: 2 },
      { q: "다음 중 악몽갓의 권능 및 그 제한에 대한 설명으로 옳은 것은?", options: ["수면 자체를 강제로 유도할 수 있다", "악몽을 기억하지 못하면 침입이 불가능하다", "[역행]을 이용하더라도 악몽의 통로는 유지된다", "[흉몽]은 타인이 상태창을 보고 있을 때만 인지할 수 있다"], answer: 2 },
      { q: "Qwerasdf의 플레이 기록에 기반하였을 때, 아래 문장 중 당신이 이 순간 가장 거짓이기를 바라는 문장은?", options: ["나는 시스템을 이해하기 위해 플레이한다.", "신은 감정을 가진다.", "인간은 자원이다.", "사랑은 결국 상태이상이다. 깨어나면 얼마나 비참하겠는가?"], answer: 3 },
      { q: "파비오가 사망하거나 사망하지 않았음에도 게임이 끝날 수 없는 이유로 가장 정확한 것은?", options: ["혼자 살아남았기 때문", "승리 판정 최소 인원 조건을 충족하지 못했기 때문", "당신이 잘못된 선택을 했기 때문에", "헤페니시스께 거짓말을 했기 때문에 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말 거짓말       너는 정말 나와의 약속을 어길 셈인가?"], answer: 3},
    ],
    endings: {
      bad: { title: "번제의 제물", subTitle: "BAD ENDING", desc: "어설픈 지식으로 이단 흉내를 내다가 분노한 뚱됒모니움에게 붙들렸습니다. 따뜻합니다...", imageKey: "hereticBad" },
      good: { title: "어차피 이건 볼 일이 없어야 함", subTitle: "TRUE ENDING", desc: "당신은 해피해피하니까", imageKey: "hereticGood" }
    }
  }
};

// ==========================================
// 3. UI COMPONENTS & HELPERS
// ==========================================

const Scanlines = () => (
  <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden h-full w-full">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[15%] w-full animate-scan" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] pointer-events-none" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
  </div>
);

const PixelCard = ({ children, className = "", color = "#7FF2FF", onClick, style }) => {
  const shadowClass = `shadow-[0_0_0_2px_#000,0_0_0_4px_${color}] hover:shadow-[0_0_0_2px_#000,0_0_0_4px_${color},0_0_20px_${color}]`;
  
  return (
    <div 
      onClick={onClick}
      style={style}
      className={`
        relative bg-[#0a0a12] transition-all duration-300
        ${shadowClass}
        ${onClick ? 'cursor-pointer hover:-translate-y-1 active:translate-y-0 active:shadow-none' : ''}
        ${className}
      `}
    >
      <div className="absolute top-0 left-0 w-2 h-2 bg-white" />
      <div className="absolute top-0 right-0 w-2 h-2 bg-white" />
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-white" />
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-white" />
      {children}
    </div>
  );
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function App() {
  const [gameState, setGameState] = useState('START'); 
  const [faction, setFaction] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(true);

  // Heretic Good Ending State
  const [happyArray, setHappyArray] = useState([]);


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const [parrotX, setParrotX] = useState(0);
  const [parrotDir, setParrotDir] = useState(1);
  
  useEffect(() => {
    if (gameState === 'PLAYING' && faction === 'order') {
      const interval = setInterval(() => {
        setParrotX(prev => {
          if (prev >= 200) { setParrotDir(-1); return 199; }
          if (prev <= -200) { setParrotDir(1); return -199; }
          return prev + (parrotDir * 2);
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [gameState, faction, parrotDir]);
  
    // Heretic Good Ending Infinite Fill Logic
  useEffect(() => {
    if (gameState === 'ENDING' && faction === 'heretic' && score >= 7) {
      const interval = setInterval(() => {
        setHappyArray(prev => [...prev, ...Array(20).fill('HAPPY')]);
      }, 20);
      return () => clearInterval(interval);
    } else {
      setHappyArray([]);
    }
  }, [gameState, faction, score]);



  const startGame = (selectedFaction) => {
    setFaction(selectedFaction);
    setGameState('PLAYING');
    setCurrentQIndex(0);
    setScore(0);
  };

  const handleAnswer = (optionIndex) => {
    if (showFeedback) return;
    const currentQuizData = QUIZ_DATA[faction];
    const isCorrect = currentQuizData.questions[currentQIndex].answer === optionIndex;
    
    // 점수 업데이트 로직
    if (isCorrect) setScore(prev => prev + 1);

    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      const nextIndex = currentQIndex + 1;

      // [이단 루트 전용 로직] 
      if (faction === 'heretic') {
        // 9번 문제를 방금 풀었을 때 (nextIndex 가 9인 상태)
        if (nextIndex === 9) {
          // 방금 풀었던 결과까지 합친 최종 점수가 9점(완벽)인지 확인
          const currentTotalScore = isCorrect ? score + 1 : score;
          if (currentTotalScore < 9) {
            // 하나라도 틀렸으면 10번 안 보여주고 바로 엔딩행
            setGameState('ENDING');
            return;
          }
        }
        
        // 10번 문제를 방금 풀었을 때 (nextIndex 가 10인 상태)
        if (nextIndex === 10) {
            // 10번을 틀렸으면 점수와 관계없이 엔딩(이때 점수는 9점이 됨)
            // 맞혔으면 점수가 10점이 됨
            setGameState('ENDING');
            return;
        }
      }

      // 일반적인 진행 (질서교 또는 이단 9번 이전)
      if (nextIndex < currentQuizData.questions.length) {
        setCurrentQIndex(nextIndex);
      } else {
        setGameState('ENDING');
      }
    }, 800);
  };
  
  const resetGame = () => {
    setGameState('START');
    setFaction(null);
    setScore(0);
    setCurrentQIndex(0);
  };





  if (loading) {
    return (
      <div className="h-screen w-full bg-[#0a0a12] flex items-center justify-center font-['Press_Start_2P']">
        <div className="text-[#7FF2FF] text-center">
          <p className="animate-pulse mb-4 text-xs">LOADING_COGNITIVE_SIMULATION...</p>
          <div className="w-64 h-2 bg-gray-900 border border-[#7FF2FF] p-[2px]">
            <div className="h-full bg-[#7FF2FF] animate-[width_1s_ease-in-out_forwards]" style={{width: '100%'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'START') {
    return (
      <div className="min-h-screen bg-[#0a0a12] text-white font-['Press_Start_2P'] p-4 md:p-10 flex flex-col items-center justify-center relative overflow-hidden">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
          .animate-scan { animation: scan 4s linear infinite; }
          .pixelated { image-rendering: pixelated; }
        `}</style>
        
        <Scanlines />

        <div className="w-full max-w-6xl flex justify-between items-center mb-8 border-b-2 border-white/10 pb-4 z-10">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 bg-[#7FF2FF] animate-pulse" />
             <span className="text-[10px] text-gray-500 tracking-widest uppercase">SELECT_FACTION_PROTOCOL // v.3.0</span>
          </div>
          <div className="flex gap-6 text-[10px] text-gray-400">
             <span className="flex items-center gap-1"><Trophy size={12} className="text-yellow-500" /> Welcome back! Qwerasdf. </span>
          </div>
        </div>

        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 z-10">
          {/* ORDER SELECTION */}
          <PixelCard className="group overflow-hidden flex flex-col min-h-[400px]" color="#00e5ff" onClick={() => startGame('order')}>
            <div className="absolute inset-0 transition-all duration-700">
              <img 
                src={GAME_IMAGES.orderMain} 
                className="w-full h-full object-cover object-center opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                alt="Order"
                onError={(e) => { e.target.style.display='none'; }}
              />
              <div className="absolute inset-0 bg-[#00e5ff]/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
            </div>
            
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center bg-black/20 group-hover:bg-transparent transition-colors">
              <OrderIcon className="w-20 h-20 text-[#00e5ff] mb-6 drop-shadow-[0_0_15px_#00e5ff]" />
              <h2 className="text-4xl md:text-6xl font-game-bold text-white mb-4 tracking-tighter drop-shadow-[4px_4px_0_#000]">질서교도가 되기</h2>
              <p className="text-[#00e5ff] text-[12px] leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">
                사실 안 와도 상관없어요. <br/>어차피 질서를 거부하는 자에게는 죽음뿐이니까요.
              </p>
              <div className="mt-auto px-6 py-3 bg-[#00e5ff] text-black text-[10px] font-bold border-b-4 border-black group-hover:bg-white transition-all">
                천벌_피하기
              </div>
            </div>
          </PixelCard>

          {/* HERETIC SELECTION */}
          <PixelCard className="group overflow-hidden flex flex-col min-h-[400px]" color="#ff00ff" onClick={() => startGame('heretic')}>
            <div className="absolute inset-0 transition-all duration-700">
              <img 
                src={GAME_IMAGES.hereticMain} 
                className="w-full h-full object-cover object-center opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                alt="Heretic"
                onError={(e) => { e.target.style.display='none'; }}
              />
              <div className="absolute inset-0 bg-[#ff00ff]/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
            </div>
            
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center bg-black/20 group-hover:bg-transparent transition-colors">
              <HereticIcon className="w-20 h-20 text-[#ff00ff] mb-6 drop-shadow-[0_0_15px_#ff00ff]" />
              <h2 className="text-4xl md:text-6xl font-game-bold text-white mb-4 tracking-tighter drop-shadow-[4px_4px_0_#000]">이단새끼가 되기</h2>
              <p className="text-[#ff00ff] text-[12px] leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">
                따뜻한 이단의 품 속으로 오세요. <br/> 질서 같은 건 잊어버리세요.
              </p>
              <div className="mt-auto px-6 py-3 bg-[#ff00ff] text-black text-[10px] font-bold border-b-4 border-black group-hover:bg-white transition-all">
                천벌_9스택_챌린지
              </div>
            </div>
          </PixelCard>
        </div>
      </div>
    );
  }

  if (gameState === 'PLAYING') {
    const data = QUIZ_DATA[faction];
    const question = data.questions[currentQIndex];
    const themeColorHex = faction === 'order' ? '#00e5ff' : '#ff00ff';

    return (
      <div className="min-h-screen bg-[#0a0a12] text-white font-['Press_Start_2P'] p-4 flex flex-col items-center justify-center relative overflow-hidden">
        <Scanlines />
        
        {/* Animated Background Grid */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${themeColorHex}22 1px, transparent 1px), linear-gradient(90deg, ${themeColorHex}22 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            transform: 'perspective(1000px) rotateX(60deg) translateY(-200px) scale(3)',
          }}
        />
        
        {faction === 'order' && (
           <div className="absolute top-10 z-0 w-16 transition-transform duration-100"
              style={{ left: '50%', transform: `translateX(calc(-50% + ${parrotX}px)) scaleX(${parrotDir === 1 ? -1 : 1})` }}>
              <img src={GAME_IMAGES.orderParrot} className="w-full pixelated" alt="" onError={(e)=>e.target.style.opacity=0.2} />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] text-[#00e5ff] whitespace-nowrap bg-black/50">SCANNING...</div>
           </div>
        )}

        <div className="w-full max-w-3xl relative z-10">
          
          {/* Heretic Dinos - Moved INSIDE the container and positioned absolutely relative to the quiz card */}
          {faction === 'heretic' && (
            <div className="pointer-events-none z-50">
              {/* Desktop positions: Absolute relative to the container */}
              <div className="hidden md:block absolute -left-32 bottom-0 animate-bounce" style={{ animationDuration: '2.5s' }}>
                <img src={GAME_IMAGES.hereticDino1} className="w-32 h-32 pixelated opacity-80" alt="" onError={(e)=>e.target.style.opacity=0} />
              </div>
              <div className="hidden md:block absolute -right-30 bottom-0 animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>
                <img src={GAME_IMAGES.hereticDino2} className="w-40 h-40 pixelated opacity-80" alt="" onError={(e)=>e.target.style.opacity=0} />
              </div>
              <div className="hidden md:block absolute -right-16 -top-4 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.1s' }}>
                <img src={GAME_IMAGES.hereticDino3} className="w-24 h-24 pixelated opacity-80" alt="" onError={(e)=>e.target.style.opacity=0} />
              </div>

              {/* Mobile positions: Fixed or tucked in corners */}
              <div className="md:hidden fixed bottom-4 left-2 animate-bounce" style={{ animationDuration: '2s' }}>
                <img src={GAME_IMAGES.hereticDino1} className="w-16 h-16 pixelated opacity-60" alt="" onError={(e)=>e.target.style.opacity=0} />
              </div>
              <div className="md:hidden fixed bottom-4 right-2 animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>
                <img src={GAME_IMAGES.hereticDino2} className="w-20 h-20 pixelated opacity-60" alt="" onError={(e)=>e.target.style.opacity=0} />
              </div>
            </div>
          )}

          <div className="flex justify-between items-end mb-8 border-b-2 border-white/20 pb-4">
            <div className="flex flex-col gap-2">
               <div className="flex items-center gap-2">
                 <Radio size={12} className={data.themeColor} />
                 <span className={`text-[8px] ${data.themeColor}`}>SIGNAL_STABLE</span>
               </div>
               <h2 className="text-xl md:text-2xl text-white">{data.name} 심문</h2>
            </div>
            <div className="text-right flex items-center gap-4">
              <span className={`text-3xl md:text-4xl font-black ${data.themeColor}`}>{currentQIndex + 1}</span>
              <div className="h-8 w-[2px] bg-white/20" />
              <span className="text-gray-600 text-[10px] md:text-xs">/ {data.questions.length}</span>
            </div>
          </div>

          <PixelCard className="mb-10 p-8" color={themeColorHex}>
            <p className="text-xs md:text-sm leading-relaxed text-center font-bold break-keep">
              {question.q}
            </p>
          </PixelCard>

          <div className="grid gap-4">
            {question.options.map((option, idx) => {
              const isSelected = showFeedback && idx === question.answer;
              const isWrong = showFeedback && idx !== question.answer;

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={showFeedback}
                  className={`
                    relative w-full p-4 md:p-5 text-left text-[10px] transition-all duration-100 group
                    border-b-4 active:border-b-0 active:translate-y-1
                    ${isSelected 
                      ? 'bg-[#7FF2FF] text-black border-[#004344] shadow-[0_0_20px_#7FF2FF]' 
                      : isWrong
                        ? 'bg-gray-900 text-gray-700 border-gray-950 opacity-40'
                        : `bg-[#1a1a24] text-white border-black ${data.hoverClass}` // 수정된 부분: 명시적 호버 클래스 사용
                    }
                  `}
                  style={{ borderColor: isSelected ? '#004344' : isWrong ? '#000' : themeColorHex }}
                >
                  <div className="flex items-center gap-4">
                    <span className={`
                      w-6 h-6 flex items-center justify-center border text-[8px]
                      ${isSelected ? 'border-black' : `border-${themeColorHex} text-${themeColorHex} group-hover:border-black group-hover:text-black`}
                    `}>
                      {idx + 1}
                    </span>
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

if (gameState === 'ENDING') {
    const data = QUIZ_DATA[faction];
    const totalQ = data.questions.length;
    const isGoodEnding = faction === 'heretic' ? score === 10 : score >= (totalQ * 0.7); 

    const endingData = isGoodEnding ? data.endings.good : data.endings.bad;
    const resultColor = isGoodEnding ? '#7FF2FF' : '#ff0000';
    const isHereticHappy = faction === 'heretic' && isGoodEnding;

    return (
      <div className="min-h-screen bg-[#0a0a12] text-white font-['Press_Start_2P'] p-4 flex items-center justify-center relative overflow-hidden">
        <Scanlines />
        
        {/* ==========================================
            HERETIC GOOD ENDING: INFINITE HAPPY FILL
           ========================================== */}
        {isHereticHappy && (
          <div className="fixed inset-0 z-[100] bg-black overflow-hidden flex flex-wrap content-start select-none pointer-events-none">
            {happyArray.map((text, i) => (
              <span key={i} className="text-[12px] md:text-[16px] font-black leading-none tracking-tighter text-[#ff00ff] pr-1">
                {text}
              </span>
            ))}
          </div>
        )}

        <PixelCard className={`w-full max-w-3xl overflow-hidden flex flex-col ${isHereticHappy ? 'opacity-0' : ''}`} color={resultColor}>
           {/* Mega Image Header */}
           <div className="relative w-full aspect-[21/9] md:aspect-[3/1] bg-black border-b-4 border-white/20 overflow-hidden">
             <img 
               src={GAME_IMAGES[endingData.imageKey]} 
               className={`w-full h-full object-cover ${!isGoodEnding ? 'grayscale contrast-200' : ''}`} 
               alt="Ending"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
             <div className="absolute bottom-4 left-6 text-left">
                <p className="text-[8px] text-gray-400 mb-1 tracking-widest">{endingData.subTitle}</p>
                <h2 className="text-2xl md:text-3xl font-black" style={{ color: resultColor, textShadow: `0_0_15px_${resultColor}` }}>{endingData.title}</h2>
             </div>
             <div className={`absolute top-4 right-6 border-2 px-3 py-1 text-[8px] ${isGoodEnding ? 'border-[#7FF2FF] text-[#7FF2FF]' : 'border-red-600 text-red-600'} animate-pulse bg-black/80`}>
                {isGoodEnding ? 'SYNCHRONIZED' : 'TERMINATED'}
             </div>
           </div>

           {/* Compact Info Section */}
           <div className="p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center bg-black/50">
             <div className="flex-1 text-left">
               <div className="text-[7px] text-gray-500 mb-1 uppercase tracking-tighter">Simulation Summary:</div>
               <p className="text-[9px] md:text-[10px] text-gray-300 leading-relaxed break-keep font-medium">
                 {endingData.desc}
               </p>
             </div>
             
             <div className="flex flex-col items-center justify-center border-l-0 md:border-l-2 border-white/10 px-0 md:px-6 shrink-0">
               <div className="text-[7px] text-gray-500 mb-1">SCORE</div>
               <div className="text-2xl md:text-3xl font-black" style={{ color: resultColor }}>
                 {score}/{totalQ}
               </div>
             </div>
           </div>

           <button onClick={resetGame} className="w-full py-4 bg-white text-black font-bold text-[9px] hover:invert transition-all border-t-4 border-gray-400">
             RESTART_SIMULATION()
           </button>
        </PixelCard>
        
        {/* 이단 해피 도배 시 강제 종료 버튼 (거의 안 보이게 구석에 배치) */}
        {isHereticHappy && (
          <button 
            onClick={resetGame}
            className="fixed bottom-4 right-4 z-[200] opacity-5 hover:opacity-100 bg-white text-black px-2 py-1 text-[8px] font-bold pointer-events-auto border-2 border-black"
          >
            SYS_REBOOT
          </button>
        )}
      </div>
    );
  }
}