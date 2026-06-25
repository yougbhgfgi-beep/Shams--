import { useState, useEffect } from 'react';
import { Clock, CalendarHeart } from 'lucide-react';

interface TimeElapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateElapsed(startDate: Date): TimeElapsed {
  const now = new Date();
  
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();
  let hours = now.getHours() - startDate.getHours();
  let minutes = now.getMinutes() - startDate.getMinutes();
  let seconds = now.getSeconds() - startDate.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  return { years, months, days, hours, minutes, seconds };
}

export default function CountersSection() {
  const [bdayTime, setBdayTime] = useState<TimeElapsed>(calculateElapsed(new Date('2003-06-25T00:00:00')));
  const [meetTime, setMeetTime] = useState<TimeElapsed>(calculateElapsed(new Date('2025-09-04T00:00:00')));

  useEffect(() => {
    const interval = setInterval(() => {
      setBdayTime(calculateElapsed(new Date('2003-06-25T00:00:00')));
      setMeetTime(calculateElapsed(new Date('2025-09-04T00:00:00')));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const CounterBox = ({ label, value }: { label: string, value: number }) => (
    <div className="flex flex-col items-center p-2 md:p-3 bg-white/40 rounded-xl shadow-[inset_0_2px_10px_rgba(255,105,180,0.1)] border border-pink-200/50 hover:bg-white/60 transition-colors">
      <span className="text-2xl md:text-3xl font-black text-pink-600 font-mono tracking-tight">{value}</span>
      <span className="text-[10px] md:text-sm font-bold text-pink-400 mt-1">{label}</span>
    </div>
  );

  return (
    <section className="relative z-10 py-16 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Birthday Counter */}
        <div className="glass-card rounded-3xl p-6 md:p-8 shadow-xl text-center relative overflow-hidden group border-2 border-white/50 hover:border-pink-300 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition-transform">
              <Clock size={24} />
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-pink-600 mb-2">منذ أن نورتي الدنيا ✨</h3>
          <p className="text-sm text-pink-400 mb-6 font-semibold">25 يونيو 2003</p>
          
          <div className="grid grid-cols-3 gap-2 md:gap-3" dir="rtl">
            <CounterBox label="سنة" value={bdayTime.years} />
            <CounterBox label="شهر" value={bdayTime.months} />
            <CounterBox label="يوم" value={bdayTime.days} />
            <CounterBox label="ساعة" value={bdayTime.hours} />
            <CounterBox label="دقيقة" value={bdayTime.minutes} />
            <CounterBox label="ثانية" value={bdayTime.seconds} />
          </div>
        </div>

        {/* Meeting Counter */}
        <div className="glass-card rounded-3xl p-6 md:p-8 shadow-xl text-center relative overflow-hidden group border-2 border-white/50 hover:border-pink-300 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition-transform">
              <CalendarHeart size={24} />
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-pink-600 mb-2">منذ أول نظرة ومقابلة 💖</h3>
          <p className="text-sm text-pink-400 mb-6 font-semibold">4 سبتمبر 2025</p>
          
          <div className="grid grid-cols-3 gap-2 md:gap-3" dir="rtl">
            <CounterBox label="سنة" value={meetTime.years} />
            <CounterBox label="شهر" value={meetTime.months} />
            <CounterBox label="يوم" value={meetTime.days} />
            <CounterBox label="ساعة" value={meetTime.hours} />
            <CounterBox label="دقيقة" value={meetTime.minutes} />
            <CounterBox label="ثانية" value={meetTime.seconds} />
          </div>
        </div>

      </div>
    </section>
  );
}
