var gamer = (function() {
    var mat = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    var list=[];
    var score = 0;
    var show2048dialog = 0;
    function moveLeft(mat) {
    	rotateBoard(mat);
    	rotateBoard(mat);
    	rotateBoard(mat);
    	for(var i=0;i<4;i++)
        { var start=0;
           moveDown(mat,i,start);
        }
    	rotateBoard(mat);
    	updateScore();
    	redraw();
    	styling();
    }
    function styling(){
    	var list1=[2,4,8,16,32,64,128,256,512,1024,2048];
    	for(var i=0;i<4;i++)
    	{
    		for(var j=0;j<4;j++)
    		{ 
    			var temp=$('#tile_'+i+j).text();

    			if(temp==='0')
    			{
    				document.getElementById('tile_'+i+j).innerHTML=' ';
    			}
    			if(show2048dialog===0)
    			{if(temp==='2048')
    			{
    				show2048dialog=true;
    				show2048Dialog();

    			}}
    			for(var k=0;k<10;k++)
    			{
    				$('#tile_'+i+j).removeClass('tile_'+list1[k]);
    			}

    			$('#tile_'+i+j).addClass('tile_'+temp);
    		}
    	}
    }
    function moveRight(mat) {
    	rotateBoard(mat);
    	for(var i=0;i<4;i++)
        { var start=0;
           moveDown(mat,i,start);
        }
    	rotateBoard(mat);
    	rotateBoard(mat);
    	rotateBoard(mat);
    	updateScore();
    	redraw();
    	styling();
    }
    function moveTop(mat) {
    	rotateBoard(mat);
    	rotateBoard(mat);
    	for(var i=0;i<4;i++)
        { var start=0;
           moveDown(mat,i,start);
        }
    	rotateBoard(mat);
    	rotateBoard(mat);
    	updateScore();
    	redraw();	
    	styling();   

    }

    function rotateBoard(mat){
    	
    	var trans=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for(var i=0;i<4;i++)
    {
        for(var j=0;j<4;j++)
        {
            trans[j][i]=mat[i][j];
        }
    }
  var row=-1;
    for(var i=0;i<4;i++)
    { var col=3;
    row++;
        for(var j=0;j<4;j++)
        {
            mat[i][j]=trans[row][col];
            col--;
        }
    }
}
    function updateScore(){
    	document.getElementById('score').innerHTML="Score: "+score;
    }

    function moveRight1(mat,col,start) {
      if(start===4)
      {
        return;
      }
      moveRight1(mat,col,start+1)
      for(var j=start-1;j>=0;j--)
      {
        if(mat[col][start]===0&&mat[col][j]!==0)
        {
          mat[col][start]=mat[col][j];
          mat[j][col]=0;
          continue;
        }
        else if(mat[col][start]!==0&&mat[col][j]===mat[col][start])
        {
          mat[col][start]=2*mat[col][start];
              score=score+mat[col][start];
              updateScore();
              mat[col][j]=0;
              break;
        }
        else if(mat[col][start]!==0&&mat[col][j]===0)
          {
              continue;
          }
          else {
            break;
          }

      }
      for(var j=0;j<3;j++)
   {
       if(mat[col][j]!==0&&mat[col][j+1]===0)
       {
        mat[col][j+1]=mat[col][j]
        mat[col][j]=0;
       }
   }

    }
    function moveDown(mat,col,start) {
    	if(start===4)
      { 
          return;
      }
      
      moveDown(mat,col,start+1);

      for(var j=start-1;j>=0;j--)
      { 
          if(mat[start][col]===0&&mat[j][col]!==0)
          {
              mat[start][col]=mat[j][col];
              mat[j][col]=0;
              continue;
          }
          else if(mat[start][col]!==0&&mat[j][col]===mat[start][col])
          {
              mat[start][col]=2*mat[start][col];
              score=score+mat[start][col];
              updateScore();
              mat[j][col]=0;
              break;
          }
          else if(mat[start][col]!==0&&mat[j][col]===0)
          {
              continue;
          }
          else {
            break;
          }

      }
   for(var j=0;j<3;j++)
   {
       if(mat[j][col]!==0&&mat[j+1][col]===0)
       {
           mat[j+1][col]=mat[j][col];
           mat[j][col]=0;
       }
   }

    }
    // reflect state of mat
    function redraw() {
    	
        for(var i=0;i<4;i++)
        {
        	for(var j=0;j<4;j++)
        	{
        		document.getElementById('tile_'+i+j).innerHTML=mat[i][j]; 
        		localStorage.setItem('tile_'+i+j,mat[i][j]);
        	}
        }
            }

    // random number between 2 and 4  
    function getRandomValue() 
    {
         if(Math.random()>0.7)
         	{
             return 4;
         	}
         	else{
         		return 2;
         	}
    }
    function getRandomEmptyCell(mat){
    	list=[];
    	var c=0;
    	for(var i=0;i<4;i++)
    	{
    		for(var j=0;j<4;j++)
    		{
    			if(mat[i][j]===0)
    			{
    				list[c]=[i,j];
    				
    				c++;
    			}
    		}
    	} 
    	var r=Math.floor(Math.random()*c);
    	
    	return list[r];
    }
    
    function fillOneRandomEmptyCell(mat) { //completed
        var coord=getRandomEmptyCell(mat);
        var value = getRandomValue();
        mat[coord[0]][coord[1]] = value;
    }

    // checks if gameover       completed
    function isGameOver() {
        for(var i=0;i<4;i++)
        {
            for(j=0;j<4;j++)
            {
                if(mat[i][j]===0)
                {   
                    return false;
                }
            }
        }
        return true;
    }
    
    
    function moveDownRect(mat){
        for(var i=0;i<4;i++)
        { var start=0;
           moveDown(mat,i,start);
        }
        styling();
        
        return;

    }
    function moveRightRect(mat){
        for(var i=0;i<4;i++)
        { var start=0;
           moveRight1(mat,i,start);
        }
        styling();
        
        return;

    }

    // show Dialog for GameOver()
    function showGameOverDialog() { // completed
        $('#gameover').show();
        document.getElementById("resetag").addEventListener('click',reset);
    }

    // show dialog for 2048
    function show2048Dialog() {         //completed
     $('#won').show();
     document.getElementById("resetag1").addEventListener('click',reset);
     document.getElementById("continue").addEventListener('click',continue1);
    }
    function continue1(){
    	$('#won').hide();
    	window.addEventListener('keydown', move.bind(null,mat));

    }

    function move(mat,e) {                     //completed
        //depending upon keypress you call the respective function
        fillOneRandomEmptyCell(mat);
        redraw();

        
         e.preventDefault();
        if (e.keyCode === 37) {
            moveLeft(mat);
        } else if (e.keyCode === 38) {
            moveTop(mat);
        } else if (e.keyCode === 39) {
            moveRight(mat);
        } else if (e.keyCode === 40) {
            moveDownRect(mat);
        }
        if (isGameOver()) {

            showGameOverDialog();
        }
        if (show2048dialog === true) {
            show2048Dialog();
            show2048dialog = false;
        }
        
              
                
            

    }
    function reset(e) {             //completed
        if (e !== undefined) {
            e.preventDefault();
        }
        mat = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        score = 0;
        fillOneRandomEmptyCell(mat);
        fillOneRandomEmptyCell(mat);
        redraw();
        styling();

         $('#gameover').hide();
          $('#won').hide();
          window.addEventListener('keydown', move.bind(null,mat));
    }
    function init() {
       // if(localStorage!==null)
        {
        	for(var i=0;i<4;i++)
        	{
        		for(var j=0;j<4;j++)
        		{
        			var temp=localStorage.getItem('tile_'+i+j);
        			document.getElementById('tile_'+i+j).innerHTML=temp;
        		}
        	}
        }    
        reset();
        document.getElementById("reset").addEventListener('click',reset);


        $('#gameover').hide();
        $('#won').hide();

        // add reset method on click actions of all the reset elements
        window.addEventListener('keydown', move.bind(null,mat));
    }
    return {
        init:init
    };
})();
