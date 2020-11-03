import React from 'react';
import useMedia from 'react-use/esm/useMedia';

import { InvestingInfo } from '../investing-info';

export type InvestingSuccessProps = {
	onClick: () => void;
};

export const InvestingSuccess: React.FC<InvestingSuccessProps> = (props) => {
	const isBiggerThanMediumDesktop = useMedia('(min-width: 960px)');

	const purchased = 2476;

	return (
		<InvestingInfo
			title="Congratulations!"
			subtitle={
				<>
					You have successfully purchased
					{!isBiggerThanMediumDesktop ? <>&nbsp;</> : ' '}
					{purchased}&nbsp;ART
				</>
			}
			onClick={props.onClick}
			button="Finish!"
		/>
	);
};
