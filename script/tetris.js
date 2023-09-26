
class Tetris {
  BLOCKS = [
    [[-1,0], [0,0], [1,0], [2,0]], // I 
    [[0,0], [0,-1], [1,0], [1,-1]], // O
    [[0,0], [-1,0], [0,-1], [1,-1]], // S
    [[0,0], [1,0], [-1,-1], [0,-1]], // Z
    [[-1,0], [0,0], [1,0], [1,-1]], // J
    [[-1,-1], [-1,0], [0,0], [1,0]], // L
    [[-1, 0], [0,0], [0,1], [0,-1]], // T
  ]
  BLOCKS_COLOR = [
    'cyan',   // I
    'yellow', // O
    'green',  // S
    'red',    // Z
    'blue',  // L
    'orange', // J
    'purple', // T
  ]


  constructor(option = {}) {
    this.option = option
    this.option.drawNextNumber = this.option.drawNextNumber || 1
    const canvasName = this.option.canvas || 'tetris'
    const canvas = document.getElementById(canvasName)
    canvas.style.background = this.option.background ||'black'
    const ctx = canvas.getContext('2d')

    const highscoreFromLocalStorage = localStorage.getItem('highscore')
    this.highscore = this.option.highscore || highscoreFromLocalStorage || 0
    this.canvas = canvas
    this.ctx = ctx

    this.width = 12
    this.height = 21
    this.board = []
    this.score = 0
    this.gameOver = false
    this.interval = null
    this.canvasResize()
    this.init()
    this.waitGame()
  
  }

  canvasResize = () => {
    const height = window.innerHeight - 100
    const width = window.innerWidth
    //game board height 20 + bottom(1) + top(1) + top margin(4) + bottom margin(1)  = 27
    // + 10% margin
    let blocksize = Math.floor(height / 30)
    // 10 + 2 + next block(4) + hold (4) + margin(6) = 26 
    // game board size 10 + sentinel 2 + right side next blocks space 4 + mergin 3
    // + left side hold block space + mergin 3

    if (blocksize * 26 > width) {
        
      blocksize = Math.floor(width / 26)
    }
    this.scale = Math.floor(blocksize / 20)
    this.margin = blocksize / 2
    this.font = `${blocksize}px monospace`
    this.blockSize = blocksize
    // right and left side margin
    this.GameBoardX = this.blockSize * 4 + this.margin * 4
    // top margin
    this.GameBoardY = this.blockSize * 4
    // bottom margin
    this.GameTail = this.blockSize
    // game board size 10 20 + sentinel
    this.canvas.width = (this.blockSize * this.width + this.GameBoardX * 2)
    this.canvas.height = (this.blockSize * this.height + this.GameBoardY + this.GameTail)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawBoard()
    this.drawScore()
    if (this.gameOver) {
      this.drawGameOver()
    } else {
      if (this.nextBlockNumbers || this.holdBlock) {
        this.drawNextBlock()
      }
    }
  }

  waitGame = () => {
    this.waitGameEvents()
  }

  pressSpace = (e) => {
    if (e.code === 'Space') {
      this.startGame()
    }
  }

  getHighScore = () => {
    return this.highscore
  }

  shuffle = () => {
    const bag = [0, 1, 2, 3, 4, 5, 6]
    const shuffle = []
    while (bag.length > 0) {
      const index = Math.floor(Math.random() * bag.length)
      shuffle.push(bag[index])
      bag.splice(index, 1)
    }
    return shuffle
  }

  playingGameEvents = () => {
    const start = document.getElementById('start')
    start.removeEventListener('click', this.startGame, false)
    document.removeEventListener('keydown', this.pressSpace, false)
    document.addEventListener('keydown', this.keyDownHandler, false)
    document.addEventListener('keyup', this.keyUpHandler, false)
    start.addEventListener('touchstart', this.startGame, false)
    const hasTouch = 'ontouchstart' in window
    if (hasTouch) {
      start.removeEventListener('touchstart', this.startGame, false)
      document.addEventListener('touchstart', this.clickButtonHandler, false)
    } else {
      start.removeEventListener('click', this.startGame, false)
      document.addEventListener('click', this.clickButtonHandler, false)
    }

  }

