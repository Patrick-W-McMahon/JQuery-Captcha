$.fn.captcha = function(valuePass) {
	this.wrap("<div class='captcha'></div>");
	var parent = this.parent();
	var field = this;
	var display_id = this.attr('id')+"_display";
	parent.append("<canvas id='"+display_id+"'> </canvas>");
	var display = document.getElementById(display_id);
	display.style.width = "140px";
	display.style.height = "70px";
	var isHuman = false;
	var ctx = document.getElementById(display_id).getContext("2d"),
		dpr = window.devicePixelRatio || 1,
		bsr = ctx.webkitBackingStorePixelRatio ||
			  ctx.mozBackingStorePixelRatio ||
			  ctx.msBackingStorePixelRatio ||
			  ctx.oBackingStorePixelRatio ||
			  ctx.backingStorePixelRatio || 1;
	var ratio = dpr / bsr;
	var w = display.width;
	var h = display.height;
	display.width = w*ratio;
	display.height = h*ratio;
	display.style.width = w+"px";
	display.style.height = h+"px";
	draw(ctx,false);
	var rect = display.getBoundingClientRect();
	parent.click(function(evt){
		if(field.val()!==valuePass){
			var mpos = {
				x: evt.clientX - rect.left,
				y: evt.clientY - rect.top
			};
			draw(ctx,mpos);
		}
	});
	
	function draw(g,mouse){
		g.clearRect(0,0,g.canvas.width,g.canvas.height);
		var rect = {
			x:15,
			y:30,
			h:85,
			w:85,
			r:8,
			background:"#55acee",
			borderColor:"black",
			activeBackground:"lightgray"
		};
		var checkMark = {
			background:"green",
			borderColor:"black"
		}
		g.fillStyle = rect.background;
		g.strokStyle= rect.borderColor;
		g.fillRect( rect.x, rect.y, rect.w, rect.h);
		if(mouse){
			if(isMouseInRect(rect,mouse)){
				g.fillStyle=rect.activeBackground;
				field.val(valuePass);
				isHuman=true;
			}
		}
		g.beginPath();
		g.moveTo(rect.x,rect.y+rect.r);
		g.lineTo(rect.x,rect.y+rect.h-rect.r);
		g.quadraticCurveTo(rect.x,rect.y+rect.h,rect.x+rect.r,rect.y+rect.h);
		g.lineTo(rect.x+rect.w-rect.r,rect.y+rect.h);
		g.quadraticCurveTo(rect.x+rect.w,rect.y+rect.h,rect.x+rect.w,rect.y+rect.h-rect.r);
		g.lineTo(rect.x+rect.w,rect.y+rect.r);
		g.quadraticCurveTo(rect.x+rect.w,rect.y,rect.x+rect.w-rect.r,rect.y);
		g.lineTo(rect.x+rect.r,rect.y);
		g.quadraticCurveTo(rect.x,rect.y,rect.x,rect.y+rect.r);
		g.closePath();
		g.lineWidth = 5;
		g.stroke();
		g.fill();
		var checkboxObj =[
			{type:"move",x:rect.x+25,y:rect.y+rect.h-8},
			{type:"line",x:rect.x+rect.w+12,y:rect.y+2},
			{type:"line",x:rect.x+30,y:rect.y+rect.h-28},
			{type:"line",x:rect.x+10,y:rect.y+rect.h-50}
		];
		
		if(mouse){
			if(isMouseInRect(rect,mouse)){
				g.shadowBlur=24;
				g.shadowColor="rgba(200,255,0,0.8)";
				g.fillStyle=checkMark.background;
				g.strokStyle= checkMark.borderColor;
				g.beginPath();
				for(i=0;i<checkboxObj.length;i++){
					if(checkboxObj[i].type=="move"){
						g.moveTo(checkboxObj[i].x,checkboxObj[i].y);
					}else if(checkboxObj[i].type=="line"){
						g.lineTo(checkboxObj[i].x,checkboxObj[i].y);
					}
				}
				g.closePath();
				g.lineWidth = 4;
				g.stroke();
				g.fill();
				
				
			}
		}
		g.fillStyle=rect.Background;
		g.font="20px Verdana";
		g.shadowBlur=0;
		var message = {
			x:120,
			y:60,
			spacing:30
		}
		if(isHuman){
			g.fillText("Congratulations",message.x,message.y);
			g.fillText("You're Human",message.x,message.y+message.spacing);
		}else{
			g.fillText("Check the box",message.x,message.y);
			g.fillText("if you're human",message.x,message.y+message.spacing);
		}
		
	}
	
	function isMouseInRect(rect,mouse){
		if((mouse.x>rect.x&&mouse.x<rect.x+rect.w)&&(mouse.y>rect.y&&mouse.y<rect.y+rect.h)){
			return true
		}
		return false;
	}
};
