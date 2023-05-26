const Pagination: React.FC<{
	page: number;
	totalPages: number;
	handlePreviousClick: React.MouseEventHandler;
	handleNextClick: React.MouseEventHandler;
}> = (props) => {
	return (
		<div>
			{props.page - 1 > 0 ? (
				<button onClick={props.handlePreviousClick}>Previous</button>
			) : (
				<></>
			)}
			<span>${props.page}</span>
			{props.page + 1 <= props.totalPages ? (
				<button onClick={props.handleNextClick}>Next</button>
			) : (
				<></>
			)}
		</div>
	);
};

export default Pagination;
