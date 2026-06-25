import { useState, useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

export default function MagicSection() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [open]);

  return (
    <section className="relative z-10 py-20 px-4 text-center">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-black text-pink-600 mb-3">رسالة خاصة لكِ 💌</h2>
        <p className="text-pink-400 mb-10 text-lg">اضغطي على الزر لتكتشفي ما بداخله</p>

        <button onClick={() => setOpen(true)}
          className="group relative px-12 py-5 rounded-full font-bold text-2xl text-white transition-all duration-300 hover:scale-110 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #ff69b4, #ff1493, #c2185b)' }}>
          <span className="flex items-center gap-3">
            <Sparkles size={26} className="group-hover:rotate-12 transition-transform" />
            اضغطي هنا 💖
            <Sparkles size={26} className="group-hover:-rotate-12 transition-transform" />
          </span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(255, 20, 147, 0.1)', backdropFilter: 'blur(10px)' }}>
          <div className="glass-card rounded-3xl p-8 max-w-lg w-full shadow-2xl relative text-right"
            style={{ boxShadow: '0 30px 70px rgba(255, 105, 180, 0.35)' }}>

            <button onClick={() => setOpen(false)}
              className="absolute top-4 left-4 w-9 h-9 rounded-full bg-pink-100 hover:bg-pink-200 flex items-center justify-center transition-colors">
              <X size={18} className="text-pink-500" />
            </button>

            <div className="text-center mb-6">
              <div className="text-5xl mb-3">💝</div>
              <h3 className="text-3xl font-black shimmer-text">تهانينا يا شمس 🔆 Shams!</h3>
            </div>

            <div className="space-y-3 text-pink-700 leading-relaxed">
              <p className="text-lg font-semibold">
                🎉 كل عام وانتي بخير يا أجمل إنسانة في الكون!
              </p>
              <p>
                في هذا اليوم الخاص، أتمنى أن يمتلئ قلبكِ بالفرح،
                وأن تُحقّقي كل أحلامكِ وطموحاتكِ. 🌟
              </p>
              <p>
                انتي تستحقين كل خير، كل حب، وكل سعادة.
                لا تنسي أبداً كم انتي مميزة وجميلة. 🌸
              </p>
              <p className="font-bold text-pink-600">
                عيد ميلادكِ الثالث والعشرين... بداية أجمل فصول حياتكِ! ✨
              </p>
            </div>

            <button onClick={() => setOpen(false)}
              className="mt-6 w-full py-3 rounded-2xl font-bold text-white text-lg transition-all hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #ff69b4, #ff1493)' }}>
              شكراً 💕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
