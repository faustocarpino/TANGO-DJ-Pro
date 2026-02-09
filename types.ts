
export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  bpm: number;
  coverUrl: string;
  source: 'local' | 'spotify' | 'apple';
  audioUrl?: string;
}

export interface DeckState {
  track: Track | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  pitch: number;
  eq: {
    high: number;
    mid: number;
    low: number;
  };
}

export interface MixerState {
  crossfader: number; // -1 to 1
  masterVolume: number;
}

export interface PlaylistItem {
  id: string;
  track: Track;
}
