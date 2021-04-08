import React, { useCallback, useState } from 'react';

import { Typewriter } from 'src/common';

export type MainVotingTypewriterProps = {
  children: string[];
};

export const MainVotingTypewriter: React.VFC<MainVotingTypewriterProps> = (
  props
) => {
  const [state, setState] = useState(0);

  const handleEnd = useCallback(
    () => setState((prevState) => prevState + 1),
    []
  );

  return (
    <Typewriter onEnd={handleEnd} delay={100}>
      {props.children[state % props.children.length]}
    </Typewriter>
  );
};
