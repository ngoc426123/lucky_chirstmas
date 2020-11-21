@Plugin({
  options: {
    start: 1,
    end: 25003,
    array_offset_number: [0,36,72,108,144,180,216,252,288,324],
    array_number: [],
    
    dataBoxNumber: `[data-box-number]`,
    dataListResult: `[data-list-result]`,
    tmpText: `<div class='number'>
									<div class='rotateNumber'>
										<div class='listNumber'>
											<span><span>T</span></span>
											<span><span>V</span></span>
											<span><span>S</span></span>
											<span><span>H</span></span>
											<span><span>N</span></span>
											<span><span>D</span></span>
											<span><span>I</span></span>
											<span><span>V</span></span>
											<span><span>J</span></span>
											<span><span>L</span></span>
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
    clsRun: `run`,
  }
})
export default class App {
  init () {
    this.initDom();
    this.initProps();
    this.initGame();
    this.handleEvent();
  }

  initDom () {
    const {
      dataBoxNumber,
      dataListResult
    } = this.options;

    this.$boxNumber = this.$element.find(dataBoxNumber);
    this.$listResult = this.$element.find(dataListResult);
  }

  initProps () {
    this.props.arrayNumber = [];
    this.props.arrayOffset = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324];
    this.props.stt = 0;
  }

  handleEvent () {
    // EVENT RUN -> RANDOM -> RESULT
    $(window).on(`keyup`, (event) => this.handleRunBox(event));
  }

  handleRunBox (event) {
    const {
      clsRun
    } = this.options;
    const isRun = this.$boxNumber.find(`.number`).hasClass(clsRun);

    if ( event.keyCode == 13 ) {
			if( !isRun ){
        this.$boxNumber.find(`.number`).addClass(clsRun);
			}
			else{
				this.getPositionNumber();
			}
		}
  }

  initGame () {
    const {
      start,
      end,
      tmpNumber,
      tmpText
    } = this.options;
    const countBoxNum = end.toString().length;

    for (let i = start; i <= end ; i++){
      this.props.arrayNumber.push(i);
    }

    for (let i = 1; i <= countBoxNum; i++) {
      this.$boxNumber.append(i === 1 ? tmpText : tmpNumber);
    }
  }

  removeNumber (number) {
    let indexOf = 0;

    for (var i = this.props.arrayNumber.length - 1; i >= 0; i--) {
      if(this.props.arrayNumber[i] === number){
        indexOf = i;
      }
    }
    this.props.arrayNumber.splice(indexOf, 1);
  }

  getRandomNumber () {
    const indexRandom =  parseInt(Math.random() * (this.props.arrayNumber.length - 0) + 0);
    const returnRandom = this.props.arrayNumber[indexRandom];
    return returnRandom;
  }

  getPadNumber (number, sizer) {
    var retNumber = number.toString();
    while (retNumber.length < sizer) retNumber = "0" + retNumber;
    return retNumber;
  }

  addNumToList (number){
    const date = new Date().toLocaleTimeString();

    this.props.stt++;
    this.$listResult.find(`table`).append(`<tr><td>${this.props.stt}</td><td>${number}</td><td>${date}</td></tr>`);
  }

  getPositionNumber (){
    const {
      end,
      clsRun
    } = this.options;

    const numberRandom = this.getRandomNumber();
    const numberRandomPad = this.getPadNumber(numberRandom, end.toString().length);

    this.removeNumber(numberRandom);
    this.addNumToList(numberRandomPad);

    this.$boxNumber.find(`.number`).each((index, element) => {
      const $element = $(element);
      const indexRandomNumber = numberRandomPad.toString()[index];
      const posStart = this.props.arrayOffset[indexRandomNumber] - 400; 
      const posEnd = this.props.arrayOffset[indexRandomNumber];
      const delay = (end.toString().length - index) * 700;

      setTimeout(() => {
        $element.removeClass(clsRun);
        $element.find(".rotateNumber").css({
          "transform" : `rotateX(${posStart}deg)`,
        });
        setTimeout(() => {
          $element.find(".rotateNumber").css({
            "transition": `all 1.8s ease-out`,
            "transform" : `rotateX(${posEnd}deg)`,
          });
        }, 30);
      }, delay);
    });
  }
}