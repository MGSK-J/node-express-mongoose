const db=require("../models");
const Journal=db.journals;

//create and store new journal
exports.create=(req,res)=>{
   //validate request
   if(!req.body.title){
    res.status(400).send({message:"content cannot be empty!"});
    return;
   }

//create a journal
const journal=new Journal({
   title:req.body.title,
   authors:req.body.authors,
   published:req.body.published ? req.body.published:false
});

//store a journal in the database
journal
 .save(journal)
 .then(data=>{
  res.send(data);
 })
 .catch(err=>{
    res.status(500).send({
        message:
         err.message || "some error while creating the journal"
    });
 });


//retrieve all journals from the database
exports.findAll=(req,res)=>{
    const title=req.query.title;
    var condition=title?{title:{$regex:new RegExp(title),$options:"i"}}:{};

    Journal.find(condition)
     .then(data=>{
      res.send(data);
     })
     .catch(err=>{
      res.status(500).send({
         message:
           err.message || "some error while retrieving journals"
      });
     });
};

//find a single journal with an id
exports.findOne=(res,req)=>{
   const id=req.params.id;

   Journal.findById(id)
   .then(data=>{
      if(!data)
      res.status(404).send({message:"not found journal with id"+id});
      else
      res.send(data);
   })
   .catch(err=>{
      res.status(500).send({message:"error retrieving journal with id"+id});
   })
};
}
