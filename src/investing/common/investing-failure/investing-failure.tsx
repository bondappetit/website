import React from 'react';

import { InvestingInfo } from '../investing-info';

export type InvestingFailureProps = {
	onClick: () => void;
};

export const InvestingFailure: React.FC<InvestingFailureProps> = (props) => {
	return (
		<InvestingInfo
			title="Failed :("
			subtitle={
				<>Oh-oh, something went wrong. Please try the operation again</>
			}
			onClick={props.onClick}
			button="Try again"
		/>
	);
};
