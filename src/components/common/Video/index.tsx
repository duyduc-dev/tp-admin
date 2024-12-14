import { Ref, useState } from 'react';
import ReactVideoPlayer, { type ReactPlayerProps } from 'react-player';

import Image from '@/components/common/Image';
import { cn } from '@/utilities/helper.ts';

type Props = {
  videoId: string;
  containerClassName?: string;
  containerVideoClassName?: string;
  innerRef?: Ref<AppVideoRef>;
} & ReactPlayerProps;

export type AppVideoRef = ReactVideoPlayer;

const AppVideo = ({
  innerRef,
  containerVideoClassName,
  videoId,
  containerClassName,
  ...props
}: Props) => {
  const [loadError, setLoadError] = useState(false);

  return (
    <div className={cn('relative', containerClassName)}>
      <div
        className={cn(
          'relative pt-[56.25%] rounded-[8px] overflow-hidden',
          containerVideoClassName,
        )}
      >
        {loadError && <Image className="absolute top-0 left-0 right-0 bottom-0" />}
        <ReactVideoPlayer
          ref={innerRef}
          className={cn('absolute top-0 left-0')}
          width="100%"
          height="100%"
          controls
          onError={(e) => {
            props.onError?.(e);
            setLoadError(true);
          }}
          onReady={(e) => {
            props.onReady?.(e);
            setLoadError(false);
          }}
          {...props}
          url={`https://www.youtube.com/watch?v=${videoId}`}
        />
      </div>
    </div>
  );
};

export default AppVideo;
