import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export type PortalProps = {
	container?: Element;
};

export const Portal: React.FC<PortalProps> = (props) => {
	const { children, container } = props;
	const [mountNode, setMountNode] = React.useState<
		HTMLElement | Element | null
	>(null);

	useEffect(() => {
		setMountNode(container || document.body);
	}, [container]);

	useEffect(() => {
		if (mountNode) {
			setMountNode(mountNode);

			return () => {
				setMountNode(null);
			};
		}

		return undefined;
	}, [setMountNode, mountNode]);

	if (!mountNode) return mountNode;

	return createPortal(children, mountNode);
};

Portal.displayName = 'Portal';
