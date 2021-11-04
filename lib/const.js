export const FEATURE_TYPE = {
  NEW: 'new',
  RELEASED: 'released',
};

export const DB_NAME =
  process.env.NODE_ENV === 'development' ? 'roadmap-dev' : 'roadmap';
