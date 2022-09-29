//set image
// var boxes = document.getElementsByClassName("box");
var boxes = $('.box')

var arrColumns = ['a','b','c','d','e','f','g','h']

function insertImage() {
    for(var i =0 ;i<boxes.length;i++){
        if(boxes[i].innerText.length !== 0 ){

            if(boxes[i].innerText == "Wpawn"){
                    boxes[i].innerHTML=`<img class="imgPawn Wpawn" src="images/Wpawn.png" alt="">`;
                }
                else{
                    if(boxes[i].innerText == "Bpawn"){
                        boxes[i].innerHTML=`<img class="imgPawn Bpawn" src="images/Bpawn.png" alt="">`;
                    
                }
                else{

                    boxes[i].innerHTML = `<img class='imgPawn ${boxes[i].innerText}' src="images/${boxes[i].innerText}.png" alt="">`
                }
                }
            boxes[i].style.cursor = 'pointer'
        }
    }
}
insertImage();


//color map
function colorRow(arr, flag){
    for(var i=0;i<8;i++){
        if((i+flag)%2==0){
            arr[i].style.backgroundColor = 'rgb(240, 201, 150)';
        }
        else{
            arr[i].style.backgroundColor = 'rgb(100, 75, 43)';
        }
    }
}

var listColumns = ['a','b','c','d','e','f','g','h']

function coloring() {

    for(var i=0;i<8;i++){
        var arr=[];
        for(var j=1;j<=8;j++){
            // console.log(listColumns[i]+j);
            var id='#'+j+listColumns[i];
            
            // console.log(document.getElementById(j+listColumns[i]));
            arr.push($(id)[0])
            // arr.push(document.getElementById(j+listColumns[i]));
        }
        // console.log(arr);
        colorRow(arr,i%2);
    }
}
coloring();



// add init class position
var WPawns = $(".Wpawn");
var BPawns = $(".Bpawn");

for(var i=0;i<8;i++){
    WPawns[i].classList.add(`2${listColumns[i]}`)
}

for(var i=0;i<8;i++){
    BPawns[i].classList.add(`7${listColumns[i]}`)
}


//move Pawn
var arrMove=[];
function initWPawns(obj){
    obj.firstMove=1;
    obj.idCanMove=[];

    obj.onclick = function(e){

        var pos = this.classList[2];
        var nextIndex = this.firstMove+parseInt(pos[0])+1;
        this.firstMove=0;

        var next = '#'+ nextIndex+ pos[1];
        // var nextBox = document.getElementById(next);
        var nextBox = $(next);

        if(nextBox[0].innerHTML.length==0)
        {
            this.idCanMove.push(next);
            for(var i of this.idCanMove){
                $(i)[0].classList.add('yellow')
                // document.getElementById(i).classList.add('yellow')
            }
            arrMove.push(pos)
        }
        e.stopPropagation();
    };

}
for(var i of WPawns){
    initWPawns(i);
}

function initBPawns(obj){
    obj.firstMove=1;
    obj.idCanMove=[];

    obj.onclick = function(e){
        var pos = this.classList[2];
        var nextIndex = -this.firstMove+parseInt(pos[0])-1;
        this.firstMove=0;

        var next = '#'+ nextIndex+ pos[1];
        // var nextBox = document.getElementById(next);
        var nextBox = $(next)[0];


         if(nextBox.innerHTML.length==0)
        {
            // console.log("can go");
            this.idCanMove.push(next);

            for(var i of this.idCanMove){
                // console.log(document.getElementById(i));
                $(i)[0].classList.add('yellow')
                // document.getElementById(i).classList.add('yellow')
            }

            arrMove.push(pos)
        }
        e.stopPropagation();
    };
}

for(var i of BPawns){
    initBPawns(i);
}

