'use strict';

{
  const open = document.getElementById('open');
  const overlay = document.querySelector('.overlay');
  const close = document.getElementById('close');
  const overlayAs = document.querySelectorAll('.overlayA');

  function noScroll(event) {
    event.preventDefault();
  }

  open.addEventListener('click', () => {
    overlay.classList.add('show');
    open.classList.add('hide');
    close.classList.remove('hide');
    document.addEventListener('touchmove', noScroll, { passive: false});
    document.addEventListener('mousewheel', noScroll, { passive: false});
  });

  close.addEventListener('click', () => {
    overlay.classList.remove('show');
    open.classList.remove('hide');
    close.classList.add('hide');
    document.removeEventListener('touchmove', noScroll, { passive: false});
    document.removeEventListener('mousewheel', noScroll, { passive: false});
  });
  
  overlayAs.forEach(overlayA => {
    overlayA.addEventListener('click', () => {
      overlay.classList.remove('show');
      open.classList.remove('hide');
      close.classList.add('hide');
      document.removeEventListener('touchmove', noScroll, { passive: false});
      document.removeEventListener('mousewheel', noScroll, { passive: false});
      });
  });
}

// IntersectionObserver

{
  const targets = document.querySelectorAll('.animate');
  
  function inViewCallback(entries, obs) {
    console.log(entries);

    entries.forEach(entry => {
      if (!entries[0].isIntersecting) {
        return;
      }
  
      entry.target.classList.add('appear');
      obs.unobserve(entry.target);
    });
  }
  
  function onScrollCallback(entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        header.classList.add('scrolled');
        headerA.classList.add('scrolled');
        toTop.classList.add('scrolled');
        pcMenuAs.forEach(pcMenuA => {
          pcMenuA.classList.add('scrolled');
        });
        spmenuOpen.classList.add('scrolled');
        close.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
        headerA.classList.remove('scrolled');
        toTop.classList.remove('scrolled');
        pcMenuAs.forEach(pcMenuA => {
          pcMenuA.classList.remove('scrolled');
        });
        spmenuOpen.classList.remove('scrolled');
        close.classList.remove('scrolled');
      }
    });
  }

  const options = {
    threshold: 0.2,
  };

  const header = document.querySelector('header');
  const headerA = document.querySelector('header a');
  const pcMenuAs = document.querySelectorAll('.pc-menu a');
  const toTop = document.getElementById('to_top');
  const spmenuOpen = document.querySelector('.sp-menu #open');
  const close = document.getElementById('close');

  const inViewObserver = new IntersectionObserver(inViewCallback, options);
  
  targets.forEach(target => {
    inViewObserver.observe(target);
  });

  const onScrollObserver = new IntersectionObserver(onScrollCallback);
  onScrollObserver.observe(document.getElementById('target'));

  toTop.addEventListener('click', e => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

// Slide Show

{
  function play() {
    setTimeout(() => {
      images[currentIndex].classList.remove('current');
      currentIndex++;
      if (currentIndex > images.length - 1) {
        currentIndex = 0;
      }
      images[currentIndex].classList.add('current');
      play();
    }, 5000);
  }

  const images = document.querySelectorAll('#onlineshop img');
  let currentIndex = 0;

  play();
}
