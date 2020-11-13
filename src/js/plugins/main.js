$(document).ready(function(){
  // OPTION	
  app = {
		tmpText: "<div class='number'><div class='listNumber'><span>T</span><span>V</span><span>S</span><span>H</span><span>Q</span><span>B</span><span>U</span><span>A</span><span>K</span><span>M</span></div></div>",
		tmpNumber: "<div class='number'><div class='listNumber'><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span></div></div>",
		start: '1',
		end: '30000',
		array_offset_number: [0,-200,-400,-600,-800,-1000,-1200,-1400,-1600,-1800],
		array_number: [],
		stt: 0,
		init : function(){
			$("#setupbox").addClass("hidebox");
			for(i=this.start; i<=this.end; i++){
				this.array_number.push(i);
			}
			countBoxNum = this.end.length;
			for (var i = countBoxNum - 1; i >= 0; i--) {
        $(".boxNumber").append((i === countBoxNum - 1) ? this.tmpText : this.tmpNumber);
			}
		},
		removeNumber : function(number){
			for (var i = this.array_number.length - 1; i >= 0; i--) {
				if(this.array_number[i]==number){
					indexOf = i;
				}
			}
			this.array_number.splice(indexOf,1);
		},
		getRandomNumber : function(){
			indexRandom =  parseInt(Math.random() * (this.array_number.length - 0) + 0);
			returnRandom = this.array_number[indexRandom];
			return returnRandom;
		},
		getPadNumber : function(num, size) {
		    var s = num + "";
		    while (s.length < size) s = "0" + s;
		    return s;
		},
		getPositionNumber : function(){
			_ = this;
			numberRandom = _.getRandomNumber();
			this.removeNumber(numberRandom);
			numberRandom = this.getPadNumber(numberRandom,this.end.length);
			$(".boxNumber .number").each(function(index, element){
				const item = $(element);
				const pos_start = _.array_offset_number[numberRandom[index]] - 600; 
				const pos_end = _.array_offset_number[numberRandom[index]];
				const delay = (_.end.length - index)  * 200;

				setTimeout(() => {
					item.removeClass("run").addClass("endrun");
					item.find(".listNumber").css({
						"transform" : `matrix(1, 0, 0, 1, 0, ${pos_start})`,
					});
					setTimeout(() => {
						item.find(".listNumber").css({
							"transition": `all 2.2s ease-out`,
							"transform" : `matrix(1, 0, 0, 1, 0, ${pos_end})`,
						});
					}, 30);
				}, delay);
			});
			$(".boxNumber>.number>.listNumber:first").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function(){
				_.addNumToList(numberRandom);
			});
		},
		addNumToList : function(num){
			this.stt++;
			d = new Date().toLocaleTimeString();
			$(".listResult table").append("<tr><td>"+this.stt+"</td><td>"+num+"</td><td>"+d+"</td></tr>");
		}
	};

	// EVENT
	app.init();
	$(document).on("keyup",function(e){
		if(e.keyCode==13){
			if(!$(".boxNumber").find(`.number`).hasClass("run")){
				$(".boxNumber").find(`.number`).addClass("run");
			}
			else{
				app.getPositionNumber();
				$("#z145z_hidden").val('');
			}
		}
		if(e.ctrlKey){
			if(e.keyCode==18){
				$("#z145z_hidden").focus();
			}
			if(e.keyCode==32){
				if(!$(".listResult").hasClass("show")){
					$(".listResult").addClass("show");
				}
				else{
					$(".listResult").removeClass("show");
				}
			}
		}
	});
	// DISABLE F5
	// function disableF5(e) { if ((e.which || e.keyCode) == 116) e.preventDefault(); };
	// $(document).bind("keydown", disableF5);
	// $(document).on("keydown", disableF5);
});