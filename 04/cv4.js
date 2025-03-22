   //
//console.log("test");
// Write all JavaScript code in a separate script file with type='module'
//

// re-create M class with ES6 class
// constructor param 'element' - HTML element of red circle on page with initial position stored in dataset

// 1. write code for moving circle on page via keyboard keys up, down, etc...

// 2. use handleEvent

// 3. log mouse position to console

// 4. show confirm before using link's href

// 5. stopPropagating on circle to avoid logging mouseposition, also investigate useCapture option


//stop propagation

/* let  circle = document.querySelector("div")
circle.addEventListener("click",function(){
    console.log("clicked on red dot")
}); */  /* shift option A */

class M {
    //vnitřní vlsaosti třídy
    elm;
    _step = 5;

    constructor(element){
        this.elm = element;
    /*     document.body.addEventListener("keydown", this._keydown);
        document.body.addEventListener("keydown", function(e)
        {console.log(this)}
    );
        document.body.addEventListener("keydown",function(){
            console.log(this)
        }); */

       // document.body.addEventListener("keydown", this._keydown.bind(this));
        
        document.body.addEventListener("keydown", this);
             
        document.body.addEventListener("click", this);

        this.elm.style.top = this.elm.dataset.y + "px";
        this.elm.style.left = this.elm.dataset.x + "px";
        /* this._step = 5; */   
    }
    
    handleEvent(e){
        
        if(e.type === "click"){
            console.log("clicked on red dot");
            e.stopPropagation();
        }
    }




    // nedělt to jako arrow funkce
    _keydown(e) { // e je většinou event 
        switch(e.code){

        case "ArrowUp":
            this._move("top", -this._step);
            break;
        case "ArrowDown":
            this._move("top", this._step);
            break;
        case "ArrowLeft":
            this._move("left", -this._step);
            break;
        case "ArrowRight":
            this._move("left", this._step);
            break;
        
        default:
            console.log("Byla stisknuta jina klávesa");
            break;
        }
    }

    _move(dir, mv){ //mv = step   move budeme volat sami
    console.log(this.elm.style[dir]);
    this.elm.style[dir] = (parseInt(this.elm.style[dir]) + mv) + 'px';
    }
}


M.prototype._keydown = function (e) {

}

// move circle
M.prototype._move = function (dir, mv) {

}

// log mouse position
M.prototype._logPosition = function (e) {

}

// showConfirm for links
M.prototype._showConfirm = function (e) {

}

// handleEvent function look at constructor
M.prototype.handleEvent = function (e) {

}

let circleEl = document.querySelector("div");

const m = new M(circleEl); // create new instance of M class