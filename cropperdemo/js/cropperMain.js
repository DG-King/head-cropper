$(function() {
  	var $image = $(".container > img"),
  		$zoomIn = $("#zoomIn"),
  		$zoomOut = $("#zoomOut"),
  		$rotate = $("#rotate"),
  		$reset = $("#reset"),
  		$clip = $("#clip"),
  		$inputFile = $("#inputFile");

	$image.cropper({
		//裁剪框的比例
	    aspectRatio: 1 / 1,
	    //预览
	    preview: $(".prew"),
	    //裁剪框最小尺寸
	    minCropBoxWidth: 200,
    	minCropBoxHeight: 200
	});

	$zoomIn.click(function() {
		$image.cropper("zoom", 0.1);
	});
	$zoomOut.click(function() {
		$image.cropper("zoom", -0.1);
	});
	$rotate.click(function() {
		$image.cropper("rotate", 90);
	});
	$reset.click(function() {
		$image.cropper("reset", true);
	});
	$clip.click(function() {
		var getCroppedCanvas = $image.cropper("getCroppedCanvas", {
			width: 100,
			height: 100
		});
		$("html").append(getCroppedCanvas);
	});
	$inputFile.click(function() {
		var getCroppedCanvas = $image.cropper("getCroppedCanvas", {
			width: 100,
			height: 100
		});
		var src = getCroppedCanvas.toDataURL("image/png");
		src = src.replace(/^data:image\/(png|jpg);base64,/, "");
		src = window.atob(src);
		var ia = new Uint8Array(src.length);
		for (var i = 0; i < src.length; i++) {
		    ia[i] = src.charCodeAt(i);
		};
		var blob = new Blob([ia], {type:"image/png"});
		var eleImg =  document.getElementById('choseFile').files[0];
		console.log(blob);
		var fd = new FormData();
		console.log(fd);
		fd.append('file',blob, eleImg.name);
		console.log(fd);
		$.ajax({
		    url: "/drawingResource/upload",
		    type: "POST",
		    data: fd,
		    processData: false,
            contentType: false,
		    success: function(e){
		    	console.log(e)
		    }
		});
		//待测试
		/*var eleImg =  document.getElementById('choseFile').files[0];
		$.ajax({
	        type: 'POST',
	        url: '/drawingResource/upload/base64',
	        data: { 
	        	"imgStr" : src,
	        	"fileName" : eleImg.name
	        },
	        success: function (e) {
	        	console.log('Upload success');
	        	console.log(e);
	        },
		    error: function (e) {
			      console.log('Upload error');
			      console.log(e);
			    }
	    });*/
	})
	$("#choseFile").change(function(){
		var ele =  document.getElementById('choseFile').files[0];
		var createObjectURL = function(blob){
          return window[window.webkitURL ? 'webkitURL' : 'URL']['createObjectURL'](blob);
        };
        var newimgdata = createObjectURL(ele);
		$image.cropper("replace", newimgdata);
	})
});