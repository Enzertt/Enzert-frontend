"use client";

import { useEffect, useRef, useState } from "react";

type Track = {
  title: string;
  duration: string;
  audioUrl: string;
};

type Album = {
  title: string;
  artist: string;
  coverImage: string;
  description: string;
  tracks: Track[];
};

export default function AlbumPlayer({ album }: { album: Album }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const currentTrack = album.tracks[currentTrackIndex];

  const playTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    if (currentTrackIndex < album.tracks.length - 1) {
      setCurrentTrackIndex((p) => p + 1);
      setIsPlaying(true);
    }
  };

  const previousTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex((p) => p - 1);
      setIsPlaying(true);
    }
  };
  const PlaySmallIcon = () => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.load();
    audioRef.current.volume = volume;

    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    if (currentTrackIndex < album.tracks.length - 1) {
      setCurrentTrackIndex((p) => p + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const v = Number(e.target.value);
    audioRef.current.currentTime = v;
    setCurrentTime(v);
  };

  const formatTime = (t: number) => {
    if (!t) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const iconClass = "w-5 h-5 fill-current";

  const IconPlay = () => (
    <svg className={iconClass} viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );

  const IconPause = () => (
    <svg className={iconClass} viewBox="0 0 24 24">
      <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
    </svg>
  );

  const IconNext = () => (
    <svg className={iconClass} viewBox="0 0 24 24">
      <path d="M6 18l8.5-6L6 6v12zm9-12h2v12h-2z" />
    </svg>
  );

  const IconPrev = () => (
    <svg className={iconClass} viewBox="0 0 24 24">
      <path d="M18 6l-8.5 6L18 18V6zM6 6h2v12H6z" />
    </svg>
  );

  const IconShuffle = () => (
    <svg className={iconClass} viewBox="0 0 24 24">
      <path d="M16 3h5v5h-2V6h-3V3zM3 6h5l11 12h-5L3 6zm0 12h5l2-2h3l-3 3H3v-3z" />
    </svg>
  );

  const IconRepeat = () => (
    <svg className={iconClass} viewBox="0 0 24 24">
      <path d="M7 7h11V4l4 4-4 4V9H9a3 3 0 000 6h1v2H9a5 5 0 110-10zm10 10H6v3l-4-4 4-4v3h11a3 3 0 000-6h-1V4h1a5 5 0 110 10z" />
    </svg>
  );

  const IconVolume = () => (
    <svg className={iconClass} viewBox="0 0 24 24">
      <path d="M3 10v4h4l5 4V6L7 10H3zm13.5 2a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4z" />
    </svg>
  );

  if (!album.tracks?.length) {
    return (
      <main className="min-h-screen bg-[#110D0C] text-white flex items-center justify-center px-6">
        <p className="text-gray-400">No tracks available for this album.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#110D0C] text-white pb-40">
      {/* AUDIO */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      >
        <source src={currentTrack?.audioUrl} type="audio/mpeg" />
      </audio>

      {/* TOP */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-[300px_1fr] gap-10">
          <img src={album.coverImage} className="rounded-xl shadow-xl" />

          <div>
            <h1 className="text-5xl font-bold mb-2">{album.title}</h1>
            <p className="text-2xl text-gray-400 mb-4">{album.artist}</p>
            <p className="text-[#D4C3BC]">{album.description}</p>

            <button
              onClick={togglePlay}
              className="mt-8 bg-[#A04100] px-8 py-4 rounded-full hover:scale-105 transition"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        </div>

        {/* TRACKS */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Tracks</h2>

          <div className="space-y-2">
            {album.tracks.map((track, index) => {
              const active = index === currentTrackIndex;

              return (
                <div
                  key={index}
                  onClick={() => playTrack(index)}
                  className={`group flex justify-between items-center px-4 py-3 rounded-lg cursor-pointer transition
        ${
          active
            ? "bg-[#A04100]/20 border border-[#A04100] shadow-[0_0_20px_rgba(160,65,0,0.3)]"
            : "bg-[#1a1a1a]/30 hover:bg-white/10"
        }`}
                >
                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-3">
                    {/* ICON AREA */}
                    <div className="w-6 flex justify-center">
                      {/* ACTIVE + PLAYING → animated bars */}
                      {active && isPlaying ? (
                        <div className="flex gap-[2px] items-end h-4">
                          <span className="w-[2px] h-2 bg-[#A04100] animate-bounce"></span>
                          <span className="w-[2px] h-4 bg-[#A04100] animate-bounce [animation-delay:150ms]"></span>
                          <span className="w-[2px] h-3 bg-[#A04100] animate-bounce [animation-delay:300ms]"></span>
                        </div>
                      ) : (
                        <>
                          {/* DEFAULT → number */}
                          <span className="text-sm text-gray-400 group-hover:hidden">
                            {index + 1}
                          </span>

                          {/* HOVER → play button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              playTrack(index);
                            }}
                            className="hidden group-hover:flex items-center justify-center text-white"
                          >
                            <PlaySmallIcon />
                          </button>
                        </>
                      )}
                    </div>

                    {/* TITLE */}
                    <span
                      className={`${active ? "text-white" : "text-gray-300"}`}
                    >
                      {track.title}
                    </span>
                  </div>

                  {/* DURATION */}
                  <span className="text-gray-400 text-sm">
                    {track.duration}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* PLAYER */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-white/10 px-4 py-3">
        <div className="max-w-6xl mx-auto grid grid-cols-3 items-center">
          {/* LEFT */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 bg-white/10 rounded-md" />

            <div className="min-w-0">
              <p className="text-sm font-medium truncate">
                {currentTrack?.title}
              </p>
              <p className="text-xs text-gray-400 truncate">{album.artist}</p>
            </div>
          </div>

          {/* CENTER */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-5">
              <button className="text-gray-400 hover:text-white transition">
                <IconShuffle />
              </button>

              <button onClick={previousTrack}>
                <IconPrev />
              </button>

              <button
                onClick={togglePlay}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition"
              >
                {isPlaying ? <IconPause /> : <IconPlay />}
              </button>

              <button onClick={nextTrack}>
                <IconNext />
              </button>

              <button className="text-gray-400 hover:text-white transition">
                <IconRepeat />
              </button>
            </div>

            <div className="flex items-center gap-2 w-[400px]">
              <span className="text-[11px] text-gray-400">
                {formatTime(currentTime)}
              </span>

              <div
                className="relative w-full h-1 bg-white/20 rounded-full cursor-pointer group"
                onClick={(e) => {
                  if (!audioRef.current || !duration) return;

                  const rect = e.currentTarget.getBoundingClientRect();
                  const percent = (e.clientX - rect.left) / rect.width;
                  const newTime = percent * duration;

                  audioRef.current.currentTime = newTime;
                  setCurrentTime(newTime);
                }}
              >
                {/* filled progress */}
                <div
                  className="absolute left-0 top-0 h-1 bg-white rounded-full transition-all duration-150"
                  style={{
                    width: `${(currentTime / duration) * 100 || 0}%`,
                  }}
                />

                {/* thumb */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition"
                  style={{
                    left: `${(currentTime / duration) * 100 || 0}%`,
                  }}
                />
              </div>
              <span className="text-[11px] text-gray-400">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-end items-center gap-3">
            <IconVolume />

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => {
                const v = Number(e.target.value);
                setVolume(v);
                if (audioRef.current) audioRef.current.volume = v;
              }}
              className="w-24 accent-white"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