function initBoxes(obj){
    obj.onclick = function(e){

        if(arrMove.length!=0){
            console.log(222);
            var cliked = $('.'+arrMove[0]);
            console.log(cliked);
            if(cliked[0].idCanMove.includes('#'+this.id) && cliked[0].idCanMove.length!=0){
            console.log(2);
            for(var i of cliked[0].idCanMove){
                $(i)[0].classList.remove('yellow')
                // document.getElementById(i).classList.remove('yellow')
            }
            cliked[0].idCanMove=[];
            cliked[0].classList.add(this.id);
            cliked[0].classList.remove(arrMove[0]);
            // cliked = document.getElementsByClassName(this.id);
            cliked = $('.'+this.id);
            this.appendChild(cliked[0])
            arrMove.shift();
        }
    }
    }
}
for(var i of boxes){
    initBoxes(i);
}

// init position
// var Bknights = document.getElementsByClassName("Bknight");
var Bknights = $(".Bknight");
Bknights[0].classList.add("8b")
Bknights[1].classList.add("8g")
// var Wknights = document.getElementsByClassName("Wknight");
var Wknights = $(".Wknight");

Wknights[0].classList.add("1b")
Wknights[1].classList.add("1g")

var arrKnightsStepX =[-1,-1,-2,-2,1,1,2,2];
var arrKnightsStepY =[-2,2,-1,1,-2,2,-1,1];

function initKnights(obj){
    obj.idCanMove=[];
    obj.onclick= function(e){
        var pos = this.classList[2];
        var row=parseInt(pos[0]); //8
        var column=pos[1]; //b

        var index = listColumns.indexOf(column);

        for(var i =0 ; i<8;i++){
            var newX=row+arrKnightsStepX[i];
            var newY=index+arrKnightsStepY[i];
            if(newX<=8 &&newX>=1 &&newY<8 &&newY>=0)
                {
                    
                    if($('#'+newX+listColumns[newY])[0].innerHTML.length==0){
                    // if(document.getElementById(newX+listColumns[newY]).innerHTML.length==0){
                        this.idCanMove.push('#'+newX+listColumns[newY]);
                    }   
                }
        }
        // console.log('idcanmove: ',this.idCanMove);
        for(var i of this.idCanMove){
            // console.log(document.getElementById(i));
           $(i)[0].classList.add('yellow')
            // document.getElementById(i).classList.add('yellow')
        }
        if(this.idCanMove.length!=0){
            // console.log("can go");
            arrMove.push(pos);
        }

    }
}
for(var i of Bknights){
    initKnights(i);
}

for(var i of Wknights){
    initKnights(i);
}



// init position
// var Bbrooks = document.getElementsByClassName("Brook");
var Bbrooks = $(".Brook");

Bbrooks[0].classList.add("8a")
Bbrooks[1].classList.add("8h")
// var Wbrooks = document.getElementsByClassName("Wrook");
var Wbrooks = $(".Wrook");

Wbrooks[0].classList.add("1a")
Wbrooks[1].classList.add("1h")

function initBrooks (obj){
    obj.idCanMove=[];
    obj.onclick= function(e){
        var pos = this.classList[2];
        // console.log(pos);
        var row=parseInt(pos[0]); //8
        var column=pos[1]; //a
        var index = listColumns.indexOf(column);

        // console.log(row,index);
        this.idCanMove=[...calculateBrooks(row,index,column)];
        
        for(var i=0;i<this.idCanMove.length;i++){
            this.idCanMove[i]='#'+this.idCanMove[i];
        }

        console.log(this.idCanMove);

        // console.log(this.idCanMove);

        for(var i of this.idCanMove){
            console.log(i);
            // console.log(document.getElementById(i));
            $(i)[0].classList.add('yellow')
        }

        if(this.idCanMove.length!=0){
            // console.log("can go");
            arrMove.push(pos);
        }
    }
}

