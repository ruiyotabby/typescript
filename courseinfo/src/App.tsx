const App = () => {
	const courseName = 'Half Stack application development';
	interface CoursePartBase {
		name: string;
		exerciseCount: number;
	}

	interface CourseDescription extends CoursePartBase {
		description: string;
	}

	interface CoursePartBasic extends CourseDescription {
		kind: 'basic';
	}

	interface CoursePartGroup extends CoursePartBase {
		groupProjectCount: number;
		kind: 'group';
	}

	interface CoursePartBackground extends CourseDescription {
		backgroundMaterial: string;
		kind: 'background';
	}

	type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

	const courseParts: CoursePart[] = [
		{
			name: 'Fundamentals',
			exerciseCount: 10,
			description: 'This is an awesome course part',
			kind: 'basic',
		},
		{
			name: 'Using props to pass data',
			exerciseCount: 7,
			groupProjectCount: 3,
			kind: 'group',
		},
		{
			name: 'Basics of type Narrowing',
			exerciseCount: 7,
			description: 'How to go from unknown to string',
			kind: 'basic',
		},
		{
			name: 'Deeper type usage',
			exerciseCount: 14,
			description: 'Confusing description',
			backgroundMaterial:
				'https://type-level-typescript.com/template-literal-types',
			kind: 'background',
		},
		{
			name: 'TypeScript in frontend',
			exerciseCount: 10,
			description: 'a hard part',
			kind: 'basic',
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

interface CoursePartProp {
	name: string;
	exerciseCount: number;
	kind: 'basic' | 'background' | 'group';
	description?: string;
	groupProjectCount?: number;
	backgroundMaterial?: string;
}

const Content = ({ courseParts }: { courseParts: CoursePartProp[] }) => {
	return courseParts.map((coursePart, id) => (
		<Part key={id} coursePart={coursePart} />
	));
};

const Part = ({ coursePart }: { coursePart: CoursePartProp }) => {
	let course = <></>;
	switch (coursePart.kind) {
		case 'basic':
			course = (
				<>
					<em>{coursePart.description}</em>
				</>
			);
			break;
		case 'group':
			course = <>project exercises {coursePart.groupProjectCount}</>;
			break;
		case 'background':
			course = (
				<>
					<em>{coursePart.description}</em>
					<div>submit to {coursePart.backgroundMaterial}</div>
				</>
			);
			break;
		default:
			(coursePart: never): never => {
				throw new Error(
					`Unhandled disciminated union: ,
					${JSON.stringify(coursePart)}`
				);
			};
			break;
	}

	return (
		<div>
			<div>
				<strong>
					{coursePart.name} {coursePart.exerciseCount}
				</strong>
			</div>
			{course}
			<p></p>
		</div>
	);
};
const Total = ({ total }: { total: number }) => (
	<p>Number of exercises {total}</p>
);

export default App;
