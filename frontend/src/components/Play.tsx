class Play{
  constructor()
  {
      // debug
      console.log("starting from here ...")
      // wumpus count, pit count, gold count
      this.gameInit(3,5,2)
  }

  /*
      Documentation: (Cell types) 
      =============

      - agentsafe
      - agentstinky
      - agentBreeze
      - agentwumpus
      - agentpit
      - agentgold
        S - (S)afe Cell
        W - (W)umpus
        A - (A)gent
        G - (G)old
        P - (P)it
        T - s(T)ench
        B - (B)reeze
        U - Both (Stench U Breeze)
  */

  // initial value settings
  gridSize=10
  wumpusCount=0
  pitCount=0
  goldCount=0
  point=0
  moveCount=0
  contiguousRandomMoveCount=0
  foundGold=0
  wumpusDead=0

  // threshold
  threshold=0.5

  // direction notation
  up=0
  down=1
  left=2
  right=3
  shootDirection!: number
  moveDirection!: number
  
  // checking
  isShoot=false
  gameOver=false
  youWin=false
  youLose=false
  gameOverLine=""  // will see later
  isGoldFound=false 
  cheatMode=false 
  collectingGold=false

  // initial value settings
  initialBoard = [
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
  ];

  board = [
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
  ];

  cellVisited = [
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
  ];

  nearDanger = [
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
  ];
  
  // this is the cheat board
  cheatBoard = [
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
  ];

  pitProbability = [
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  ];

  wumpusProbability = [
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  ];

  // total moves in each cell
  totalMoves = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  // for tracking agent
  agentIndex = {
      row: 9,
      column: 0,
  };

  currentIndex = {
      row: 9,
      column: 0,
  };

  rowCoefficient=[-1,0,1,0]
  colCoefficient=[0,1,0,-1]

  isValidCell(x: number, y: number)
  {
      if (x >= 0 && x < 10 && y >= 0 && y < 10) {
        return true;
      }
      return false;
  }

  gameInit(wumpusCount: any, pitCount: any, goldCount: any)
  {
      this.wumpusCount=wumpusCount
      this.pitCount=pitCount
      this.goldCount=goldCount

      // here to change if we add mode
      this.init()
      this.cellVisited[9][0]=true
  }

  init()
  {
      console.log("before setting the board")

      // age wumpus uncle k board e boshai
      for(let i=0;i<this.wumpusCount;i++)
      {
          let row=0, col=0
          do{
              row = Math.floor(Math.random() * 10);
              col = Math.floor(Math.random() * 10);
          }while((row>7 && col<2) || (this.board[row][col]==="W"))
          
          this.board[row][col]="W"
      }

      // update the relative cells to wumpus
      this.updateWumpusRelativeCell()

      // ekhon pit k initialize kori
      for (let i = 0; i < this.pitCount; i++) 
      {
          let row=0, col=0;
          do {
              row = Math.floor(Math.random() * 10);
              col = Math.floor(Math.random() * 10);
          } while ((row>7 && col<2) || this.board[row][col].includes("P") || this.board[row][col].includes("W"))
      
          if (this.board[row][col] == "S") 
          {
              this.board[row][col] = "P";
          } 
          else 
          {
              this.board[row][col] += "P";  
          }
      }

      // update the relative cells to pit
      this.updateRelativePitCell()

      // gold init
      for (let i = 0; i < this.goldCount; i++) 
      {
          let row=0, col=0;
          do {
              row = Math.floor(Math.random() * 10);
              col = Math.floor(Math.random() * 10);
          } while ((row === 9 && col === 0) || this.board[row][col].includes("W") || this.board[row][col].includes("P"))
  
          this.board[row][col] += "G";
      }

      this.cheatBoard = JSON.parse(JSON.stringify(this.board));
      console.log("after setting up the board: ", this.board);
  }

  updateWumpusRelativeCell()
  {
      for(let row=0;row<10;row++)
      {
          for(let col=0;col<10;col++)
          {
              if(this.board[row][col].includes("W"))
              {
      
                  for(let k=0;k<4;k++)
                  {
                      let r=row+this.rowCoefficient[k]
                      let c=col+this.colCoefficient[k]
                      if(this.isValidCell(r,c)) 
                      {
                          this.setStench(r,c)
                      }
                  }
              }
          }
      }
  }

  setStench(row: number,col: number)
  {
      if (this.board[row][col] == "S") 
      {
          this.board[row][col] = "T";
      } 
      else if (this.board[row][col] == "W") 
      {
          this.board[row][col] += "T";
      }
  }

  updateRelativePitCell()
  {
      for(let row=0;row<10;row++)
      {
          for(let col=0;col<10;col++)
          {
              if(this.board[row][col].includes("P"))
              {
      
                  for(let k=0;k<4;k++)
                  {
                      let r=row+this.rowCoefficient[k]
                      let c=col+this.colCoefficient[k]
                      if(this.isValidCell(r,c)) 
                      {
                          this.setBreeze(r,c)
                      }
                  }
              }
          }
      }
  }

  setBreeze(row: number,col: number)
  {
      if (this.board[row][col] == "S") 
      {
          this.board[row][col] = "B";
      } 
      else if (!this.board[row][col].includes("B")) 
      {
          this.board[row][col] += "B";
      }
  }

  getBoard() 
  {
      return this.board;
  }

  isGameOver() 
  {
      if (this.gameOver) 
      {
          return true;
      }
      return false;
  }
  isYouWin() 
  {
      if (this.youWin) 
      {
          return true;
      }
      return false;
  }
  isYouLose() 
  {
      if (this.youLose) 
      {
          return true;
      }
      return false;
  }

  // resetting game env
  resetGameEnvironment() {
      this.board = [
        ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
        ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
        ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
        ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
        ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
        ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
        ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
        ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
        ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
        ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ];
      this.cheatBoard = [
        ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
        ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
        ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
        ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
        ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
        ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
        ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
        ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
        ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
        ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ];
  
      this.cellVisited = [
          [false, false, false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false, false, false],
      ];
  
      this.nearDanger = [
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
      ];
  
      this.pitProbability = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      ];
  
      this.wumpusProbability = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      ];
  
      this.totalMoves = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
  
      this.agentIndex = { row: 9, column: 0 };
      this.currentIndex = { row: 9, column: 0 };

      // count things
      this.pitCount = 0;
      this.goldCount = 0;
      this.point = 0;
      this.moveCount = 0;
      this.wumpusCount = 0;
      this.contiguousRandomMoveCount = 0;
      this.foundGold = 0;
      this.wumpusDead = 0;
  
      // directions
      this.up = 0;
      this.down = 1;
      this.left = 2;
      this.right = 3;
      
      // checking
      this.isShoot = false;
      this.gameOver = false;
      this.youWin = false;
      this.youLose = false;
      this.gameOverLine = "";
      this.cheatMode = false;
  
      console.log("RESETING ENV");
  }

  // setting up board
  setBoard(newBoard)
  {
      this.board = this.initialBoard; // may be i dont need this, still keeping it
      this.board = JSON.parse(JSON.stringify(newBoard));

      const { wCount, pCount, gCount } = this.countWumpusPitAndGold();
      this.wumpusCount = wCount;
      this.pitCount = pCount;
      this.goldCount = gCount;
      this.initialBoard = JSON.parse(JSON.stringify(this.board));
      
      this.addPercept()
  }

  countWumpusPitAndGold() 
  {
      let wCount = 0;
      let pCount = 0;
      let gCount = 0;
  
      for (let i = 0; i < this.board.length; i++) 
      {
          for (let j = 0; j < this.board.length; j++) 
          {
              if (this.board[i][j] == "W") wCount += 1;
              else if (this.board[i][j] == "P") pCount += 1;
              else if (this.board[i][j] == "G") gCount += 1;
          }
      }
  
      return { wCount, pCount, gCount };
  }

  addPercept()
  {
      this.updateWumpusRelativeCell()
      this.updateRelativePitCell()
  }

}

export const play=new Play() 