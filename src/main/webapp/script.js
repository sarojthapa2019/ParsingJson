$(function(){
    let button = $('#button');
    let input = $('#text');
    button.click(function (event) {
        let textValue = input.val();
        $.ajax({
            "url": "http://jsonplaceholder.typicode.com/users",
            "data": {"id":textValue},
            "type":"GET",
            "success": successFunction,
            "error": failureFunction
        });
        function successFunction(response) {

            $('#username').append(response[0].username);
            $('#email').append(response[0].email);
            const userId = response[0].id;
            console.log(response[0].id);
            $.get("http://jsonplaceholder.typicode.com/posts",
                {"userId":userId} ).done(function(data){
                console.log(data);
                let tableDraw = '<tr col><th>Id</th><th>Title</th><th>Body</th><th>Comments</th></tr>';

                $.each(data, function(index, value){
                    console.log(value.id);
                    tableDraw += "<tr ><td>"+value.id+"</td><td>"+value.title +"</td><td>"+value.body+"</td><td><button data-id="+value.id +"  id='show'>Show Comments </button></td></tr>";

                });
                $('#postTable').append(tableDraw);



            }).fail(function(err){
                console.log(err);
            });
        }
        function failureFunction(response){
            console.error(response);
        }


    });
    let commentButton = $('#show');

    $('#postTable').on('click','button' ,function(event){

        console.log("kekekk"+$(this).attr("data-id"));
        let postId = $(this).attr("data-id");
        $.get("http://jsonplaceholder.typicode.com/comments",{
            "postId":postId}).done(function (data) {
            let commentTable ='<tr><td></td><table><tr><th>Id</th><th>Name</th><th>Comment Body</th></tr>';
            $.each(data, function (index, value) {
                commentTable += "<tr><td>"+ value.id+"</td><td>"+value.name+"</td><td>"+value.body+"</td></tr>";
            });
            $("#postTable").append(commentTable);
        }).fail(function (err) {
            console.log(err);
        });
    });



});