import { Toast, ToastBody, ToastTitle } from '@fluentui/react-components';

interface MessageToastProps {
	title: string;
	message?: string | null;
}

const MessageToast = ({ title, message }: MessageToastProps) => {
	return (
		<Toast>
			<ToastTitle>{title}</ToastTitle>
			{message && <ToastBody>{message}</ToastBody>}
		</Toast>
	);
};

export default MessageToast;
