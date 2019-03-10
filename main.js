(function() {

    class Squares {

        //создает новые экземпляры квадратиков и помещает их в массив
        creatSquars  (arr,nop,pc) {

            //Конструктор для квадратиков
            class Square {
                constructor (x,y,w,h) {
                    this.x=x;
                    this.y=y;
                    this.w=w;
                    this.h=h;
                    this.deltaY=0;
                    this.deltaX=0;
                    this.visible=true;
                }
            }
            class LifeSquare extends Square {
                constructor(x,y,w,h,n,p){
                    super(x,y,w,h);
                    this.number=n;
                    this.position=p;
                }
            }

            // Перемешивает позиции квадратиков
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }
            nop=shuffleArray(nop);

            //Создаем экземпляры квадратиков и помещаем их в массив
            let num=0;
            for (let j=0;j<=3; j++) {
                for( let i = 0; i <= 3; i++){
                  num++;
                  arr.push( new LifeSquare(pc[nop[num-1]][0],pc[nop[num-1]][1],100,100,num,nop[num-1]));
                  }
            }
            return arr;
        };

            //Очищает массив с квадратиками
            destructionSquars (arr){
            for ( let i=0; i<=arr.length;i++)
                arr.splice(0,arr.length);
                return arr;
            }

    }

     // Анимация
      class  Animate {
              constructor (ctx,canvas) {
                  this.ctx=ctx;
                  this.canvas=canvas;
                  this.arr=[];
                  this.stopId=undefined;
              }

              // Отрисовывает видимые квадратики
              startDraw (){
                this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientWidth);
                   for (let i=0; i<=15; i++){
                        if (this.arr[i].number!= 16 && this.arr[i].visible==true) {
                           this.ctx.fillStyle = '#AFEEEE';
                           if (this.arr[i].deltaX!=0){
                               (this.arr[i].deltaX>0) ? (this.arr[i].deltaX-=10, this.arr[i].x-=10): (this.arr[i].deltaX+=10, this.arr[i].x+=10);
                           }
                            if (this.arr[i].deltaY!=0){
                                (this.arr[i].deltaY>0) ? (this.arr[i].y-=10,this.arr[i].deltaY-=10) : (this.arr[i].y+=10,this.arr[i].deltaY+=10);
                                }
                            this.ctx.fillRect(this.arr[i].x,this.arr[i].y, this.arr[i].w, this.arr[i].h);
                            this.ctx.font = "40px Arial";
                            this.ctx.fillStyle = "#4682B4";
                            this.ctx.textAlign = "center";
                            this.ctx.fillText(this.arr[i].number, this.arr[i].x+50,this.arr[i].y+70,);
                         }
                   }
                    this.stopId=requestAnimationFrame(this.startDraw.bind(this));
             };

          // Останавливает анимацию, затирает игровое поле
          stopDraw (){
              cancelAnimationFrame(this.stopId);
              this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientWidth);
          }

          // Проверяет все ли квадратики на своих местах
          mayBeWin (){
              if (this.arr.every((item)=>{return item.number==item.position;})){
                      return true;
              }
          }

            //Выводит сообщение "You win"
            win() {
                this.ctx.font = "80px Arial";
                this.ctx.fillStyle = "red";
                this.ctx.textAlign = "center";
                this.ctx.fillText("You win", this.canvas.width/2, this.canvas.height/2);
            }

             //Анализирует, в какое место попал клик мышкой. Если есть попадание в квадратик, то возвращает true
             shot  (e) {

                 let x =e.offsetX, y = e.offsetY,x16,y16,posInArr;
                 for (let i in this.arr) {
                     if (this.arr[i].number==16){
                         x16=this.arr[i].x;
                         y16=this.arr[i].y;
                         posInArr=i;
                     }
                 }
                for (let i=0; i<=this.arr.length-1; i++) {
                    if (x > this.arr[i].x && x < this.arr[i].x + this.arr[i].w &&
                        y> this.arr[i].y && y < this.arr[i].y + this.arr[i].h &&
                        this.arr[i].visible==true) {
                        if ((this.arr[i].x-x16==110 || x16-this.arr[i].x==110)&&this.arr[i].y==y16){
                            this.arr[i].deltaX=this.arr[i].x-x16;
                            (this.arr[i].x-x16==110) ? (this.arr[posInArr].x+=110,this.arr[posInArr].position+=1,this.arr[i].position-=1):
                                                        (this.arr[posInArr].x-=110,this.arr[posInArr].position-=1,this.arr[i].position+=1);
                        }
                        if ((this.arr[i].y-y16==110 || y16-this.arr[i].y==110) && this.arr[i].x==x16) {
                            this.arr[i].deltaY=this.arr[i].y-y16;
                            (this.arr[i].y-y16==110) ? (this.arr[posInArr].y+=110, this.arr[posInArr].position+=4, this.arr[i].position-=4)
                                                        :(this.arr[posInArr].y-=110, this.arr[posInArr].position-=4,this.arr[i].position+=4);
                            }
                        return true;
                    }
                }
            }
          }
    class Init {
        constructor (){
            this.canvas = document.getElementById('canvas');
            this.ctx = canvas.getContext('2d');
            this.arr = [];
            this.positionsCoordinates={
                1:[10,10],
                2:[120,10],
                3:[230,10],
                4:[340,10],
                5:[10,120],
                6:[120,120],
                7:[230,120],
                8:[340,120],
                9:[10,230],
                10:[120,230],
                11:[230,230],
                12:[340,230],
                13:[10,340],
                14:[120,340],
                15:[230,340],
                16:[340,340]
            }
            this.numbersOfPositions = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
            this.buttonStart = document.getElementById('start');
            }
        }

    class Game {
        constructor () {
            this.init= new Init();
            this.squares=new Squares();
            this.animate= new Animate(this.init.ctx,this.init.canvas);

            // Реагирует на нажатие кнопки "Старт",
            this.init.buttonStart.addEventListener('click', this.startGame.bind(this));

            // Реагирует на клик по игровому полю
            this.init.canvas.onclick=this.clickOnCanvas.bind(this);
       }

        startGame () {
            if (this.init.arr.length==0){
                this.init.arr =this.squares.creatSquars(this.init.arr,this.init.numbersOfPositions,this.init.positionsCoordinates);
                this.animate.arr=this.init.arr;
                this.animate.startDraw();
            }
            else {
                this.stopGame();
                this.startGame();
            }
        }

        stopGame  () {
            this.animate.stopDraw();
            this.init.arr=this.squares.destructionSquars(this.init.arr);
        };

        clickOnCanvas  (e) {
               if (this.animate.shot(e)){
                   if (this.animate.mayBeWin()){
                       setTimeout(()=>{this.stopGame();this.animate.win();},1000);
                   }
               }
        };
    }
 new Game();

}());