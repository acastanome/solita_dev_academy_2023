const Pagination: React.FC<{
	page: number;
	totalPages: number;
	onPreviousClick: React.MouseEventHandler;
	onNextClick: React.MouseEventHandler;
}> = (props) => {
	return (
		<div>
			{props.page - 1 > 0 ? (
				<button onClick={props.onPreviousClick}>Previous</button>
			) : (
				<></>
			)}
			<span>${props.page}</span>
			{props.page + 1 <= props.totalPages ? (
				<button onClick={props.onNextClick}>Next</button>
			) : (
				<></>
			)}
		</div>
	);
};

export default Pagination;
