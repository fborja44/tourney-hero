import {
	Combobox,
	Field,
	FieldProps,
	makeStyles,
	shorthands,
	ComboboxProps,
	Option
} from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import { useDispatch } from 'react-redux';
import { updateCommentators } from '../../../redux/actions/dataActions';
import { CommentatorData, LocalCommentator } from '@common/interfaces/Data';

const useStyles = makeStyles({
	formField: {
		flexGrow: 1,
		'& label': {
			color: tokens.colorNeutralForeground3
		}
	},
	input: {
		minWidth: '80px',
		backgroundColor: tokens.colorNeutralBackground1,
		...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke1),
		display: 'flex',
		position: 'relative',
		top: '1px',
		'& input': {
			width: '100%'
		}
	},
	icon: {
		marginRight: tokens.spacingHorizontalSNudge
	},
	display: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		'& img': {
			marginLeft: tokens.spacingHorizontalXS,
			marginRight: tokens.spacingHorizontalM
		}
	}
});

type FluentFieldProps = FieldProps & ComboboxProps;

interface CommentatorSelectFieldProps extends FluentFieldProps {
	commentatorList: LocalCommentator[];
	commentatorNumber: '1' | '2' | '3';
}

const CommentatorSelectField = ({
	label,
	placeholder,
	size,
	value,
	defaultValue,
	commentatorNumber,
	maxLength,
	commentatorList
}: CommentatorSelectFieldProps) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	if (commentatorList.length === 0) {
		return null;
	}

	return (
		<Field label={label} className={classes.formField} size={size}>
			<Combobox
				size={size}
				className={classes.input}
				placeholder={placeholder}
				value={value}
				freeform
				onOptionSelect={(_ev, data) => {
					const commentator = commentatorList.find(
						(elem) => elem.name === data.optionValue
					);
					const selectedCommentator: Partial<CommentatorData> = {
						[`commentator${commentatorNumber}`]: commentator?.name ?? '',
						[`social${commentatorNumber}`]: commentator?.social ?? ''
					};
					dispatch(updateCommentators(selectedCommentator));
				}}
				onChange={(event) => {
					dispatch(
						updateCommentators({
							[`commentator${commentatorNumber}`]: event.target.value
						})
					);
				}}
				defaultValue={defaultValue}
				maxLength={maxLength}
			>
				{commentatorList.map((commentator: LocalCommentator, i: number) => (
					<Option
						key={`${commentator.name}-${i}-${commentatorNumber}`}
						text={commentator.name}
						value={commentator.name}
					>
						{commentator.name}
					</Option>
				))}
			</Combobox>
		</Field>
	);
};

CommentatorSelectField.defaultProps = {
	size: 'small'
};

export default CommentatorSelectField;
