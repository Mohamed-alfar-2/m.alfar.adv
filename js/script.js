document.addEventListener('DOMContentLoaded', function() {
  // شاشة التحميل
  setTimeout(function() {
      document.querySelector('.splash-screen').style.display = 'none';
  }, 5000);

  // تحديث سنة الفوتر
  document.getElementById('year').textContent = new Date().getFullYear();

  // فتح القائمة الجانبية
const navToggle = document.querySelector('.nav-toggle');
const sidebar = document.querySelector('.sidebar');
const sidebarClose = document.querySelector('.sidebar-close');
const body = document.body;

navToggle.addEventListener('click', function() {
  sidebar.classList.add('active');
  body.style.overflow = 'hidden';
});

sidebarClose.addEventListener('click', function() {
  sidebar.classList.remove('active');
  body.style.overflow = 'auto';
});

// إغلاق القائمة عند النقر على رابط
document.querySelectorAll('.sidebar-nav a').forEach(link => {
  link.addEventListener('click', function() {
    sidebar.classList.remove('active');
    body.style.overflow = 'auto';
  });
});


 

  // إغلاق القائمة عند التمرير
  window.addEventListener('scroll', function() {
      if (sidebar.classList.contains('active')) {
          sidebar.classList.remove('active');
          body.style.overflow = 'auto';
      }
  });

  // تغيير الوضع الليلي
  const themeToggle = document.querySelector('.theme-toggle');

  themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      
      if (document.body.classList.contains('dark-mode')) {
          themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
          localStorage.setItem('theme', 'dark');
      } else {
          themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
          localStorage.setItem('theme', 'light');
      }
  });

  // تحميل الوضع المحفوظ
  if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // فلترة الأعمال
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          // إزالة النشط من جميع الأزرار
          filterBtns.forEach(btn => btn.classList.remove('active'));
          // إضافة النشط للزر المحدد
          this.classList.add('active');
          
          const filter = this.getAttribute('data-filter');
          
          portfolioItems.forEach(item => {
              if (filter === 'all' || item.getAttribute('data-category') === filter) {
                  item.style.display = 'block';
              } else {
                  item.style.display = 'none';
              }
          });
      });
  });

  // تأثيرات التمرير
  const sections = document.querySelectorAll('.section-hidden');
  const backToTop = document.querySelector('.back-to-top');

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('section-show');
          }
      });
  }, {
      threshold: 0.1
  });

  sections.forEach(section => {
      observer.observe(section);
  });

  // تأثيرات الشريط المهارات
  const skillBars = document.querySelectorAll('.skill-progress');

  function animateSkills() {
      skillBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
              bar.style.width = width;
          }, 100);
      });
  }

  // تنشيط تأثيرات المهارات عند ظهورها
  const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              animateSkills();
              skillsObserver.unobserve(entry.target);
          }
      });
  }, {
      threshold: 0.5
  });

  const skillsSection = document.querySelector('.skills');
  if (skillsSection) {
      skillsObserver.observe(skillsSection);
  }

  // تأثيرات الأكواد العائمة
  const codeSnippets = document.querySelectorAll('.code-snippet');

  codeSnippets.forEach(snippet => {
      snippet.addEventListener('mouseenter', () => {
          snippet.style.animation = 'none';
          snippet.style.opacity = '1';
      });
      
      snippet.addEventListener('mouseleave', () => {
          snippet.style.animation = '';
      });
  });

  // تنعيم التمرير للروابط
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
              
              // إغلاق القائمة الجانبية إذا كانت مفتوحة
              sidebar.classList.remove('active');
              body.style.overflow = 'auto';
          }
      });
  });

  // تأثير التمرير على الهيدر
  window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
          document.querySelector('header').classList.add('header-scrolled');
      } else {
          document.querySelector('header').classList.remove('header-scrolled');
      }

      // زر العودة للأعلى
      if (window.scrollY > 300) {
          backToTop.classList.add('active');
      } else {
          backToTop.classList.remove('active');
      }
  });

  // زر العودة للأعلى
  backToTop.addEventListener('click', function() {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });

  // تعديل العناصر حسب حجم الشاشة
  function adjustElements() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // تعديل ارتفاع الأقسام
      if (window.innerWidth < 768) {
          document.querySelectorAll('section').forEach(section => {
              section.style.minHeight = 'auto';
          });
      }
  }

  window.addEventListener('resize', adjustElements);
  adjustElements();

  // تأثير الكتابة على العنوان
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
      const text = heroTitle.textContent;
      heroTitle.textContent = '';
      
      let i = 0;
      const typingEffect = setInterval(() => {
          if (i < text.length) {
              heroTitle.textContent += text.charAt(i);
              i++;
          } else {
              clearInterval(typingEffect);
          }
      }, 100);
  }

  // تأثير تحميل الصفحة
  window.addEventListener('load', function() {
      document.body.classList.add('loaded');
  });

  // إرسال النموذج
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // يمكنك هنا إضافة كود إرسال النموذج
          alert('تم استلام رسالتك بنجاح! سأتواصل معك قريبًا.');
          this.reset();
      });
  }

  // تأثيرات خاصة للبطاقات
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
          const x = e.offsetX;
          const y = e.offsetY;
          const centerX = this.offsetWidth / 2;
          const centerY = this.offsetHeight / 2;
          
          const angleX = (y - centerY) / 10;
          const angleY = (centerX - x) / 10;
          
          this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
      });
      
      card.addEventListener('mouseleave', function() {
          this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
  });

  // تأثيرات العائمة للعناصر
  const floatingElements = document.querySelectorAll('.hero-image, .about-image, .service-card');
  floatingElements.forEach(el => {
      el.addEventListener('mousemove', function(e) {
          const x = e.offsetX;
          const y = e.offsetY;
          const centerX = this.offsetWidth / 2;
          const centerY = this.offsetHeight / 2;
          
          const moveX = (x - centerX) / 20;
          const moveY = (y - centerY) / 20;
          
          this.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
      
      el.addEventListener('mouseleave', function() {
          this.style.transform = 'translate(0, 0)';
      });
  });

  // تأثيرات النصوص
  const textElements = document.querySelectorAll('.hero-text, .about-text');
  textElements.forEach(text => {
      text.style.opacity = '0';
      text.style.transform = 'translateY(20px)';
      text.style.transition = 'all 1s ease';
      
      setTimeout(() => {
          text.style.opacity = '1';
          text.style.transform = 'translateY(0)';
      }, 500);
  });

  // تأثيرات الأيقونات
  const icons = document.querySelectorAll('.service-icon, .contact-icon');
  icons.forEach(icon => {
      icon.style.transform = 'scale(0)';
      icon.style.transition = 'transform 0.5s ease';
      
      setTimeout(() => {
          icon.style.transform = 'scale(1)';
      }, 300);
  });
});  
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarClose = document.querySelector('.sidebar-close');
    const body = document.body;
  
    if (navToggle && sidebar && sidebarClose) {
      navToggle.addEventListener('click', function () {
        sidebar.classList.add('active');
        body.style.overflow = 'hidden';
      });
  
      sidebarClose.addEventListener('click', function () {
        sidebar.classList.remove('active');
        body.style.overflow = 'auto';
      });
  
      document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', function () {
          sidebar.classList.remove('active');
          body.style.overflow = 'auto';
        });
      });
    }
  });
  const themeToggle = document.querySelector('.theme-toggle');

  // تفعيل الوضع بناءً على الذاكرة
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  // زر التبديل
  themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
  
    if (document.body.classList.contains('dark-mode')) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'light');
    }
  });
  const darkToggle = document.getElementById('darkModeToggle');

  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    darkToggle.checked = true;
  }
  
  darkToggle.addEventListener('change', function () {
    if (this.checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  });
  document.addEventListener('DOMContentLoaded', function () {
    const darkToggle = document.getElementById('darkModeToggle');
  
    // تحميل الوضع المحفوظ من localStorage
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
      if (darkToggle) darkToggle.checked = true;
    }
  
    // عند التغيير
    if (darkToggle) {
      darkToggle.addEventListener('change', function () {
        if (this.checked) {
          document.body.classList.add('dark-mode');
          localStorage.setItem('theme', 'dark');
        } else {
          document.body.classList.remove('dark-mode');
          localStorage.setItem('theme', 'light');
        }
      });
    }
  });
  document.addEventListener('DOMContentLoaded', function () {
    const darkToggle = document.getElementById('darkModeToggle');
  
    // تحميل الوضع المحفوظ
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
      if (darkToggle) darkToggle.checked = true;
    }
  
    // لما يغيّر الزر
    if (darkToggle) {
      darkToggle.addEventListener('change', function () {
        if (this.checked) {
          document.body.classList.add('dark-mode');
          localStorage.setItem('theme', 'dark');
        } else {
          document.body.classList.remove('dark-mode');
          localStorage.setItem('theme', 'light');
        }
      });
    }
  });
     
  document.getElementById('darkModeSwitch').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    // حفظ التفضيل
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});

