export function Username(params) {
  const { status } = params;
  return (
    <>
      {status ? (
        <span>Username already taken.</span>
      ) : (
        <span>Username available.</span>
      )}
    </>
  );
}
