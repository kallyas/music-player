// OxRule("body", {
//   margin: "0",
// });

// OxRule("*", {
//   boxSizing: "border-box",
// });

var header = Ox("div").css({
  padding: "15px",
  position: "sticky",
  top: 0,
  zIndex: 200,
});

var searchInput = Ox("input", header)
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
