import React from 'react';

import { WalletButton } from 'src/wallets';
import { ToggleThemeButton } from 'src/common';
import {
	LayoutHeader,
	LayoutContainer,
	LayoutWrapper,
	LayoutFooter
} from '../common';

export type MainLayoutProps = {
	title?: string;
	description?: string;
	ogImage?: string;
	ogUrl?: string;
};

export const MainLayout: React.FC<MainLayoutProps> = (props) => {
	return (
		<LayoutWrapper
			title={props.title}
			ogImage={props.ogImage}
			ogUrl={props.ogUrl}
			description={props.description}
		>
			<LayoutHeader
				leftButton={<ToggleThemeButton />}
				rightButton={<WalletButton />}
			/>
			<LayoutContainer>{props.children}</LayoutContainer>
			<LayoutFooter />
		</LayoutWrapper>
	);
};
