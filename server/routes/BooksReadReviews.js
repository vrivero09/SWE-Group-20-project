// endpoint to get wishlists from database
users.get("/", (req, res) => {
  const decoded = jwt.verify(req.headers["authorization"], SECRET_KEY);
  User.findOne({
    _id: decoded._id
  })
    .populate("wishLists.books")
    .then(user => {
      let wishLists = user.wishLists;
      res.json({ result: 0, wishlists: wishLists });
    });
});
