import { useState, useEffect } from 'react';
import { X, Heart } from 'lucide-react';

const PARAGRAPHS = [
  'يا من سكنت قلبي وروحى، يا من جعلت حياتي أكثر جمالا وألوانًا، في هذا اليوم المميز، أريد أن أعبر لك عن مدى حبي بك .. "كل عام وانتي الحب الذي لا يتغير، القمر الذي ينير لي ليالي، يا أجمل هدية من الله، في كل مرة أنظر في عينيك، أجد نفسي أغرق في بحر من الحب والعشق، كل عام وانتي بخير يا عمري"',
  'وفي هذا اليوم الذي يحتفل فيه العالم بقدومك، أريد أن أخبرك كم أنا محظوظ بوجودك في حياتي. أتذكر أول مره تحدثنا فيها، شعرت وكأنني أعرفك منذ الأزل. منذ ذلك الحين، أصبحتي جزءًا لا يتجزأ من حياتي، شريكة أسرارى، وسندي في كل خطوة ..',
  'لقد مررنا معًا بالكثير من اللحظات الجميلة، وبعض اللحظات الصعبة، ولكن في كل مرة كنا نخرج منها أقوى وأكثر ارتباطًا ببعضنا البعض. أتذكر عندما... (كل مره بنتكلم فيها). تلك اللحظات من أجمل اللحظات في حياتي، ولا أنساها أبدًا.',
  'انتي أكثر من مجرد صديقة، انتي أختي، انتي مراتي، انتي حبييتي ونصف روحي. انتي دائمًا موجودة عندما أحتاجك، ودائمًا تدعميني وتشجعيني على تحقيق أحلامي.',
  'كل سنة وانتي نور حياتي وسندي في الدنيا، انا احبك اكتر مما تستطيعين تخيلة.',
  'انتي اجمل قصيده كتبت واروع اغنية سمعتها. كل سنه وانتي بخير ياحبيبتي، انتي كل شى بالنسبالي وسوف تبقين كذلك الي الابد. انتي الفن اللي بيترسم كل يوم والموسيقي اللي بسمعها في كل لحظه. قلبك هو منزلي وعيناكي هما جنتي. أحبك اكتر من عدد النجوم في السماء، انتي الشمس التي تضيء لي طريقي، انتي نص قلبي الاجمل.',
  'انتي مصدر قوتي، انا ممتن لكل لحظه قضيناها سوا، وعلي كل ذكري جميله جمعتنا. احبك اكثر من اي شي اخر في العالم، كل سنة وانتي طيبه يا روح قلبي، انا أحبك نيابة عن كل جزء بداخلي يحبك.'
];

const TypewriterEffect = () => {
  const [charIndex, setCharIndex] = useState(0);
  const fullText = PARAGRAPHS.join('\n\n');

  useEffect(() => {
    if (charIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCharIndex(c => c + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, fullText]);

  const visibleFullText = fullText.slice(0, charIndex);
  const visibleParagraphs = visibleFullText.split('\n\n');

  return (
    <div className="space-y-6">
      {visibleParagraphs.map((p, i) => (
        <p key={i} className={`text-pink-600 ${i === 4 ? 'text-lg font-bold text-pink-700' : 'text-base'}`}>
          {p}
        </p>
      ))}
    </div>
  );
};

interface Props {
  onClose: () => void;
}

export default function EnvelopeModal({ onClose }: Props) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(255, 20, 147, 0.12)', backdropFilter: 'blur(8px)' }}>

      <div className="relative w-full max-w-2xl animate-fade-in-scale">
        {!opened ? (
          /* ENVELOPE CLOSED */
          <div className="text-center">
            <p className="text-pink-600 font-bold text-xl mb-8">
              ✉️ رسالة خاصة لكِ... اضغطي لفتحها 💌
            </p>
            <button onClick={() => setOpened(true)}
              className="relative mx-auto block cursor-pointer group transition-transform hover:scale-105">
              {/* Envelope body */}
              <div className="w-72 h-48 mx-auto rounded-2xl shadow-2xl relative overflow-hidden"
                style={{ background: 'linear-gradient(145deg, #ffe4f0, #ffc0cb)' }}>

                {/* Envelope flap */}
                <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden">
                  <div className="w-full h-full"
                    style={{
                      background: 'linear-gradient(145deg, #ffb6c1, #ff69b4)',
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    }} />
                </div>

                {/* Center heart */}
                <div className="absolute inset-0 flex items-center justify-center mt-8">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #ff69b4, #ff1493)' }}>
                    <Heart size={24} className="text-white fill-white" />
                  </div>
                </div>

                {/* Bottom folds */}
                <div className="absolute bottom-0 left-0 right-0 h-16"
                  style={{
                    background: 'linear-gradient(to top, #ffb6c1, transparent)',
                  }} />
              </div>
            </button>
          </div>
        ) : (
          /* LETTER OPENED */
          <div className="glass-card rounded-3xl p-6 md:p-10 shadow-2xl animate-letter-slide relative max-h-[85vh] overflow-y-auto custom-scrollbar"
            style={{ boxShadow: '0 30px 70px rgba(255, 105, 180, 0.3)' }}>

            <button onClick={onClose}
              className="sticky top-0 float-left w-10 h-10 rounded-full bg-pink-100 hover:bg-pink-200 flex items-center justify-center transition-colors z-10">
              <X size={20} className="text-pink-500" />
            </button>

            <div className="text-center mb-8 clear-both">
              <div className="flex justify-center gap-1 text-2xl mb-3">
                {'💌 💕 💌'.split(' ').map((e, i) => (
                  <span key={i}>{e}</span>
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl font-black shimmer-text">إلى... شمس 🔆 Shams 🌹</h2>
            </div>

            <div className="text-right leading-relaxed" style={{ fontFamily: 'Cairo', color: '#8b1a4a' }}>
              <TypewriterEffect />

              <div className="my-8 flex items-center justify-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-pink-300" />
                <Heart size={20} className="text-pink-400 fill-pink-300" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-pink-300" />
              </div>

              {/* English Section */}
              <div className="text-left font-sans space-y-4 text-pink-700/90" style={{ direction: 'ltr' }}>
                <p className="italic text-lg">
                  "Happy birthday to my beautiful wife! Every day with you is a gift. I love your sense of humour, your kind heart, and your unwavering support."
                </p>
                <p>
                  Thank you for being my best friend and the love of my life. Here's to many more years of happiness together. Happy birthday to my beautiful wife.. You are the love of my life.. I love you more than words can say.
                </p>
                <p>
                  I'm so grateful to have you in my life.. Thank you for always being there for me.. I'm so lucky to have you in my life.. You make me a better person.
                </p>
                <p>
                  I cherish every moment we spend together.. You are my everything.. My heart belongs to you.. You're the missing piece of my puzzle.
                </p>
                <p className="font-semibold text-pink-600">
                  I love you more with each passing day.. I can't wait to see what adventures we have in store.. Here's to many more years of love and happiness.. I'm so excited to see what the future holds for us.
                </p>
                <p className="text-xl font-bold text-pink-500 mt-4">
                  I love You 💖
                </p>
              </div>

            </div>

            <button onClick={onClose}
              className="mt-10 w-full py-4 rounded-2xl font-bold text-white text-lg transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #ff69b4, #ff1493)' }}>
              أغلق الرسالة 💕
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
