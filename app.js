(() => {
  const cfg = window.SALON_CONFIG || {};
  const client = window.supabase?.createClient(cfg.SUPABASE_URL || "", cfg.SUPABASE_ANON_KEY || "");
  const servicesFallback = [
    {id:1,name:"Fruit",category:"Cleanup",price:149,duration_minutes:null,description:"Cleanup service. Please contact the salon for details.",emoji:"🌿"},
    {id:2,name:"Wine",category:"Cleanup",price:199,duration_minutes:null,description:"Cleanup service. Please contact the salon for details.",emoji:"🌿"},
    {id:3,name:"Charcoal",category:"Cleanup",price:199,duration_minutes:null,description:"Cleanup service. Please contact the salon for details.",emoji:"🌿"},
    {id:4,name:"Lotus",category:"Cleanup",price:399,duration_minutes:null,description:"Cleanup service. Please contact the salon for details.",emoji:"🌿"},
    {id:5,name:"Tightening",category:"Cleanup",price:349,duration_minutes:null,description:"Cleanup service. Please contact the salon for details.",emoji:"🌿"},
    {id:6,name:"VLCC",category:"Cleanup",price:349,duration_minutes:null,description:"Cleanup service. Please contact the salon for details.",emoji:"🌿"},
    {id:7,name:"Natures",category:"Cleanup",price:399,duration_minutes:null,description:"Cleanup service. Please contact the salon for details.",emoji:"🌿"},
    {id:8,name:"O3+",category:"Cleanup",price:699,duration_minutes:null,description:"Cleanup service. Please contact the salon for details.",emoji:"🌿"},
    {id:9,name:"Fruit",category:"Facial",price:249,duration_minutes:null,description:"Facial service. Please contact the salon for details.",emoji:"✨"},
    {id:10,name:"Wine",category:"Facial",price:399,duration_minutes:null,description:"Facial service. Please contact the salon for details.",emoji:"✨"},
    {id:11,name:"Charcoal",category:"Facial",price:399,duration_minutes:null,description:"Facial service. Please contact the salon for details.",emoji:"✨"},
    {id:12,name:"Lotus",category:"Facial",price:599,duration_minutes:null,description:"Facial service. Please contact the salon for details.",emoji:"✨"},
    {id:13,name:"Tightening",category:"Facial",price:699,duration_minutes:null,description:"Facial service. Please contact the salon for details.",emoji:"✨"},
    {id:14,name:"VLCC",category:"Facial",price:799,duration_minutes:null,description:"Facial service. Please contact the salon for details.",emoji:"✨"},
    {id:15,name:"Natures",category:"Facial",price:899,duration_minutes:null,description:"Facial service. Please contact the salon for details.",emoji:"✨"},
    {id:16,name:"O3+",category:"Facial",price:1100,duration_minutes:null,description:"Facial service. Please contact the salon for details.",emoji:"✨"},
    {id:17,name:"Basic Makeup",category:"Makeup",price:1199,duration_minutes:null,description:"Makeup service. Please contact the salon for details.",emoji:"💄"},
    {id:18,name:"Party Makeup Light",category:"Makeup",price:1499,duration_minutes:null,description:"Makeup service. Please contact the salon for details.",emoji:"💄"},
    {id:19,name:"Glitter Makeup",category:"Makeup",price:2099,duration_minutes:null,description:"Makeup service. Please contact the salon for details.",emoji:"💄"},
    {id:20,name:"Party Makeup + LenC",category:"Makeup",price:2599,duration_minutes:null,description:"Makeup service. Please contact the salon for details.",emoji:"💄"},
    {id:21,name:"Bridal Makeup",category:"Makeup",price:10999,duration_minutes:null,description:"Makeup service. Please contact the salon for details.",emoji:"💄"},
    {id:22,name:"Glossy Bridal Makeup",category:"Makeup",price:14999,duration_minutes:null,description:"Makeup service. Please contact the salon for details.",emoji:"💄"},
    {id:23,name:"Arms Wax",category:"Waxing",price:149,duration_minutes:null,description:"Waxing service. Please contact the salon for details.",emoji:"🌸"},
    {id:24,name:"Legs Wax",category:"Waxing",price:249,duration_minutes:null,description:"Waxing service. Please contact the salon for details.",emoji:"🌸"},
    {id:25,name:"Full Leg Wax",category:"Waxing",price:349,duration_minutes:null,description:"Waxing service. Please contact the salon for details.",emoji:"🌸"},
    {id:26,name:"Full Body Wax",category:"Waxing",price:1399,duration_minutes:null,description:"Waxing service. Please contact the salon for details.",emoji:"🌸"},
    {id:27,name:"Underarms",category:"Waxing",price:99,duration_minutes:null,description:"Waxing service. Please contact the salon for details.",emoji:"🌸"},
    {id:28,name:"Bikini Waxing",category:"Waxing",price:899,duration_minutes:null,description:"Waxing service. Please contact the salon for details.",emoji:"🌸"},
    {id:29,name:"Arms Wax",category:"Waxing (Rica)",price:349,duration_minutes:null,description:"Waxing (Rica) service. Please contact the salon for details.",emoji:"🌷"},
    {id:30,name:"Legs Wax",category:"Waxing (Rica)",price:399,duration_minutes:null,description:"Waxing (Rica) service. Please contact the salon for details.",emoji:"🌷"},
    {id:31,name:"Full Leg Wax",category:"Waxing (Rica)",price:599,duration_minutes:null,description:"Waxing (Rica) service. Please contact the salon for details.",emoji:"🌷"},
    {id:32,name:"Full Body Wax",category:"Waxing (Rica)",price:2099,duration_minutes:null,description:"Waxing (Rica) service. Please contact the salon for details.",emoji:"🌷"},
    {id:33,name:"Underarms",category:"Waxing (Rica)",price:149,duration_minutes:null,description:"Waxing (Rica) service. Please contact the salon for details.",emoji:"🌷"},
    {id:34,name:"Bikini Waxing",category:"Waxing (Rica)",price:1099,duration_minutes:null,description:"Waxing (Rica) service. Please contact the salon for details.",emoji:"🌷"},
    {id:35,name:"Pedicure",category:"Basic Work",price:349,duration_minutes:null,description:"Basic Work service. Please contact the salon for details.",emoji:"🪷"},
    {id:36,name:"Manicure",category:"Basic Work",price:299,duration_minutes:null,description:"Basic Work service. Please contact the salon for details.",emoji:"🪷"},
    {id:37,name:"Body Polishing",category:"Basic Work",price:2099,duration_minutes:null,description:"Basic Work service. Please contact the salon for details.",emoji:"🪷"},
    {id:38,name:"Full Body Bleach",category:"Basic Work",price:899,duration_minutes:null,description:"Basic Work service. Please contact the salon for details.",emoji:"🪷"},
    {id:39,name:"Threading",category:"Basic Work",price:20,duration_minutes:null,description:"Basic Work service. Please contact the salon for details.",emoji:"🪷"},
    {id:40,name:"Face Bleach",category:"Basic Work",price:49,duration_minutes:null,description:"Basic Work service. Please contact the salon for details.",emoji:"🪷"},
    {id:41,name:"Smoothing",category:"Hair Services",price:1999,duration_minutes:null,description:"Hair Services service. Please contact the salon for details.",emoji:"💇🏻‍♀️"},
    {id:42,name:"Kratin",category:"Hair Services",price:1999,duration_minutes:null,description:"Hair Services service. Please contact the salon for details.",emoji:"💇🏻‍♀️"},
    {id:43,name:"Hair Spa",category:"Hair Services",price:699,duration_minutes:null,description:"Hair Services service. Please contact the salon for details.",emoji:"💇🏻‍♀️"},
    {id:44,name:"Rewinding",category:"Hair Services",price:1999,duration_minutes:null,description:"Hair Services service. Please contact the salon for details.",emoji:"💇🏻‍♀️"},
    {id:45,name:"Global",category:"Hair Services",price:1999,duration_minutes:null,description:"Hair Services service. Please contact the salon for details.",emoji:"💇🏻‍♀️"},
    {id:46,name:"Hair Colour",category:"Hair Services",price:299,duration_minutes:null,description:"Hair Services service. Please contact the salon for details.",emoji:"💇🏻‍♀️"},
    {id:47,name:"Heighliting (Stick)",category:"Hair Services",price:199,duration_minutes:null,description:"Hair Services service. Please contact the salon for details.",emoji:"💇🏻‍♀️"},
    {id:48,name:"Layered Cut",category:"Hair Cut",price:199,duration_minutes:null,description:"Hair Cut service. Please contact the salon for details.",emoji:"✂️"},
    {id:49,name:"Straight Cut",category:"Hair Cut",price:99,duration_minutes:null,description:"Hair Cut service. Please contact the salon for details.",emoji:"✂️"},
    {id:50,name:"U Cut",category:"Hair Cut",price:149,duration_minutes:null,description:"Hair Cut service. Please contact the salon for details.",emoji:"✂️"},
    {id:51,name:"V Cut",category:"Hair Cut",price:149,duration_minutes:null,description:"Hair Cut service. Please contact the salon for details.",emoji:"✂️"},
    {id:52,name:"Step Cut",category:"Hair Cut",price:249,duration_minutes:null,description:"Hair Cut service. Please contact the salon for details.",emoji:"✂️"},
    {id:53,name:"Father Cut",category:"Hair Cut",price:299,duration_minutes:null,description:"Hair Cut service. Please contact the salon for details.",emoji:"✂️"},
    {id:54,name:"Arms D-Tan",category:"D-Tan",price:499,duration_minutes:null,description:"D-Tan service. Please contact the salon for details.",emoji:"☀️"},
    {id:55,name:"Full Legs D-Tan",category:"D-Tan",price:599,duration_minutes:null,description:"D-Tan service. Please contact the salon for details.",emoji:"☀️"},
    {id:56,name:"Full Body D-Tan",category:"D-Tan",price:2999,duration_minutes:null,description:"D-Tan service. Please contact the salon for details.",emoji:"☀️"},
    {id:57,name:"Face D-Tan",category:"D-Tan",price:199,duration_minutes:null,description:"D-Tan service. Please contact the salon for details.",emoji:"☀️"},
    {id:58,name:"VLCC",category:"Pre-Bridal",price:8999,duration_minutes:null,description:"Pre-Bridal service. Please contact the salon for details.",emoji:"👰"},
    {id:59,name:"Lotus",category:"Pre-Bridal",price:11999,duration_minutes:null,description:"Pre-Bridal service. Please contact the salon for details.",emoji:"👰"},
    {id:60,name:"O3+",category:"Pre-Bridal",price:14999,duration_minutes:null,description:"Pre-Bridal service. Please contact the salon for details.",emoji:"👰"}
  ];
  let services=[], activeCategory="All", selectedService=null, authMode="login";
  const $=id=>document.getElementById(id), money=n=>"₹"+Number(n).toLocaleString("en-IN");
  function notify(s){const el=$("toast");el.textContent=s;el.classList.remove("hidden");clearTimeout(notify.timer);notify.timer=setTimeout(()=>el.classList.add("hidden"),3000)}
  function openModal(id){$(id).classList.remove("hidden")} function closeModal(id){$(id).classList.add("hidden")}
  document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>closeModal(b.dataset.close)));
  document.querySelectorAll("[data-auth]").forEach(b=>b.addEventListener("click",()=>setAuthMode(b.dataset.auth)));
  $("accountBtn").onclick=$("mobileAccount").onclick=showAccount;
  $("whatsappContact").onclick=$("mobileWhatsapp").onclick=()=>whatsapp("Hello Rs Beauty Parlour! I'd like to enquire about your services.");
  $("year").textContent=new Date().getFullYear();
  $("signOutBtn").onclick=async()=>{await client.auth.signOut();closeModal("accountModal");notify("You have signed out.")};
  $("authForm").addEventListener("submit",submitAuth);
  $("bookingForm").addEventListener("submit",submitBooking);
  $("inquiryForm").addEventListener("submit",submitInquiry);
  $("bookingDate").min=new Date().toISOString().slice(0,10);

  function configured(){return client && cfg.SUPABASE_URL && !cfg.SUPABASE_URL.includes("YOUR-PROJECT") && cfg.SUPABASE_ANON_KEY && !cfg.SUPABASE_ANON_KEY.includes("YOUR_")}
  async function loadServices(){
    if(configured()){const {data,error}=await client.from("services").select("*").eq("is_active",true).order("category").order("name");if(!error&&data?.length)services=data;else services=servicesFallback}
    else services=servicesFallback;
    renderFilters();renderServices();
  }
  function renderFilters(){const cats=["All","Cleanup","Facial","Makeup","Waxing","Waxing (Rica)","Basic Work","Hair Services","Hair Cut","D-Tan","Pre-Bridal"];$("categoryFilters").innerHTML=cats.map(c=>`<button class="filter ${activeCategory===c?"active":""}" data-cat="${c}">${c}</button>`).join("");$("categoryFilters").querySelectorAll("button").forEach(b=>b.onclick=()=>{activeCategory=b.dataset.cat;renderFilters();renderServices()})}
  function renderServices(){const list=services.filter(s=>activeCategory==="All"||s.category===activeCategory);$("serviceGrid").innerHTML=list.map(s=>`<article class="service-card"><div class="service-icon">${s.emoji||"✿"}</div><span class="cat">${escapeHtml(s.category)}</span><h3>${escapeHtml(s.name)}</h3><p>${escapeHtml(s.description||"A little time just for you.")}</p><div class="service-meta"><b>${money(s.price)}</b><small>${s.duration_minutes ? s.duration_minutes+" min" : "Ask salon"}</small></div><button class="btn" data-book="${s.id}">Add to booking +</button></article>`).join("");$("serviceGrid").querySelectorAll("[data-book]").forEach(b=>b.onclick=()=>startBooking(b.dataset.book))}
  async function submitAuth(e){e.preventDefault();if(!configured())return notify("Please add your Supabase URL and anon key in config.js first.");const email=$("authEmail").value.trim(),password=$("authPassword").value,phone=$("authPhone").value.trim(),name=$("authName").value.trim();
    if(authMode==="signup"){const {data,error}=await client.auth.signUp({email,password,options:{data:{full_name:name,phone}}});if(error)return notify(error.message);if(data.user){const {error:profileErr}=await client.from("profiles").upsert({id:data.user.id,full_name:name,phone},{onConflict:"id"});if(profileErr)console.warn(profileErr)}notify("Account created. Check your email if confirmation is enabled.");if(data.session){closeModal("authModal");showAccount()}}
    else{const {error}=await client.auth.signInWithPassword({email,password});if(error)return notify(error.message);closeModal("authModal");notify("Welcome back!");showAccount()}}
  function setAuthMode(mode){authMode=mode;$("authTitle").textContent=mode==="login"?"Welcome back":"Create your account";$("authName").classList.toggle("hidden",mode==="login");$("authName").required=mode==="signup";$("authSubmit").textContent=mode==="login"?"Login":"Create account";document.querySelectorAll("[data-auth]").forEach(b=>b.classList.toggle("active",b.dataset.auth===mode))}
  async function startBooking(id){if(!configured())return notify("Connect Supabase in config.js to enable secure bookings.");const {data:{user}}=await client.auth.getUser();if(!user){setAuthMode("login");openModal("authModal");return notify("Please log in before booking.")}selectedService=services.find(s=>String(s.id)===String(id));if(!selectedService)return; $("bookingTitle").textContent=`${selectedService.name} · ${money(selectedService.price)}`;openModal("bookingModal")}
  async function submitBooking(e){e.preventDefault();const {data:{user}}=await client.auth.getUser();if(!user)return notify("Please log in first.");const payload={customer_id:user.id,service_id:typeof selectedService.id==="number"?selectedService.id:null,service_name:selectedService.name,price:selectedService.price,appointment_date:$("bookingDate").value,time_slot:$("bookingTime").value,notes:$("bookingNotes").value.trim(),status:"requested",payment_status:"pending"};
    const {data,error}=await client.from("bookings").insert(payload).select().single();if(error)return notify(error.message);closeModal("bookingModal");notify("Booking request saved. Opening WhatsApp…");const {data:profile}=await client.from("profiles").select("full_name,phone").eq("id",user.id).single();const msg=`Hello Rs Beauty Parlour! I'd like to request an appointment.%0AName: ${encodeURIComponent(profile?.full_name||user.email)}%0AWhatsApp: ${encodeURIComponent(profile?.phone||"")}%0AService: ${encodeURIComponent(selectedService.name)}%0ADate: ${encodeURIComponent(payload.appointment_date)}%0ATime: ${encodeURIComponent(payload.time_slot)}%0APrice: ${encodeURIComponent(money(payload.price))}%0ABooking ID: ${data.id}`;whatsapp(msg,true);e.target.reset()}
  function whatsapp(message,encoded=false){const number=(cfg.SALON_WHATSAPP||"").replace(/\D/g,"");if(!number||number.includes("XXXXXXXX"))return notify("Set your salon WhatsApp number in config.js.");window.open(`https://wa.me/${number}?text=${encoded?message:encodeURIComponent(message)}`,"_blank","noopener")}
  async function showAccount(){if(!configured())return notify("Connect Supabase in config.js to use customer accounts.");const {data:{user}}=await client.auth.getUser();if(!user){setAuthMode("login");openModal("authModal");return}const [{data:profile},{data:bookings,error}]=await Promise.all([client.from("profiles").select("full_name,phone").eq("id",user.id).single(),client.from("bookings").select("*").eq("customer_id",user.id).order("created_at",{ascending:false})]);$("profileName").textContent=profile?.full_name||user.email;$("profilePhone").textContent=profile?.phone||user.email;if(error)$("myBookings").textContent=error.message;else $("myBookings").innerHTML=bookings.length?bookings.map(b=>`<div class="booking-item"><div><b>${escapeHtml(b.service_name)}</b><p>${b.appointment_date} · ${escapeHtml(b.time_slot)}</p><small class="hint">Booking #${b.id}</small></div><div style="text-align:right"><b>${money(b.price)}</b><p><span class="pill ${b.status}">${b.status}</span></p><small class="hint">Payment: ${b.payment_status}</small></div></div>`).join(""):"<p class='hint'>No appointments yet. Your next lovely moment is waiting.</p>";openModal("accountModal")}
  async function submitInquiry(e){e.preventDefault();if(!configured())return notify("Connect Supabase in config.js to send enquiries.");const fd=new FormData(e.target);const {error}=await client.from("inquiries").insert({name:fd.get("name"),phone:fd.get("phone"),message:fd.get("message")});if(error)return notify(error.message);e.target.reset();notify("Thank you! Your enquiry has been sent.")}
  function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
  if(configured())client.auth.onAuthStateChange(()=>{});loadServices();
})();