// ===== 모바일 메뉴 토글 =====
const menuToggle = document.getElementById('menu-toggle')
const mobileMenu = document.getElementById('mobile-menu')

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden')
  const isOpen = !mobileMenu.classList.contains('hidden')
  menuToggle.setAttribute('aria-expanded', String(isOpen))
  menuToggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기')
})

// 모바일 메뉴에서 링크를 클릭하면 메뉴를 자동으로 닫아줍니다
mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden')
    menuToggle.setAttribute('aria-expanded', 'false')
    menuToggle.setAttribute('aria-label', '메뉴 열기')
  })
})

// ===== 스크롤 시 섹션이 서서히 나타나는 애니메이션 =====
const sections = document.querySelectorAll('.fade-in-section')

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible')
    }
  })
}, { threshold: 0.15 })

sections.forEach((section) => sectionObserver.observe(section))

// ===== 다크모드 토글 =====
// 선택한 테마는 localStorage에 저장해서, 새로고침하거나 다시 방문해도 유지됩니다.
// 저장된 값이 없으면 시스템(OS) 설정을 따릅니다.
const themeToggleButton = document.getElementById('theme-toggle')
const themeToggleIcon = document.getElementById('theme-toggle-icon')

function applyTheme(isDark) {
  document.documentElement.classList.toggle('dark', isDark)
  themeToggleIcon.textContent = isDark ? '☀️' : '🌙'
  themeToggleButton.setAttribute('aria-label', isDark ? '라이트모드 전환' : '다크모드 전환')
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(savedTheme ? savedTheme === 'dark' : prefersDark)
}

function handleThemeToggle() {
  const isDark = !document.documentElement.classList.contains('dark')
  applyTheme(isDark)
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
}

initTheme()
themeToggleButton.addEventListener('click', handleThemeToggle)
