$(document).ready(function(){
  // OPTION
  app = {
		tmpText: `<div class='number'>
								<div class='rotateNumber'>
									<div class='listNumber'>
										<span><span>T</span></span>
										<span><span>V</span></span>
										<span><span>S</span></span>
										<span><span>H</span></span>
										<span><span>Q</span></span>
										<span><span>B</span></span>
										<span><span>U</span></span>
										<span><span>A</span></span>
										<span><span>K</span></span>
										<span><span>M</span></span>
									</div>
									</div>
							</div>`,
		tmpNumber: `<div class='number'>
									<div class='rotateNumber'>
										<div class='listNumber'>
											<span><span>0</span></span>
											<span><span>1</span></span>
											<span><span>2</span></span>
											<span><span>3</span></span>
											<span><span>4</span></span>
											<span><span>5</span></span>
											<span><span>6</span></span>
											<span><span>7</span></span>
											<span><span>8</span></span>
											<span><span>9</span></span>
										</div>
									</div>
								</div>`,
		start: '1',
		end: '99999',
		array_offset_number: [0,36,72,108,144,180,216,252,288,324],
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
			_.removeNumber(numberRandom);
			numberRandom = this.getPadNumber(numberRandom,this.end.length);
			_.addNumToList(numberRandom);
			$(".boxNumber .number").each(function(index, element){
				const item = $(element);
				const pos_start = _.array_offset_number[numberRandom[index]] - 400; 
				const pos_end = _.array_offset_number[numberRandom[index]];
				const delay = (_.end.length - 1 - index) * 700;

				setTimeout(() => {
					item.removeClass("run").addClass("endrun");
					item.find(".rotateNumber").css({
						"transform" : `rotateX(${pos_start}deg)`,
					});
					setTimeout(() => {
						item.find(".rotateNumber").css({
							"transition": `all 1.8s ease-out`,
							"transform" : `rotateX(${pos_end}deg)`,
						});
					}, 30);
				}, delay);
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