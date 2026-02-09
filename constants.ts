
import { Track } from './types';

export const MOCK_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Midnight City',
    artist: 'M83',
    album: 'Hurry Up, We\'re Dreaming',
    duration: 243,
    bpm: 105,
    coverUrl: 'https://picsum.photos/seed/m83/200/200',
    source: 'spotify'
  },
  {
    id: '2',
    title: 'Starboy',
    artist: 'The Weeknd',
    album: 'Starboy',
    duration: 230,
    bpm: 93,
    coverUrl: 'https://picsum.photos/seed/weeknd/200/200',
    source: 'apple'
  },
  {
    id: '3',
    title: 'Titanium',
    artist: 'David Guetta',
    album: 'Nothing But the Beat',
    duration: 245,
    bpm: 126,
    coverUrl: 'https://picsum.photos/seed/guetta/200/200',
    source: 'spotify'
  },
  {
    id: '4',
    title: 'Levels',
    artist: 'Avicii',
    album: 'Levels',
    duration: 199,
    bpm: 126,
    coverUrl: 'https://picsum.photos/seed/avicii/200/200',
    source: 'local'
  },
  {
    id: '5',
    title: 'Innerbloom',
    artist: 'RÜFÜS DU SOL',
    album: 'Bloom',
    duration: 578,
    bpm: 122,
    coverUrl: 'https://picsum.photos/seed/rufus/200/200',
    source: 'spotify'
  }
];

export const INITIAL_DECK_STATE = {
  track: null,
  isPlaying: false,
  currentTime: 0,
  volume: 0.8,
  pitch: 1.0,
  eq: { high: 0, mid: 0, low: 0 }
};
