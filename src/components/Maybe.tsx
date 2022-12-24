type MaybeProps = {
	test: boolean;
	truthy: React.ReactNode;
	falsy: React.ReactNode;
};

function Maybe({ test, truthy, falsy }: MaybeProps) {
	return <>{test ? truthy : falsy}</>;
}

export default Maybe;
