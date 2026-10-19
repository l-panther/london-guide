// ---------- hero skyline parallax ----------
document.addEventListener('scroll', updateParallax, { passive: true });
function updateParallax() {
  document.querySelectorAll('.hero-sky').forEach((el) => {
    const rect = el.closest('.hero').getBoundingClientRect();
    const offset = Math.min(Math.max(-rect.top, -240), 240);
    el.style.transform = `translateY(${offset * 0.18}px)`;
  });
}
updateParallax();

// ---------- things-to-do activity data ----------
const ACTIVITIES = {
  zoo: {
    title: 'London Zoo', color: '#4B5D3A',
    desc: "Explore one of the world's oldest zoos, home to over 750 incredible species. From immersive habitats to interactive exhibits, it offers an unforgettable day out for visitors of all ages.",
    hours: 'Monday to Friday', hoursDetail: '10:00 to 18:00 · Last admission 17:00',
    child: '£18.50', adult: '£25.50',
    link: '#', linkLabel: 'Visit London Zoo website for more information',
  },
  bus: {
    title: 'Bus Tour', color: '#8B1E2B',
    desc: 'Hop aboard an open-top double-decker for a guided tour past Big Ben, Buckingham Palace, and the Tower of London — with hop-on hop-off stops at every major landmark.',
    hours: 'Daily', hoursDetail: '09:00 to 19:00 · Buses every 15 minutes',
    child: '£10.00', adult: '£15.00',
    link: '#', linkLabel: 'Visit the Bus Tour website for more information',
  },
  eye: {
    title: 'London Eye', color: '#5B3A6B',
    desc: 'Rise 135 metres above the Thames for sweeping views across the city skyline. Each capsule ride lasts around 30 minutes — best enjoyed at sunset.',
    hours: 'Daily', hoursDetail: '10:00 to 20:30 · Last boarding 19:45',
    child: '£12.50', adult: '£16.50',
    link: '#', linkLabel: 'Visit the London Eye website for more information',
  },
  aquarium: {
    title: 'Aquarium', color: '#2E4E6B',
    desc: 'Wander through immersive glass tunnels and glowing tanks home to sharks, rays and jellyfish, with interactive exhibits designed for younger visitors.',
    hours: 'Monday to Sunday', hoursDetail: '10:00 to 18:00 · Last admission 17:00',
    child: '£11.00', adult: '£15.00',
    link: '#', linkLabel: 'Visit the Aquarium website for more information',
  },
  museum: {
    title: 'Museum', color: '#5C5C5C',
    desc: 'Free to enter, this museum houses centuries of art, history and culture across dozens of galleries — a full day out without spending a penny.',
    hours: 'Daily', hoursDetail: '10:00 to 17:30 · Fridays until 20:30',
    child: 'Free', adult: 'Free',
    link: '#', linkLabel: 'Visit the Museum website for more information',
  },
};

const activityModal = document.getElementById('activityModal');
if (activityModal) {
  activityModal.addEventListener('show.bs.modal', (event) => {
    const key = event.relatedTarget.dataset.activity;
    const a = ACTIVITIES[key];
    if (!a) return;
    activityModal.querySelector('.modal-title').textContent = a.title;
    activityModal.querySelector('.modal-desc').textContent = a.desc;
    activityModal.querySelector('.modal-art').style.background = a.color;
    const band = activityModal.querySelector('.info-band');
    band.style.background = a.color;
    activityModal.querySelector('.hours-title').textContent = a.hours;
    activityModal.querySelector('.hours-detail').textContent = a.hoursDetail;
    activityModal.querySelector('.price-child').textContent = a.child;
    activityModal.querySelector('.price-adult').textContent = a.adult;
    const link = activityModal.querySelector('.info-link');
    link.href = a.link;
    link.textContent = a.linkLabel;
  });
}