function calculateBrooks(row,index,column){
    var idCanMove=[]
    var count = 1;
        while (index+count<8) {
            if(document.getElementById(row+listColumns[index+count]).innerHTML.length==0){
                // console.log(row+listColumns[index+count]);
                idCanMove.push(row+listColumns[index+count])
                count++;
            }else{
                break;
            }
        }
        count=1;
        while(index-count>=0){
            if(document.getElementById(row+listColumns[index-count]).innerHTML.length==0){
                // console.log(row+listColumns[index-count]);
                idCanMove.push(row+listColumns[index-count])
                count++;
            }else{
                break;
            }
        }

        count=1;

        while(row+count<=8){
            if(document.getElementById((row+count)+column).innerHTML.length==0){
                // console.log((row+count)+column);
                idCanMove.push((row+count)+column)
                count++;
            }else{
                break;
            }
        }

        count=1;
        while(row-count>=1){
            if(document.getElementById((row-count)+column).innerHTML.length==0){
                // console.log((row-count)+column);
                idCanMove.push((row-count)+column)
                count++;
            }else{
                break;
            }
        }
        return idCanMove;
}

for(var i of Bbrooks){
    initBrooks(i);
}

for(var i of Wbrooks){
    initBrooks(i);
}

// var Bbishops = document.getElementsByClassName("Bbishop");
var Bbishops = $(".Bbishop");

Bbishops[0].classList.add("8c")
Bbishops[1].classList.add("8f")
// var Wbishops = document.getElementsByClassName("Wbishop");
var Wbishops = $(".Wbishop");

Wbishops[0].classList.add("1c")
Wbishops[1].classList.add("1f")

function initBbishops(obj){
    obj.idCanMove=[];
    obj.onclick= function(e){
        var pos = this.classList[2];
        // console.log(pos);
        var row=parseInt(pos[0]); //8
        var column=pos[1]; //a
        var index = listColumns.indexOf(column);

        // console.log(row,index);

        this.idCanMove=[...calculateBishops(index,row)]
        for(var i=0;i<this.idCanMove.length;i++){
            this.idCanMove[i]='#'+this.idCanMove[i];
        }

        // console.log(this.idCanMove);

        for(var i of this.idCanMove){
            // console.log(document.getElementById(i));
           $(i)[0].classList.add('yellow')
        }

        if(this.idCanMove.length!=0){
            // console.log("can go");
            arrMove.push(pos);
        }

    }
}


function calculateBishops(index,row){
    var idCanMove=[];
    var count = 1;
        while (index+count<8 && row+count<=8) {
            if(document.getElementById((row+count)+listColumns[index+count]).innerHTML.length==0){
                // console.log((row+count)+listColumns[index+count]);
                idCanMove.push((row+count)+listColumns[index+count])
                count++;
            }else{
                break;
            }
        }

        count=1;
        while (index+count<8 && row-count>=1) {
            if(document.getElementById((row-count)+listColumns[index+count]).innerHTML.length==0){
                // console.log((row-count)+listColumns[index+count]);
                idCanMove.push((row-count)+listColumns[index+count])
                count++;
            }else{
                break;
            }
        }

        count=1;
        while (index-count>=0 && row-count>=1) {
            if(document.getElementById((row-count)+listColumns[index-count]).innerHTML.length==0){
                // console.log((row-count)+listColumns[index-count]);
                idCanMove.push((row-count)+listColumns[index-count])
                count++;
            }else{
                break;
            }
        }

        count=1;
        while (index-count>=0 && row+count<=8) {
            if(document.getElementById((row+count)+listColumns[index-count]).innerHTML.length==0){
                // console.log((row+count)+listColumns[index-count]);
                idCanMove.push((row+count)+listColumns[index-count]);
                count++;
            }else{
                break;
            }
        }
        return idCanMove;
}

for(var i of Bbishops){
    initBbishops(i);
}

for(var i of Wbishops){
    initBbishops(i);
}


