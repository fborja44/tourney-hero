import { Button } from '@fluentui/react-components';
import { Send16Regular } from '@fluentui/react-icons';

interface SendDataButtonProps {
	className?: string;
	sendData: () => void;
	disabled: boolean;
}

const SendDataButton = ({ className, sendData, disabled }: SendDataButtonProps) => {
	return (
		<Button
			appearance="primary"
			icon={<Send16Regular />}
			iconPosition="after"
			className={className}
			size="small"
			onClick={() => sendData()}
			disabled={disabled}
		>
			Update Overlay
		</Button>
	);
};

export default SendDataButton;
