export const READER_STORE_KEY = 'e233.dispatch.se1-01.v2';
export const READER_PREFERENCES_EVENT = 'e233:reader-preferences';
export const READER_ENTER_EVENT = 'e233:reader-enter';

export const READER_THEMES = [
  { id: 'void', label: 'Void' },
  { id: 'sepia', label: 'Sepia' },
  { id: 'paper', label: 'Paper' },
] as const;

export const READER_SIZES = [
  { id: 'compact', label: 'Small' },
  { id: 'standard', label: 'Standard' },
  { id: 'large', label: 'Large' },
] as const;

export type ReaderTheme = (typeof READER_THEMES)[number]['id'];
export type ReaderSize = (typeof READER_SIZES)[number]['id'];

export type ReaderPreferences = {
  theme: ReaderTheme;
  size: ReaderSize;
  illustrations: boolean;
};

export type SavedReader = Partial<ReaderPreferences> & {
  sceneId?: string;
  sceneLabel?: string;
  paragraphId?: string;
  progress?: number;
};

export const DEFAULT_READER_PREFERENCES: ReaderPreferences = {
  theme: 'void',
  size: 'standard',
  illustrations: true,
};
