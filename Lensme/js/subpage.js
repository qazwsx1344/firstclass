/* Shared mobile navigation for Lensme subpages */
(() => {
 const menuButton=document.querySelector('.mobile-menu-button');
 const navigation=document.querySelector('.primary-navigation');
 if(!menuButton||!navigation)return;
 menuButton.addEventListener('click',()=>{
  const expanded=menuButton.getAttribute('aria-expanded')==='true';
  menuButton.setAttribute('aria-expanded',String(!expanded));
  navigation.classList.toggle('is-open',!expanded);
 });
 const items=Array.from(document.querySelectorAll('.nav-item'));
 items.forEach(item=>{
  const link=item.querySelector(':scope > a');
  const submenu=item.querySelector('.nav-submenu');
  if(!link||!submenu)return;
  link.addEventListener('click',event=>{
   if(!window.matchMedia('(max-width: 1024px)').matches)return;
   event.preventDefault();
   const expanded=link.getAttribute('aria-expanded')==='true';
   items.forEach(other=>{
    const otherLink=other.querySelector(':scope > a');
    if(otherLink){otherLink.setAttribute('aria-expanded','false');other.classList.remove('is-expanded')}
   });
   link.setAttribute('aria-expanded',String(!expanded));
   item.classList.toggle('is-expanded',!expanded);
  });
 });
 window.addEventListener('resize',()=>{
  if(window.matchMedia('(min-width: 1025px)').matches)items.forEach(item=>{
   item.classList.remove('is-expanded');
   const link=item.querySelector(':scope > a');
   if(link)link.setAttribute('aria-expanded','false');
  });
 });
 document.addEventListener('click',event=>{
  const placeholder=event.target.closest('a[href="#"]');
  if(placeholder)event.preventDefault();
 });
})();