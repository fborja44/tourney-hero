import { mergeClasses } from '@fluentui/react-components';

interface PulseProps {
	className?: string;
}

const Pulse = ({ className }: PulseProps) => {
	return <span className={mergeClasses('pulse', className)}></span>;
};

export default Pulse;
