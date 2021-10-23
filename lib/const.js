export const FEATURE_TYPE = {
  REQUEST: 'request',
  RELEASED: 'released',
};

export const DB_NAME =
  process.env.NODE_ENV === 'development' ? 'roadmap-dev' : 'roadmap';
