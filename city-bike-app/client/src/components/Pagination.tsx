const Pagination: React.FC<{
	page: number;
	totalPages: number;
	onPreviousClick: React.MouseEventHandler;
	onNextClick: React.MouseEventHandler;
}> = (props) => {
	return (
		<div className='flex flex-row space-x-1 p-1 self-center'>
			{props.page - 1 > 0 ? (
				<button onClick={props.onPreviousClick}>Previous</button>
			) : (
				<></>
			)}
			{props.totalPages > 1 ? <span>{props.page}</span> : <></>}
			{props.page + 1 <= props.totalPages ? (
				<button onClick={props.onNextClick}>Next</button>
			) : (
				<></>
			)}
		</div>
	);
};

export default Pagination;
