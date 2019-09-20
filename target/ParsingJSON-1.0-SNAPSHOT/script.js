$(function(){
   let button = $('#button');
   let input = $('#text');
   button.click(function (event) {
        let textValue = input.val();
        $.ajax({
            "url": "http://jsonplaceholder.typicode.com/users",
            "id": textValue,
            "type":"GET",
            "success": successFunction,
            "error": failureFunction
        });
        function successFunction(response) {
            $('#username').innerText = response.name;
            $('#email').innerText = response.email;
        }
        function failureFunction(response){
            console.error(response);
        }
   });

});