const Home = () => {


    // handling file uploading: 
    const uploadBoard=(e)=>{
        resetBoard();  
        const file=e.target.files[0]
        const reader=new FileReader()
        const newBoard=[]

        reader.onload=(event)=>{
            const data=event.target.result
            const lines=data.split("\n")

            for(let i=0;i<lines.length;i++)
            {
                const line=lines[i].trim();
                const row=[]
                for(let j=0;j<line.length;j++)
                {
                    if(line[j]==="-") row.push("S")
                    else row.push(line[j])
                }
                newBoard.push(row)
            }

            console.log("board setup",newBoard)
            play.resetGameEnvironment()
            play.setBoard(newBoard)
            setWumpusCnt(play.wumpusCount);
            setPitCnt(play.pitCount);
            setGoldCnt(play.goldCount);
            setBoard([...play.getBoard()])
        }

        reader.readAsText(file)
    }

    return ( 
        <>
        </>
     );
}
 
export default Home;
