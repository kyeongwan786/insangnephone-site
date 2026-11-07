export function brand(variant = "header") {
  return `<a class="brand brand--${variant}" href="#top" aria-label="인생네폰 홈"><img src="./assets/home/brand-logo.png" alt="인생네폰"></a>`;
}

export function siteHeader() {
  const links = [["top", "HOME"], ["phones", "휴대폰 비교"], ["plans", "요금제 비교"], ["events", "이벤트"], ["stores", "매장 찾기"], ["reviews", "실제 고객 후기"]];
  const primaryLinks = links.slice(1);
  return `<header class="site-header"><div class="site-header__top container">${brand()}<p class="site-header__message">휴대폰부터 요금제까지, 조건을 한눈에 비교하세요.</p><a class="site-header__contact" href="#stores">매장 상담 <span aria-hidden="true">›</span></a></div><nav class="site-nav container" aria-label="주요 메뉴">${primaryLinks.map(([id, label]) => `<a href="#${id}">${label}</a>`).join("")}</nav></header>`;
}

export function siteFooter() {
  return `<footer class="site-footer"><div class="container site-footer__inner">${brand("footer")}<div class="site-footer__info"><b>회사소개　 |　 이용약관　 |　 개인정보처리방침</b><br>상호명: 인생네폰　 |　 대표자: 김인성　 |　 사업자등록번호: 000-00-00000<br>주소: 대구광역시 북구 고성북로 50-21　 |　 고객센터: 053-123-4567</div></div></footer>`;
}

export function sectionTitle(title, description = "") {
  return `<div class="section-heading"><h2>${title}</h2></div>${description ? `<p class="section-lead">${description}</p>` : ""}`;
}

export function button(label, href = "#", tone = "") {
  return `<a class="button ${tone ? `button--${tone}` : ""}" href="${href}">${label}</a>`;
}
