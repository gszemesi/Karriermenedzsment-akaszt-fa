const szoDiv = document.querySelector("#szo");
const betukDiv = document.querySelector("#betuk");
const eredmenyDiv = document.querySelector("#eredmeny");
const vegeDiv = document.querySelector("#vege")
const ujra = document.querySelector("#ujra")

let szok = ["életpálya","karrier","karriermenedzsment","önéletrajz","europass","interjú","álláshirdetés","munkaszerződés","névjegykártya","profession.hu","linkedin.com"];
let szo = szok[Math.floor(Math.random()*szok.length)];
let tippek = [];
const MAXTIPP = 9;
const t = "aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz.";



function genSzo() {
  szoDiv.innerHTML=szo.split("").map(x=>`<span>${tippek.includes(x) || vesztett() ? x : ""}</span>`).join("");
}
genSzo();

function genBetuk() {
  betukDiv.innerHTML=t.split("").map(x=>`<button ${tippek.includes(x) || nyert() || vesztett() ?"disabled":""}>${x}</button>`).join("");
}
genBetuk();

function genEredmeny(){
  eredmenyDiv.innerHTML=`${rosszTippekSzáma()}/${MAXTIPP}`;
  if (rosszTippekSzáma() > 0) {document.querySelector(`svg *:nth-child(${rosszTippekSzáma()})`).classList.add("rajzol"); }
}
genEredmeny();

function tippel(betu){
  tippek.push(betu);
}

function nyert() {
  return szo.split("").every(b=>tippek.includes(b));
}

function vesztett(){
  return rosszTippekSzáma() === MAXTIPP;
}

function rosszTippekSzáma(){
  return tippek.filter(a=>!szo.includes(a)).length;
}



betukDiv.addEventListener("click", kattintas);
function kattintas(e) { 
  if(!e.target.matches("button")) return; 
  let betu=e.target.innerHTML;
  tippel(betu);
  genBetuk();
  genSzo();
  if (nyert()) {
    szoDiv.classList.add("nyer");
    vegeDiv.style.display = "block";
    vegeDiv.innerHTML="Gratulálok, yertél!"
  }
  genEredmeny();
  if (vesztett()) {
    szoDiv.classList.add("hianyzo");
    vegeDiv.style.display = "block";
    vegeDiv.innerHTML="Sajnos most vesztettél, próbáld újra!"
  }
}

ujra.addEventListener("click", ujrakezdés);
function ujrakezdés(){
  window.location.reload();
} 