  waitGameEvents = () => {
    document.removeEventListener('keydown', this.keyDownHandler, false)
    document.removeEventListener('keyup', this.keyUpHandler, false)
    document.addEventListener('keydown', this.pressSpace, false)
    const start = document.getElementById('start')
    const hasTouch = 'ontouchstart' in window
    if (hasTouch) {
      start.addEventListener('touchstart', this.startGame, false)
      document.removeEventListener('touchstart', this.clickButtonHandler, false)
    } else {
      start.addEventListener('click', this.startGame, false)
      document.removeEventListener('click', this.clickButtonHandler, false)
    }
  }

  startGame = () => {
    this.init()
    this.playingGameEvents()

    if (this.option.useBag) {
      this.bag = this.shuffle()
      this.currentBlockNumber = this.bag.pop()
      this.nextBlockNumbers = []
      for (let i = 0; i < 6; i++) {
        this.nextBlockNumbers.push(this.bag.pop())
      }
    } else {
      this.currentBlockNumber = Math.floor(Math.random() * this.BLOCKS.length)
      this.nextBlockNumbers = []
      for (let i = 0; i < 6; i++) {
        this.nextBlockNumbers.push(Math.floor(Math.random() * this.BLOCKS.length))
      }
    }
    this.currentBlock = this.BLOCKS[this.currentBlockNumber]
    this.current_x = 5
    this.current_y = 0
    this.rotate = 0
    this.clearLines = 0
    this.level = 1
    this.score = 0
    this.gameStart = true
    this.gameOver = false
    this.drawBlock(this.currentBlockNumber, this.current_x, this.current_y, this.currentBlock)
    this.drawScore()
    if (this.interval) {
      clearInterval(this.interval)
    }
    this.interval = setInterval(this.moveDown, this.getWaitTime())
    this.drawNextBlock()
  }

  getWaitTime = () => {
    const time = 100 * (11 - this.level)
    if (time < 100) {
      return 50
    }
    return time
  }

  init = () => {
    this.board = []
    for (let y = 0; y < this.height; y++) {
      this.board.push([])
      for (let x = 0; x < this.width; x++) {
        if (y === 0 || y === this.height - 1 || x === 0 || x === this.width - 1) {
          if ( y == 0 && ( x > this.width / 2 - 4 && x < this.width / 2 + 3 )) {
            this.board[y].push(0)
          } else {
            this.board[y].push(0xff) // sentinel blocks
          }
        } else {
          this.board[y].push(0)
        }
      }
    }
    this.interval = null
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawBoard()
    this.drawScore()
    this.drawGameOver()
    this.drawPressStart()
    this.gameStart = false
    this.current_x = 5
    this.current_y = 0
    this.rotate = 0
  }

