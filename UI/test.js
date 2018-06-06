$.ajax({
       type: "GET",
       url: "http://localhost:500/",
       success: function (msg) {      
           console.log(msg);
       },
       error: function (req, status, error) {
           console.log(req + "# " + status + "@ " + error);
       }
   });