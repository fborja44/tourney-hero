import { Toast, ToastBody, ToastTitle } from '@fluentui/react-components';

interface ServerErrorToastProps {
	title: string;
	message?: string | null;
}

const ServerErrorToast = ({ title, message }: ServerErrorToastProps) => {
	return (
		<Toast>
			<ToastTitle>{title}</ToastTitle>
			{message && <ToastBody>{message}</ToastBody>}
		</Toast>
	);
};

export default ServerErrorToast;