  drawBoard = () => {
    this.ctx.clearRect(this.GameBoardX, this.GameBoardY - this.blockSize, this.canvas.width - this.GameBoardX * 2 , this.canvas.height - this.GameBoardY)
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === 0xff) {         
          this.ctx.fillStyle = 'darkblue'
          this.ctx.fillRect(j * this.blockSize + this.GameBoardX, i * this.blockSize + this.GameBoardY, this.blockSize - 1, this.blockSize -1 )
        } else if (this.board[i][j] !== 0){
          this.ctx.fillStyle = this.BLOCKS_COLOR[this.board[i][j] - 1]
          this.ctx.fillRect(j * this.blockSize + this.GameBoardX, i * this.blockSize + this.GameBoardY, this.blockSize - 1, this.blockSize -1 )
        }
      }
    }
    if (this.option.guideline) {
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
      for (let i = 0; i < this.board.length; i++) {
        for (let j = 0; j < this.board[i].length; j++) {
          if (this.board[i][j] === 0) {
            this.ctx.fillRect(j * this.blockSize + this.GameBoardX, i * this.blockSize + this.GameBoardY, this.blockSize - 1, this.blockSize -1 )
          }
        }
      }
    }
  }

  drawRect(sx, sy, ex, ey) {
    this.ctx.beginPath()
    this.ctx.moveTo(sx, sy)
    this.ctx.lineTo(ex, sy)
    this.ctx.lineTo(ex, ey)
    this.ctx.lineTo(sx, ey)
    this.ctx.lineTo(sx, sy)
    this.ctx.stroke()
  }

  drawNextBlock = () => {
    let x = 12 * this.blockSize + this.GameBoardX + this.margin
    let y = 0
    this.ctx.clearRect(x, y, this.blockSize * 5, this.blockSize + this.margin)
    y += this.blockSize + this.margin
    this.ctx.fillText('Next', x, y)
    y += this.margin 

    for (let i = 0; i < this.option.drawNextNumber; i++) {  
      this.ctx.clearRect(x, y, this.blockSize * 4 +  this.margin * 2, this.blockSize * 3 + this.margin)
      this.ctx.strokeStyle  = 'white'
      this.ctx.fillStyle = 'white'
      this.ctx.lineWidth = 2
      this.drawRect(x, y, x + this.blockSize * 4 + this.margin * 2, y + this.blockSize * 3 + this.margin)
      this.ctx.fillStyle = this.BLOCKS_COLOR[this.nextBlockNumbers[i]]
      const nextBlock = this.BLOCKS[this.nextBlockNumbers[i]]
      nextBlock.forEach(([dx, dy]) => {
        this.ctx.fillRect((dx + 1)* this.blockSize + x + this.margin , (dy + 1) * this.blockSize + y + this.margin, this.blockSize - 1, this.blockSize -1 )
      })
      y += this.blockSize * 3 + this.margin
    }
    if (this.option.hold) {
      const x = this.margin
      let y = this.GameBoardY + this.margin + this.blockSize
      this.ctx.clearRect(x, y, this.blockSize * 4 +  this.margin * 2, this.blockSize * 4 + this.margin)
      this.ctx.strokeStyle  = 'white'
      this.ctx.fillStyle = 'white'
      this.ctx.fillText('Hold', x, y)
      y += this.margin
      this.ctx.lineWidth = 2
      this.drawRect(x, y, x + this.blockSize * 4 + this.margin * 2, y + this.blockSize * 3 + this.margin)
      if (this.holdBlock != null) {
        this.ctx.fillStyle = this.BLOCKS_COLOR[this.holdBlock]
        const holdBlock = this.BLOCKS[this.holdBlock]
        holdBlock.forEach(([dx, dy]) => {
          this.ctx.fillRect((dx + 1)* this.blockSize + x + this.margin, (dy + 1) * this.blockSize + y + this.margin, this.blockSize - 1, this.blockSize -1 )
        })
      }      
    }
  }

  blockRatate = (block, block_number, direction = 1) => {
    const newBlock = []
    if (block_number == 1) { // O mino
      return block
    }
    if (block_number == 0) { // I mino
      block.forEach(([x, y]) => {
        // アフィン変換による一発回転
        if (direction == 1) {
          newBlock.push([-y , x - 1])
        } else {
          newBlock.push([y + 1, -x])
        }
      })
      return newBlock
      }
    block.forEach(([x, y]) => {
      if (direction == 1) {
        newBlock.push([y , -x])
      } else {
        newBlock.push([-y , x])
      }
    })
    return newBlock
  }

  hold = () => {
    if (this.holdedBlock) {
      return
    }
    if (this.holdBlock == null) {
      this.holdBlock = this.currentBlockNumber
      this.startNewBlock()
    } else {
      const tmp = this.holdBlock
      this.holdBlock = this.currentBlockNumber
      this.currentBlockNumber = tmp
      this.currentBlock = this.BLOCKS[this.currentBlockNumber]
      this.current_x = 5
      this.current_y = 0
      this.rotate = 0
      this.holdedBlock = true
      this.drawBlock(this.currentBlockNumber, this.current_x, this.current_y, this.currentBlock)
      this.drawNextBlock()
    }
  }

  drawBlock = (blocktype, x, y, block = null) => {
    if (block === null) {
      block = this.BLOCKS[blocktype]
    }
    this.drawBoard()
    this.ctx.fillStyle = this.BLOCKS_COLOR[blocktype]
    block.forEach(([dx, dy]) => {
      this.ctx.fillRect((x + dx) * this.blockSize + this.GameBoardX, (y + dy) * this.blockSize + this.GameBoardY, this.blockSize - 1, this.blockSize -1 )
    })
    if (this.option.useGhost) {
      const dropY = this.checkDropPosition()
      this.ctx.fillStyle = this.BLOCKS_COLOR[blocktype]
      this.ctx.globalAlpha = 0.2
      block.forEach(([dx, dy]) => {
        this.ctx.fillRect((x + dx) * this.blockSize + this.GameBoardX, (y + dy + dropY) * this.blockSize + this.GameBoardY, this.blockSize - 1, this.blockSize -1 )
      })
      this.ctx.globalAlpha = 1
    }
    this.drawScore()
  }


  drawScore = () => {
    this.ctx.fillStyle = 'white'
    this.ctx.font = this.font
    this.ctx.clearRect(0, 0, this.blockSize * 10 , this.blockSize * 4)
    this.ctx.fillText(`  Score: ${this.score}`, this.margin, this.blockSize * 1)
    this.ctx.fillText(`HiScore: ${this.highscore}`, this.margin, this.blockSize * 2)
  }

  gameIsOver = () => {
    this.highscore = Math.max(this.highscore, this.score)
    if (this.option.setHighScore) {
      localStorage.setItem('highscore', this.highscore)
    }

    this.drawGameOver()
    this.drawPressStart()
  }


  drawGameOver = () => {
    this.ctx.fillStyle = 'white'
    const x = this.blockSize * 4 + this.GameBoardX
    const y = this.blockSize * 8 + this.GameBoardY
    this.ctx.font = this.font
    this.ctx.shadowColor = 'black'
    this.ctx.shadowBlur = 10
    this.ctx.fillText(`Game Over`, x, y)
    this.ctx.shadowBlur = 0
    this.waitGameEvents()

    clearInterval(this.interval)
    this.interval = null
    this.gameOver = true
  }

  drawPressStart = () => {
    this.ctx.fillStyle = 'white'
    this.ctx.font = this.font
    const x = this.GameBoardX + this.blockSize
    const y = this.blockSize * 9 + this.GameBoardY + this.margin
    this.textAllign = 'center'
    this.ctx.shadowColor = 'black'
    this.ctx.shadowBlur = 10
    this.ctx.fillText(`Press space to start`, x , y)
    this.ctx.shadowBlur = 0
  }

  keyDownHandler = (e) => {
    try {
      switch (e.code) {
        case 'ArrowRight':
          this.moveRight()
          break
        case 'ArrowLeft':
          this.moveLeft()
          break
        case 'ArrowDown':
          this.moveDown()
          break
        case 'Space':
          this.rotatiton()
          break
        case 'ArrowUp':
          if (this.option.hardDrop) {
            this.moveHardDown()
          }
          break
        case 'KeyX':
          if (this.option.reverseRotation) {
            this.rotatiton()
          }
          break
        case 'KeyZ':
          if (this.option.reverseRotation) {
            //this.reverseRotation()
            this.rotatiton(-1)
          }
          break
        case 'ShiftLeft':
          if (this.option.hold) {
            this.hold()
          }
          break
        default:
          break
      }
    } catch(e) {
      // console.log(e)
    }
  }

  clickButtonHandler = (e) => {
    let elm = e.target
    try {
      while (elm.nodeName !== 'BUTTON') {
        elm = elm.parentNode
        if (elm == null) {
          return
        }
      }

      const id = elm.id
      switch (id) {
        case 'right':
          this.moveRight()
          break
        case 'left':
          this.moveLeft()
          break
        case 'down':
          this.moveDown()
          break
        case 'rotate':
          this.rotatiton()
          break
        case 'harddrop':
          if (this.option.hardDrop) {
            this.moveHardDown()
          }
          break
        case 'reverse':
          if (this.option.reverseRotation) {
            // this.reverseRotation()
            this.rotatiton(-1)
          }
          break
        case 'hold':
          if (this.option.hold) {
            this.hold()
          }
          break
        default:
          break
      }
    } catch(e) {
      // console.log(e)
    }

  }
  
  keyUpHandler = (e) => {
  }



  rotatiton = (direction = 1) => { // direction  1 is right rotation  -1 is left rotation 
    const newBlock = this.blockRatate(this.currentBlock, this.currentBlockNumber, direction)
    if (this.colligionCheck(newBlock, this.current_x, this.current_y)) {
      this.currentBlock = newBlock
      this.rotate = (this.rotate + direction) % 4
      this.drawBlock(this.currentBlockNumber, this.current_x, this.current_y, this.currentBlock)
      return
    }
    if (this.superRotationSystem) {
      if (this.currentBlock !== 1 ) { // not O mino
        const x = this.current_x
        const y = this.current_y
        const srs = direction == 1 ?[
          [[-1, 0],[-1, -1], [ 0, 2], [ -1, 2]], // 0 -> 1
          [[ 1, 0],[ 1,  1], [ 0,-2], [  1,-2]], // 1 -> 2
          [[ 1, 0],[ 1, -1], [ 0, 2], [  1, 2]], // 2 -> 3
          [[-2, 0],[-2,  1], [ 0,-2], [ -1,-2]], // 3 -> 0
        ]:
        [
          [[ 1, 0], [ 1, -1], [ 0, 2], [ 1, 2]], // 0 -> 3
          [[ 1, 0], [ 1,  1], [ 0,-2], [ 1,-2]], // 1 -> 0
          [[-1, 0], [-1, -1], [ 0, 2], [-1, 2]], // 2 -> 1
          [[-1, 0], [-1, -1], [ 0,-2], [-1,-2]], // 3 -> 2
        ]
        const srsI = direction == 1 ?[
          [[-2, 0],[ 1,  0], [-2, -1], [ 1,  2]], // 0 -> 1
          [[ 2, 0],[-1,  0], [ 2,  1], [-1, -2]], // 1 -> 2
          [[ 1, 0],[-2,  0], [ 1, -2], [-2,  1]], // 2 -> 3
          [[-1, 0],[ 2,  0], [-1,  2], [ 2, -1]], // 3 -> 0
        ]:
        [
          [[-1, 0],[ 2,  0], [-1, -2], [ 2,  1]], // 0 -> 3
          [[ 2, 0],[-1,  0], [ 2, -1], [-1,  2]], // 1 -> 0
          [[ 1, 0],[-2,  0], [ 1,  2], [-2, -1]], // 2 -> 1
          [[ 1, 0],[-2,  0], [-2, -1], [ 1,  2]], // 3 -> 2
        ]
        const srsIndex = this.rotate % 4
        const srsBlock = this.currentBlockNumber === 0 ? srsI[srsIndex] : srs[srsIndex] // I mino?
        srsBlock.forEach(([dx, dy]) => {
          if (this.colligionCheck(newBlock, x + dx, y + dy)) {
            this.current_x = x + dx
            this.current_y = y + dy
            this.currentBlock = newBlock
            this.rotate = (this.rotate + direction) % 4
            this.drawBlock(this.currentBlockNumber, this.current_x, this.current_y, this.currentBlock)
            return
          }
        });
      }

    }
  }

  colligionCheck = (block, x, y, flag=false) => {
    for (let i = 0; i < block.length; i++) {
      const [dx, dy] = block[i]
      if (flag) {
        console.log("check", x + dx, y + dy, dx, dy )
      }
      if (x + dx < 1 || x + dx >= this.width - 1 || y + dy < 0 || y + dy >= this.height) {
        return false
      }
      if (this.board[y + dy][x + dx] !== 0) {
        return false
      }
    }
    return true
  }

  fixBlock = () => {
    for (let i = 0; i < this.currentBlock.length; i++) {
      const [dx, dy] = this.currentBlock[i]
      const x = this.current_x + dx
      const y = this.current_y + dy
      if ( x >= 0 && y >= 0 ) {
        this.board[y][x] = this.currentBlockNumber + 1
      }
    }
    this.holdedBlock = false
    this.checkLine()
    this.startNewBlock()
  }

  checkLine = () => {
    let lines = 0
    for (let y = 1; y < this.height - 1; y++) {
      let line = true
      for (let x = 1; x < this.width - 1; x++) {
        if (this.board[y][x] === 0) {
          line = false
          break
        }
      }
      if (line) {
        lines += 1
        for (let i = y; i > 1; i--) {
          for (let j = 1; j < this.width - 1; j++) {
            this.board[i][j] = this.board[i - 1][j]
          }
        }
      } 
    }
    const score = [0, 40, 100, 300, 1200]
    this.score += score[lines] * this.level
    this.clearLines += lines
    console.log(this.score, this.level)
    this.drawScore()
    // check level up
    if (this.clearLines >= 10) {
      this.level += 1
      this.clearLines = 0
      clearInterval(this.interval)
      this.interval = setInterval(this.moveDown, this.getWaitTime())
    }
  }

  startNewBlock = () => {
    this.currentBlockNumber = this.nextBlockNumbers.shift()
    if (this.option.useBag) {
      if (this.bag.length === 0) {
        this.bag = this.shuffle()
      }
      this.nextBlockNumbers.push(this.bag.pop())
    } else {
      this.nextBlockNumbers.push(Math.floor(Math.random() * this.BLOCKS.length))
    }
    this.current_x = 5
    this.current_y = 0
    this.rotate = 0
    this.currentBlock = this.BLOCKS[this.currentBlockNumber]
    let check = true
    try {
      for (let i = 0; i < this.currentBlock.length; i++) {
       const [dx, dy] = this.currentBlock[i]
        const x = this.current_x + dx
        const y = this.current_y + dy
        if ( x >= 0 && y >= 0 ) {

          if (this.board[y][x] !== 0) {
            check = false
            break
          }
        }
      }
    } catch(e) {
      console.log(e)
    }
    console.log(check)
    if (check) {
      this.drawBlock(this.currentBlockNumber, this.current_x, this.current_y, this.currentBlock)
      this.drawNextBlock()
    } else {
      this.drawBlock(this.currentBlockNumber, this.current_x, this.current_y, this.currentBlock)
      this.gameOver = true
      this.gameIsOver()
    }
  }


  moveRight = () => {
    if (this.colligionCheck(this.currentBlock, this.current_x + 1, this.current_y)) {
      this.current_x += 1
    }
    this.drawBlock(this.currentBlockNumber, this.current_x, this.current_y, this.currentBlock)
  }

  moveLeft = () => {
    if (this.colligionCheck(this.currentBlock, this.current_x - 1, this.current_y)) {
      this.current_x -= 1
    }
    this.drawBlock(this.currentBlockNumber, this.current_x, this.current_y, this.currentBlock)
  }

  moveDown = () => {
    if (this.colligionCheck(this.currentBlock, this.current_x, this.current_y + 1)) {
      this.current_y += 1
      this.drawBlock(this.currentBlockNumber, this.current_x, this.current_y, this.currentBlock)
    } else {
      this.fixBlock()
    }
    // reset interval
    if (this.interval !== null) {
      clearInterval(this.interval)
      this.interval = setInterval(this.moveDown, this.getWaitTime())
    }
  }

  checkDropPosition = () => {
    const x = this.current_x
    let y = this.current_y
    const newBlock = this.currentBlock
    while (this.colligionCheck(newBlock, x, y + 1)) {
      y += 1
    }
    return y - this.current_y
  }

  moveHardDown = () => {
    while (this.colligionCheck(this.currentBlock, this.current_x, this.current_y + 1)) {
      this.current_y += 1
    }
    this.drawBlock(this.currentBlockNumber, this.current_x, this.current_y, this.currentBlock)
    this.fixBlock()
  }
}


