import { useState, useEffect } from 'react';
import { X, ImagePlus } from 'lucide-react';

const IMAGES = [
  { src: './assets/img1.jpeg', label: 'كل نظرة في عينيكي بتخطف قلبي من جديد 💖' },
  { src: './assets/img2.jpeg', label: 'أحلى صدفة وأجمل هدية في حياتي ✨' },
  { src: './assets/img3.jpeg', label: 'معاكي كل لحظة بتبقى ذكرى ما تتنسيش 🌸' },
];

export default function GallerySection() {
  const [selected, setSelected] = useState<typeof IMAGES[0] | null>(null);

  useEffect(() => {
    if (selected) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selected]);

  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-black text-pink-600 mb-3">معرض الصور 📸</h2>
          <p className="text-pink-400 text-lg">أجمل اللحظات المعبّرة</p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-pink-300" />
            <span className="text-pink-400 text-xl">🌸</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-pink-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {IMAGES.map((img, i) => (
            <div key={i} className="gallery-item rounded-3xl overflow-hidden shadow-xl cursor-pointer relative group border-4 border-white"
              onClick={() => setSelected(img)}>
              <img src={img.src} alt={img.label}
                className="w-full h-80 object-cover" />
              {/* Static label always visible at bottom */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pink-900/70 to-transparent flex items-end justify-center pb-4 px-4 text-center">
                <p className="text-white font-bold text-sm leading-snug drop-shadow-md">{img.label}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
          onClick={() => setSelected(null)}>
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)}
              className="absolute -top-5 -right-5 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-2xl z-10 hover:bg-pink-50 transition-colors">
              <X size={24} className="text-pink-500" />
            </button>
            <img src={selected.src} alt={selected.label} className="w-full rounded-3xl shadow-[0_0_40px_rgba(255,105,180,0.4)] object-contain max-h-[75vh] bg-black/20" />
            <div className="text-center mt-6">
              <p className="text-white font-bold text-xl inline-block px-6 py-2 rounded-full bg-pink-600/30 backdrop-blur-sm border border-pink-500/30">
                {selected.label}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
