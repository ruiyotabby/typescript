const App = () => {
	const courseName = 'Half Stack application development';
	const courseParts = [
		{
			name: 'Fundamentals',
			exerciseCount: 10,
		},
		{
			name: 'Using props to pass data',
			exerciseCount: 7,
		},
		{
			name: 'Deeper type usage',
			exerciseCount: 14,
		},
	];

	const totalExercises = courseParts.reduce(
		(sum, part) => sum + part.exerciseCount,
		0
	);

	return (
		<div>
			<Header courseName={courseName} />
			<Content courseParts={courseParts} />
			<Total total={totalExercises} />
		</div>
	);
};

const Header = ({ courseName }: { courseName: string }) => (
	<h1>{courseName}</h1>
);

const Content = ({
	courseParts,
}: {
	courseParts: { name: string; exerciseCount: number }[];
}) =>
	courseParts.map((coursePart) => (
		<p>
			{coursePart.name} {coursePart.exerciseCount}
		</p>
	));

const Total = ({ total }: { total: number }) => (
	<p>Number of exercises {total}</p>
);

export default App;
