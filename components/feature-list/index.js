import FeatureNewCard from '../feature-new-card';
import FeatureNewSkeletonCard from '../feature-new-card/skeleton';
import FeatureReleaseCard from '../feature-release-card';
import { FEATURE_TYPE } from '../../lib/const';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

export default function FeatureList({
  dataLoading,
  data,
  onVote,
  onPublish,
  onRemove,
}) {
  const auth = useAuth0();

  const NEW_DATA = data[FEATURE_TYPE.REQUEST];
  const RELEASED_DATA = data[FEATURE_TYPE.RELEASED];
  const [showAll, showAllSet] = useState(false);

  const MAX_SHOW_DATA = 10;
  const HAS_HIDE_DATA = NEW_DATA.length > MAX_SHOW_DATA;
  const SHOW_DATA = showAll ? NEW_DATA : NEW_DATA.slice(0, MAX_SHOW_DATA);

  if (dataLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4].map((_, index) => (
          <FeatureNewSkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div>
        {NEW_DATA.length > 0 ? (
          <div className="space-y-6">
            {/* first 10 item */}
            {SHOW_DATA.map((item, index) => (
              <FeatureNewCard
                admin={auth?.user?.sub}
                key={index}
                item={item}
                onVote={onVote}
                onPublish={onPublish}
                onRemove={onRemove}
              />
            ))}
            {/* show all */}
            <button
              className="button-secondary"
              type="button"
              hidden={!HAS_HIDE_DATA || showAll}
              onClick={() => {
                showAllSet(true);
              }}
            >
              Show all features
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <p>Empty state 👻</p>
          </div>
        )}
      </div>

      {/* RELEASED FEATURE LIST */}

      {RELEASED_DATA.length > 0 && (
        <div className="mt-10">
          <h2 className="font-bold">Released</h2>
          <div className="mt-4 space-y-2">
            {RELEASED_DATA.map((item, index) => (
              <FeatureReleaseCard key={index} item={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
