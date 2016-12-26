var gamer = (function() {
    var mat = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    var undo = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    var list=[];
    var d=0;
    var score = 0;
    var undoScore=0;
    var name={};
    var best_score=0;
    var show2048dialog = 0;
    function moveLeft() 
    {
    	var i=0;
        while(i<=3)
        {

            var start=0,end=3,start2=0;
            while(start<end)
            {
                if(mat[i][start]===0)
                {
                    var k=start;
                    while(k<end)
                    {
                        mat[i][k]=mat[i][k+1];
                        k++;
                    }
                    mat[i][end]=0;
                    k=start;
                    while(k<=end)
                    {
                        if(mat[i][k]!==0)
                        {
                            break;
                        }
                        k++;
                    }
                    if(k===end+1)
                    {
                        start=end;
                    }
                    else
                    {
                        start=start2;
                    }
                }

                else if(mat[i][start]===mat[i][start+1])
                {
                    if(mat[i][start]!=0)
                    {
                        mat[i][start]=2*mat[i][start];
                        mat[i][start+1]=0;
                        score=score+mat[i][start];
                        if(score>best_score)
                        {
                            best_score=score;
                            $('#bscore').text('BEST SCORE:'+best_score);

                        }
                        start++;
                        start2=start;
                    }
                }
                else
                {
                    start++;
                }
            }
            i++;
        }           
    	
    }
    function moveleftrect()
    {
        moveLeft();
        updateScore(); 
        fillOneRandomEmptyCell();
        redraw();
        styling();

    }
    function styling()
    {
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
    			{    if(temp==='2048')
    			     {
    				    show2048dialog=true;
    				    show2048Dialog();

    			     }
                }
    			for(var k=0;k<=10;k++)
    			{
    				$('#tile_'+i+j).removeClass('tile_'+list1[k]);
    			}


    			$('#tile_'+i+j).addClass('tile_'+temp);
                name['tile_'+i+j] = temp;
    		}
    	}
        name['score']=score;
        name['bscore']=best_score;
        localStorage.setItem('name', JSON.stringify(name));
    }
    function moveRight() 
    {
    	rotateBoard();
    	rotateBoard();
    	moveLeft(mat);
    	rotateBoard();
    	rotateBoard();
    	updateScore();
        fillOneRandomEmptyCell();
    	redraw();
    	styling();
    }
    function moveTop() 
    {
        
    	rotateBoard();
    	rotateBoard();
    	rotateBoard();
    	moveLeft();
    	rotateBoard();
    	updateScore();
        fillOneRandomEmptyCell();
    	redraw();	
    	styling();   

    }

    function rotateBoard()
    {
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
    function updateScore()
    {
    	document.getElementById('score').innerHTML="Score: "+score;
    }

   
    function moveDown() 
    {
    	rotateBoard();
    	moveLeft(mat);
    	rotateBoard();
    	rotateBoard();
    	rotateBoard();
    	updateScore();
        fillOneRandomEmptyCell();
    	redraw();	
    	styling();

    }
    // reflect state of mat
    function redraw()
    {
        for(var i=0;i<4;i++)
        {
        	for(var j=0;j<4;j++)
        	{
        		document.getElementById('tile_'+i+j).innerHTML=mat[i][j]; 
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
         	else
            {
         		return 2;
         	}
    }
    function getRandomEmptyCell()
    {
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
    
    function fillOneRandomEmptyCell() { //completed
        var coord=getRandomEmptyCell(mat);
        var value = getRandomValue();
        mat[coord[0]][coord[1]] = value;
    }

    // checks if gameover       completed
    function isGameOver() 
    {
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
    
    // show Dialog for GameOver()
    function showGameOverDialog()
    { // completed
        $('.gameover').show(); 
    }

    // show dialog for 2048
    function show2048Dialog() 
    {  
           //completed
     $('#won').show();
     show2048dialog = 0;
     document.getElementById("resetag1").addEventListener('click',setgame);
    }
    function setgame()
    {
        reset();
        return;
    }

    

    function move(e) 
    {                     //completed
        //depending upon keypress you call the respective function
        if (e !== undefined) 
        {
        e.preventDefault();
        }

        for(var i=0;i<4;i++)
        {
            for(var j=0;j<4;j++)
            {
                undo[i][j]=mat[i][j];

            }
        }
        d=0;
        if (isGameOver()) 
        {            
            showGameOverDialog();
        }
        if (show2048dialog === true) 
        {
            show2048Dialog();
            
        }
        else
        {
           if (e.keyCode === 37) 
            {
                moveleftrect();
            } 
            else if (e.keyCode === 38)
            {
                moveTop();
            } 
            else if (e.keyCode === 39) 
            {
                moveRight(mat);
            } 
            else if (e.keyCode === 40) 
            {
                moveDown();
            } 
        }
    }

    function callUndo()
    {

        if(d===1)
        {
            return;
        }
        else
        {
            for(var i=0;i<4;i++)
            {
                for(var j=0;j<4;j++)
                {
                    mat[i][j]=undo[i][j];
                }
            }
            score=undoScore;
            updateScore();
            redraw();   
            styling();
            d=1;
        }
    }


    function reset(e) {             //completed
        if (e !== undefined) 
        {
            e.preventDefault();
        }
        mat = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        score=0;
        d=1;
        document.getElementById('score').innerHTML="Score: "+score
        fillOneRandomEmptyCell(mat);
        fillOneRandomEmptyCell(mat);
        updateScore();
        redraw();
        styling();
        $('.gameover').hide();
        $('#won').hide();
        return;
          
    }
    function init(c) {   
    var retrievedObject = JSON.parse(localStorage.getItem('name'));
    if(retrievedObject!==null&&c===1)
    {
            for(var i=0;i<4;i++)
            {
                for(var j=0;j<4;j++)
                {
                mat[i][j]=Number(retrievedObject['tile_'+i+j]);  
                }
            }
        score=Number(retrievedObject['score']);
        best_score=Number(retrievedObject['bscore']);
        $('#bscore').text('BEST SCORE:'+best_score);
        updateScore(); 
        redraw(mat);
        styling();
        c=0;
    }
    else
    {
        reset();
    }
     d=1;
       document.getElementById("reset").addEventListener('click',setgame);
       document.getElementById("undo").addEventListener('click',callUndo);
       document.getElementById("resetag").addEventListener('click',setgame);
        $('.gameover').hide();
        $('#won').hide();
        // add reset method on click actions of all the reset elements
        window.addEventListener('keydown',move);
        
    }
    return {
        init:init
    };
})();
