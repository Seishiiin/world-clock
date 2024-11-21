"use client";

import { useState, useEffect } from "react";

export default function Home() {
    const [time, setTime] = useState(new Date());
    const [isDayTime, setIsDayTime] = useState(time.getHours() >= 6 && time.getHours() < 18);
    const [prevTime, setPrevTime] = useState(time);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date();
            setPrevTime(time);
            setTime(currentTime);
            setIsDayTime(currentTime.getHours() >= 6 && currentTime.getHours() < 18);
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    const formatTime = (num) => (num < 10 ? `0${num}` : num);

    const currentDay = time.toLocaleString("fr-FR", { weekday: "long" }).toLowerCase();
    const currentMonth = time.toLocaleString("fr-FR", { month: "long" }).toLowerCase();
    const currentYear = time.getFullYear();

    const yearsRange = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i); // 5 ans avant et après l'année actuelle


    useEffect(() => {
        if (!isDayTime) {
            const generateStars = () => {
                const star = document.createElement("div");
                star.classList.add("star");

                const randomX = Math.random() * window.innerWidth;
                const randomY = Math.random() * window.innerHeight;
                const randomDuration = 2 + Math.random() * 3;
                const randomDelay = Math.random() * 3;

                star.style.position = "absolute";
                star.style.left = `${randomX}px`;
                star.style.top = `${randomY}px`;
                star.style.width = "3px";
                star.style.height = "3px";
                star.style.backgroundColor = "white";
                star.style.opacity = "0.8";
                star.style.borderRadius = "50%";
                star.style.animation = `starAnimation ${randomDuration}s linear infinite`;

                document.body.appendChild(star);

                setTimeout(() => {
                    star.remove();
                }, (randomDelay + randomDuration) * 1000);
            };

            const starInterval = setInterval(generateStars, 250);
            return () => clearInterval(starInterval);
        }
    }, [isDayTime]);

    return (
        <div className={`w-screen h-screen flex justify-center items-center inset-0 transition-all duration-1000 ${isDayTime ? 'bg-gradient-to-t from-[#f7e6a6] to-[#f9f4c1] animate-daySky' : 'bg-gradient-to-t from-[#1e3a8a] to-[#000]'}`}>
            <div className={"relative w-[1280px] h-[768px] flex justify-between items-center overflow-hidden"}>
                <div className="h-full flex justify-start items-center gap-10 z-10">
                    <div className="flex flex-col gap-1">
                        {["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"].map((day, index) => (
                            <span key={index} className={`text-lg ${isDayTime ? "text-black" : "text-white"} ${currentDay === day ? "opacity-100 font-bold" : "opacity-[3%]"}`}>
                                {day.charAt(0).toUpperCase() + day.slice(1)}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-col gap-1">
                        {["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"].map((month, index) => (
                            <span key={index} className={`text-lg ${isDayTime ? "text-black" : "text-white"} ${currentMonth === month ? "opacity-100 font-bold" : "opacity-[3%]"}`}>
                                {month.charAt(0).toUpperCase() + month.slice(1)}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-col gap-1">
                        {yearsRange.map((year, index) => (
                            <span key={index} className={`text-lg ${isDayTime ? "text-black" : "text-white"} ${year === currentYear ? "opacity-100 font-bold" : "opacity-[3%]"}`}>
                                {year}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="h-full flex flex-col justify-center items-center z-10">
                    <div className="flex justify-center items-end gap-5">
                        <span className={`font-bold text-9xl ${isDayTime ? "text-black" : "text-white"}`}>{formatTime(time.getHours())}:</span>
                        <span className={`text-9xl ${isDayTime ? "text-black" : "text-white"}`}>{formatTime(time.getMinutes())}:</span>
                        <span className={`text-9xl ${isDayTime ? "text-black" : "text-white"}`}>{formatTime(time.getSeconds())}</span>
                    </div>
                </div>

                <div className="absolute flex flex-col bottom-0 right-0 text-white font-medium text-sm text-right z-10">
                    <span>Fuseau horaire: <span className={"opacity-60"}>{Intl.DateTimeFormat().resolvedOptions().timeZone}</span></span>
                </div>
            </div>
        </div>
    );
}
