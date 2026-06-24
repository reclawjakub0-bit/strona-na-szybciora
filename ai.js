
let history=JSON.parse(localStorage.getItem("chat")||"[]");
function render(){document.getElementById('chat').innerHTML=history.join("<br>")}
function send(){
let m=document.getElementById('msg').value;
history.push("Ty: "+m);
let a="Szybcior AI: ";
if(m.toLowerCase().includes("koszt")) a+="Cena zależy od projektu. Przygotujemy wycenę.";
else if(m.toLowerCase().includes("potrwa")) a+="Realizacja zwykle trwa kilka dni.";
else if(m.toLowerCase().includes("sklep")) a+="Tak, tworzymy sklepy internetowe.";
else if(m.toLowerCase().includes("seo")) a+="Tak, oferujemy SEO i hosting.";
else a+="Pomagam w stronach, sklepach, SEO i hostingu StronaNaSzybciora.";
history.push(a);
localStorage.setItem("chat",JSON.stringify(history));
render();
document.getElementById('msg').value="";
}
document.getElementById('msg').addEventListener('keydown',e=>{if(e.key==="Enter")send()});
render();
