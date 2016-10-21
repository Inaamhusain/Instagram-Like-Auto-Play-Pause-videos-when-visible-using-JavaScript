$(document).ready(function(){
	$("#autoplaySelection").prop("checked", true); // Initially set to autoplay on
	var videos = $('video'), // All videos element
		allVidoesVisenseObj = [];
	var monitorVideo = function(video){ //Handler for each video element
		var visibility = VisSense(video, { fullyvisible: 0.75 }),
			visibility_monitor = visibility.monitor({
				fullyvisible: function(e) {
					video.play();
				}, 
				hidden: function(e) {
					video.pause();
				}
			}).start();
		return {
			visMonitor : visibility_monitor,
			monitorStop : function(){
				this.visMonitor.stop();
			},
			monitorStart : function(){
				this.visMonitor.start();
			}
		};
	};
	videos.each(function( index ) {
		var monitorVids = monitorVideo(this);
		allVidoesVisenseObj.push(monitorVids);
	});
	$("#autoplaySelection").change(function(){ // On change element for on/off autoplay Videos
		var checkedCond = $(this).is(":checked");
		if(checkedCond){
			$.each(allVidoesVisenseObj, function(index, value){
				value.monitorStart();
			});
		}else{
			$.each(allVidoesVisenseObj, function(index, value){
				value.monitorStop();
			});
		}
	});
});
