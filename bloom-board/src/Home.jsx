import React from 'react'

function Home() {
  return (
    <div className="home">
 <div className="header"><h2>Bloom board</h2></div>
    <h4 className="intro1">Application tracker</h4>
    <h1 className="chapter-title">Your chapter starts here.</h1>

    <h5 className="description">A calm little space to stay on top of things.</h5>

<div className="box-1">
    <div className="box-1-1">
        Application <br/>
         <h1>12</h1>
    </div>
    <div className="box-1-2">
       Interview <br/>
         <h1>3</h1>
    </div>
</div>



    <div> 
        <h3> Search organizations or role </h3>
    </div>
    
<div>
    <button>+ Add application</button>
</div>


<div>
    <div><h2>Luna studio</h2>
        <h4>Frontend intern</h4>
    </div>
</div>
<div>
    <div><h2>Petal Foundation</h2>
        <h4>Scolarship</h4>
    </div>
</div>
<div>
    <div><h2>Nova Labs</h2>
        <h4>Junior Developer</h4>
    </div>
</div>
    </div>
   

  )
}

export default Home