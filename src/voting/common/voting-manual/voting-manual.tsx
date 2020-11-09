import React from 'react';
import { useMount } from 'react-use';

export type VotingManualProps = {
	onManual: () => void;
};

export const VotingManual: React.FC<VotingManualProps> = (props) => {
	useMount(props.onManual);

	return <div>voting manual</div>;
};
