import React from 'react';
import useMedia from 'react-use/esm/useMedia';

import { ReactComponent as GreenLine } from 'src/assets/images/green-line.svg';
import { InvestingInfo } from '../investing-info';
import { useInvestingSuccessStyles } from './investing-success.styles';

export type InvestingSuccessProps = {
	onClick: () => void;
};

export const InvestingSuccess: React.FC<InvestingSuccessProps> = (props) => {
	const isBiggerThanMediumDesktop = useMedia('(min-width: 960px)');
	const classes = useInvestingSuccessStyles();

	const purchased = 2476;

	return (
		<InvestingInfo
			title={
				<>
					<GreenLine className={classes.greenLine} />
					Congratulations!
				</>
			}
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
