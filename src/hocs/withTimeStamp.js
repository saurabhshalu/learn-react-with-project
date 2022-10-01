const withTimeStamp = (component) => {
  return (
    <div style={{ position: "relative" }}>
      {component}
      <div
        style={{
          position: "absolute",
          top: "calc(100% + 5px)",
          left: "20px",
          color: "gray",
        }}
      >
        {new Date().toTimeString()}
      </div>
    </div>
  );
};

export default withTimeStamp;
