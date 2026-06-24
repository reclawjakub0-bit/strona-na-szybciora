
let history=[];

function render(){
 document.getElementById('chat').innerHTML=history.join("<br><br>");
}

async function send(){
 const input=document.getElementById('msg');
 const m=input.value.trim();
 if(!m) return;

 history.push("🧑 Ty: "+m);
 render();
 input.value="";

 history.push("🤖 Szybcior AI: piszę odpowiedź...");
 render();

 try{
   const r=await fetch('/.netlify/functions/chat',{
     method:'POST',
     headers:{'Content-Type':'application/json'},
     body:JSON.stringify({message:m})
   });

   const data=await r.json();
   history.pop();
   history.push("🤖 Szybcior AI: "+data.reply);
 }catch(e){
   history.pop();
   history.push("🤖 Szybcior AI: Nie udało się połączyć z AI.");
 }

 render();
}

document.getElementById('msg').addEventListener('keydown',e=>{
 if(e.key==='Enter') send();
});
