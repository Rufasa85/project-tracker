var timeslot = $("#time-header")
timeslot.text(dayjs().format("dddd MMM DD, YYYY HH:mm:ss"))
setInterval(function(){
    timeslot.text(dayjs().format("dddd MMM DD, YYYY HH:mm:ss"))
},1000)

var projects = JSON.parse(localStorage.getItem("projects"));
if(projects===null){
    projects=[];
}

$("#project-form-btn").on("click",function(e){
    var projObj={
        name:$("#nameInput").val(),
        type:$("#typeInput").val(),
        date:$("#dateInput").val()
    }
    projects.push(projObj)
    localStorage.setItem("projects",JSON.stringify(projects));
    displayProjects()
    $("#nameInput").val("")
    $("#typeInput").val("")
    $("#dateInput").val("")
})

function displayProjects(){
    $("tbody").empty();
    for (let i = 0; i < projects.length; i++) {
       var newTr = $("<tr>");
       var nameCell = $("<td>");
       nameCell.text(projects[i].name);
       newTr.append(nameCell)
       var typeCell = $("<td>");
       typeCell.text(projects[i].type);
       newTr.append(typeCell)
       var dateCell = $("<td>");
       dateCell.text(projects[i].date);
       newTr.append(dateCell)
       var delCell = $("<td>");
       delCell.text("X");
       delCell.addClass("delete-btn")
       delCell.attr("data-idx",i)
       newTr.append(delCell)
       if(dayjs(projects[i].date).isBefore(dayjs(),"days")){
        newTr.addClass("past")
       } else if(dayjs(projects[i].date).isSame(dayjs(),"days")){
        newTr.addClass("present")
       }
       $('tbody').append(newTr);
        
    }
}

displayProjects()

$("table").on("click",".delete-btn",function(e){
   var clickedBtn = $(e.target).attr("data-idx")
   console.log(clickedBtn)
   projects.splice(clickedBtn,1)
   localStorage.setItem("projects",JSON.stringify(projects));
   displayProjects()
})