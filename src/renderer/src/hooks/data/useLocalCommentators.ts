import { useCallback, useEffect, useState } from 'react';

const useLocalCommentators = () => {
	const [commentatorList, setCommentatorList] = useState([]);

	const getCommentatorsList = useCallback(async () => {
		const result = await window.api.getCommentators();
		setCommentatorList(result);
		return result;
	}, []);

	useEffect(() => {
		getCommentatorsList();
	}, []);

	return { commentatorList, setCommentatorList, getCommentatorsList };
};

export default useLocalCommentators;
