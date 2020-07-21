oxRule("body", {
  margin: "0",
});

oxRule("*", {
  boxSizing: "border-box",
});

var header = ox("div").css({
  padding: "15px",
  position: "sticky",
  top: 0,
  zIndex: 200,
});

var searchInput = ox("input", header)
  .css({
    backgroundColor: "#555",
    padding: "20px",
    border: "none",
    borderRadius: "10px",
    fontSize: "1.25em",
    width: "100%",
  })
  .atttr({
    placeholder: "search....",
  });
