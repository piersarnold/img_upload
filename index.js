var express = require("express");
var aws = require("aws-sdk");

var app = express();

app.get("/", function(req,res){
    res.render("index.ejs");
});

app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: AWS_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${AWS_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

app.listen(process.env.PORT, function(){
    console.log("Server started on port " + process.env.PORT);
});

const AWS_BUCKET = process.env.AWS_BUCKET;
aws.config.region = "eu-west-2";