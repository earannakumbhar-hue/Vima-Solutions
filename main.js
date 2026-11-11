(function(){
var C=window.VIMA||{};
var nav=document.getElementById("nav"),mb=document.querySelector(".menu");
if(nav&&mb)mb.addEventListener("click",function(){var o=nav.classList.toggle("open");mb.setAttribute("aria-expanded",o)});
var f=document.getElementById("f");if(!f)return;
var pv=new URLSearchParams(location.search).get("vehicle");
if(pv){for(var i=0;i<f.vehicle.options.length;i++){if(f.vehicle.options[i].text===pv)f.vehicle.value=pv}}
function show(id,b){var e=document.getElementById(id);if(e)e.style.display=b?"block":"none"}
var ok=document.getElementById("ok"),btn=f.querySelector("button[type=submit]");
function showOk(h,p,buttons){f.style.display="none";document.getElementById("okh").textContent=h;document.getElementById("okp").textContent=p;
show("okb",buttons);ok.style.display="block";ok.focus()}
f.addEventListener("submit",function(e){
e.preventDefault();
var n=f.cust_name.value.trim(),m=f.mobile.value.replace(/[\s+\-]/g,"").replace(/^91(?=\d{10}$)/,""),bad=false,b;
b=!n;show("en",b);bad=bad||b;
b=!/^[6-9]\d{9}$/.test(m);show("em",b);bad=bad||b;
[["rf","erf"],["rr","err2"],["pp","epp"]].forEach(function(x){var fl=document.getElementById(x[0]).files[0],el=document.getElementById(x[1]);
var big=fl&&fl.size>10485760;el.textContent=big?"File is larger than 10 MB. Choose a smaller file.":el.textContent;b=!fl||big;show(x[1],b);bad=bad||b});
var cl=f.querySelector("input[name=claim]:checked");b=!cl;show("ecl",b);bad=bad||b;
if(bad){var first=f.querySelector(".err[style*=block]");if(first)first.scrollIntoView({block:"center"});return}
var t="Hello Vima Solutions, I need assistance with motor insurance.\nName: "+n+"\nMobile: "+m+"\nVehicle: "+f.vehicle.value+"\nRequirement: "+f.requirement.value+"\nClaim taken in previous year: "+cl.value+"\nDocuments: RC front, RC rear, previous year insurance copy"+(f.message.value.trim()?"\nMessage: "+f.message.value.trim():"");
var files=[f.rc_front.files[0],f.rc_rear.files[0],f.prev_policy.files[0]];
function fallback(intro){
document.getElementById("sw").href="https://wa.me/"+(C.whatsapp||"918308544544")+"?text="+encodeURIComponent(t);
document.getElementById("se").href="mailto:"+(C.email||"vimasolutions@hotmail.com")+"?subject="+encodeURIComponent("Motor insurance enquiry from "+n)+"&body="+encodeURIComponent(t);
var ss=document.getElementById("ss");
if(navigator.canShare&&navigator.canShare({files:files})){ss.style.display="inline-flex";ss.onclick=function(){navigator.share({files:files,text:t,title:"Motor insurance enquiry"}).catch(function(){})}}
showOk("Your enquiry is ready",intro+" Links cannot carry attachments. On a phone, tap Share details and documents and choose WhatsApp. Otherwise send the details, then attach your RC (front and rear) and previous year policy in the chat or email.",true)}
if(!C.formEndpoint){fallback("Choose how to send it to Vima Solutions.");return}
btn.disabled=true;btn.textContent="Sending…";
fetch(C.formEndpoint,{method:"POST",body:new FormData(f),headers:{Accept:"application/json"}})
.then(function(r){if(!r.ok)throw 0;showOk("Thank you, your enquiry has been sent","We have received your details and will reply during business hours, Monday to Saturday, 10:00 AM – 6:00 PM.",false)})
.catch(function(){btn.disabled=false;btn.textContent="Send enquiry";fallback("We could not send the form automatically.")});
});})();
