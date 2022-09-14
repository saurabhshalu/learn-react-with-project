const withTimeStamp = (component) => {
  return (
    <div>
      {component}
      {new Date().toISOString()}
    </div>
  );
};

export default withTimeStamp;
