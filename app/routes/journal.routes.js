module.exports=app=>{
  const journals=require("../controllers/journal.controller.js");
  var router=require("express").Router();

  //create a new journal
  router.post("/",journals.create);

  app.use("/api/journals",router);
};