// var Bqueen = document.getElementsByClassName("Bqueen");
var Bqueen = $(".Bqueen");

Bqueen[0].classList.add("8d")
// var Wqueen = document.getElementsByClassName("Wqueen");
var Wqueen = $(".Wqueen");

Wqueen[0].classList.add("1d")

function initQueen(obj){
    obj.idCanMove=[];
    obj.onclick= function(e){
        var pos = this.classList[2];
        // console.log(pos);
        var row=parseInt(pos[0]); //8
        var column=pos[1]; //a
        var index = listColumns.indexOf(column);

        this.idCanMove=[...calculateBrooks(row,index,column)];
        this.idCanMove=this.idCanMove.concat([...calculateBishops(index,row)])
        
        for(var i=0;i<this.idCanMove.length;i++){
            this.idCanMove[i]='#'+this.idCanMove[i];
        }

        // console.log(this.idCanMove);

        for(var i of this.idCanMove){
            // console.log(document.getElementById(i));
            $(i)[0].classList.add('yellow')
        }

        if(this.idCanMove.length!=0){
            // console.log("can go");
            arrMove.push(pos);
        }
    }
}

initQueen(Bqueen[0])
initQueen(Wqueen[0])


// var Bking = document.getElementsByClassName("Bking");
var Bking = $(".Bking");

Bking[0].classList.add("8e")
// var Wking = document.getElementsByClassName("Wking");
var Wking = $(".Wking");

Wking[0].classList.add("1e")
initKing(Bking[0])
initKing(Wking[0])

function initKing(obj){
    obj.idCanMove=[];
    obj.onclick= function(e){
        var pos = this.classList[2];
        // console.log(pos);
        var row=parseInt(pos[0]); //8
        var column=pos[1]; //a
        var index = listColumns.indexOf(column);

        this.idCanMove=[...calculateKings(row,column,index)];
        // console.log(this.idCanMove);
        for(var i=0;i<this.idCanMove.length;i++){
            this.idCanMove[i]='#'+this.idCanMove[i];
        }

        for(var i of this.idCanMove){
            // console.log(document.getElementById(i));
            $(i)[0].classList.add('yellow')
        }

        if(this.idCanMove.length!=0){
            // console.log("can go");
            arrMove.push(pos);
        }


    }
}

function calculateKings(row,column,index){
    var count=1;
    var idCanMove=[];
    if(index+count<8 && row+count<=8){
        if(document.getElementById((row+count)+listColumns[index+count]).innerHTML.length==0){
            idCanMove.push((row+count)+listColumns[index+count])
        }
    }
    if(index+count<8 && row-count>=1){
        if(document.getElementById((row-count)+listColumns[index+count]).innerHTML.length==0){
            idCanMove.push((row-count)+listColumns[index+count])
        }
    }
    if(index-count>=0 && row+count<=8){
        if(document.getElementById((row+count)+listColumns[index-count]).innerHTML.length==0){
            idCanMove.push((row+count)+listColumns[index-count])
        }
    }
    if(index-count>=0 && row-count>=1){
        if(document.getElementById((row-count)+listColumns[index-count]).innerHTML.length==0){
            idCanMove.push((row-count)+listColumns[index-count])
        }
    }
    
    if(index+count<8){
        if(document.getElementById(row+listColumns[index+count]).innerHTML.length==0){
            idCanMove.push(row+listColumns[index+count])
        }
    }
    if(index-count>=0){
        if(document.getElementById(row+listColumns[index-count]).innerHTML.length==0){
            idCanMove.push(row+listColumns[index-count])
        }
    }
    if(row+count<=8){
        if(document.getElementById((row+count)+column).innerHTML.length==0){
            idCanMove.push((row+count)+column)
        }
    }
    if(row-count>=1){
        if(document.getElementById((row-count)+column).innerHTML.length==0){
            idCanMove.push((row-count)+column)
        }
    }

    return idCanMove;

}
