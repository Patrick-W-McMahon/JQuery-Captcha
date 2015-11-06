$.fn.captcha = function(valuePass) {
	window.requestAnimationFrame = window.requestAnimationFrame || function(callback) { window.setTimeout(callback,16) };
    this.wrap("<div class='captcha'></div>");
	var parent = this.parent();
	var field = this;
	var display_id = this.attr('id')+"_display";
	parent.append("<canvas id='"+display_id+"'> </canvas>");
	var display = document.getElementById(display_id);//$("#"+display_id);
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
			r:6,
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
		if(mouse){
			if(isMouseInRect(rect,mouse)){
				g.fillStyle=checkMark.background;
				g.strokStyle= checkMark.borderColor;
				g.beginPath();
				g.moveTo(rect.x+15,rect.y+rect.h-8);
				g.lineTo(rect.x+rect.w+12,rect.y+14);
				g.lineTo(rect.x+20,rect.y+rect.h-20);
				g.lineTo(rect.x+10,rect.y+rect.h-50);
				g.closePath();
				g.lineWidth = 3;
				g.stroke();
				g.fill();
				
				
			}
		}
		g.fillStyle=rect.Background;
		g.font="20px Verdana";
		var message = {
			x:120,
			y:60,
			spacing:30
		}
		if(isHuman){
			g.fillText("Congradulations",message.x,message.y);
			g.fillText("You're Human",message.x,message.y+message.spacing);
		}else{
			g.fillText("Check the box",message.x,message.y);
			g.fillText("if you're human",message.x,message.y+message.spacing);
		}
		
	}
	
	function isMouseInRect(rect,mouse){
		var wt = rect.w;
		var ht = rect.h;
		var xt = (mouse.x>rect.x&&mouse.x<wt);
		var yt = (mouse.y>rect.y&&mouse.y<ht);
		if(xt&&yt){
			return true
		}
		return false;
	}
};