// تحميل التفضيل المحفوظ
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
}
console.log('LocalStorage supported:', !!localStorage); 
function detectShareMethod() {
  const ua = navigator.userAgent;
  
  if (navigator.share) {
      return 'native';
  } else if (ua.match(/WhatsApp/i)) {
      return 'whatsapp';
  } else if (ua.match(/Facebook/i)) {
      return 'facebook';
  } else if (ua.match(/Twitter/i)) {
      return 'twitter';
  } else {
      return 'clipboard';
  }
}

function shareLocation(branchName, mapUrl) {
  const method = detectShareMethod();
  const text = `موقع ${branchName}: ${mapUrl}`;

  switch(method) {
      case 'native':
          navigator.share({ title: branchName, text: text, url: mapUrl });
          break;
      case 'whatsapp':
          window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
          break;
      case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(mapUrl)}`);
          break;
      case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
          break;
      default:
          copyToClipboard(mapUrl).then(success => {
              alert(success ? 'تم نسخ الرابط!' : 'انسخ الرابط: ' + mapUrl);
          });
  }
} 
// دالة نسخ النص
function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
      .then(() => alert('تم نسخ العنوان: ' + text))
      .catch(err => console.error('فشل النسخ: ', err));
}

// دالة مشاركة الموقع
function shareLocation(branchName, locationUrl) {
  if (navigator.share) {
      navigator.share({
          title: branchName,
          text: 'عنوان الفرع: ' + branchName,
          url: locationUrl
      }).catch(err => console.error('Error sharing:', err));
  } else {
      // Fallback for desktop
      prompt('انسخ رابط الموقع:', locationUrl);
  }
} 
// يمكنك إضافة أي تفاعلات تريدها هنا
document.addEventListener('DOMContentLoaded', function() {
    // مثال: إضافة تأثير عند الظهور
    const branchCards = document.querySelectorAll('.branch-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
  
    branchCards.forEach(card => {
      card.style.opacity = 0;
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.5s ease-out';
      observer.observe(card);
    });
  }); 
  