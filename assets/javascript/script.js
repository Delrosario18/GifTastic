$(document).ready(function(){
	var topics=["dog","cat","rabbit","turtle","cow","lion","tiger","zebra","hen","rat","mouse","frog","fish","slag","crocodile","bird"];
	
	loadButtons(topics);
	
	function loadButtons(array){
		var i;
		
		for(i=0;i<array.length;i++){
			var button="<button class='button' type='button'>"+array[i]+"</button>";
			$(".buttons").append(button);  
		}

	}
	
	$(".button").click(function(){
		var topic=$(this).text();
		$(".images").empty();
		/*
		$("button").click(function(){
			$.getJSON("http://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=dc6zaTOxFJmzC&limit=10", function(result){
				f
				alert(result['data'][0].url);
			});
		});
		*/
		var xhr = $.get("http://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=dc6zaTOxFJmzC&limit=10");
		xhr.done(function(data) {
		var x;
			 console.log("success", data);
			 for(x=0;x<data['data'].length;x++){ 
				var gifPath=data['data'][x].images.downsized.url;
				var rating=data['data'][x].rating
				var gif="<div class='gif'><img src='"+gifPath+"' class='gifIMG playing' width='80%' height='280'/><br/><span class='r'>rating : "+rating+"</span></div>";
				$(".images").append(gif); 
			 }
		});
	});
	
	$('.images').on('click', '.gifIMG', function() {
		  var src = $(this).attr("src");
		  
		  if($(this).hasClass('playing')){
			 //stop
			 $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
			 $(this).removeClass('playing');
		  } else {
			//play
			$(this).addClass('playing');
			$(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
		  }
		  
	});
	
	
	$(".sub").click(function(){
		var newTopic = document.forms["form"]["query"].value;
		if(isNaN(newTopic) && newTopic!=null){
			topics.push(newTopic);	
			
			var button="<button class='button' type='button'>"+newTopic+"</button>";
			$(".buttons").append(button);
		}else{
			alert("Please provide a valid topic");
		}
	});
	
	
	
});
