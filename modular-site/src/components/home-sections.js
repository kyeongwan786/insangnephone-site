import { button, sectionTitle } from "./common.js";
import { phoneCard, planCard, reviewCard } from "./cards.js";
import { icon } from "./icons.js";

const filters = (labels, ariaLabel) => `<div class="filter-pills" role="group" aria-label="${ariaLabel}">${labels.map((label, i) => `<button class="filter-pill ${i === 0 ? "is-active" : ""}" type="button">${label}</button>`).join("")}</div>`;
const carouselCards = (items, renderCard, batchSize = 5) => `${items.slice(0, batchSize).map(renderCard).join("")}${items.length > batchSize ? `<template data-carousel-deferred>${items.slice(batchSize).map(renderCard).join("")}</template>` : ""}`;

export function heroSection() {
  const slides = [
    { key: "galaxy", label: "갤럭시", eyebrow: "GALAXY · 인기 모델 비교", title: "나에게 맞는 갤럭시,", highlight: "조건까지 투명하게", description: "최신 모델부터 인기 기종까지\n가격과 혜택을 한눈에 비교하세요.", primary: "갤럭시 비교하기", primaryHref: "#phones", secondary: "매장 상담", secondaryHref: "#stores", image: "banner-galaxy.webp" },
    { key: "iphone", label: "아이폰", eyebrow: "iPHONE · 인기 모델 비교", title: "기다리던 아이폰,", highlight: "좋은 조건으로 만나세요", description: "다양한 아이폰 모델과 개통 혜택을\n내 기준에 맞춰 확인해보세요.", primary: "아이폰 비교하기", primaryHref: "#phones", secondary: "매장 상담", secondaryHref: "#stores", image: "banner-iphone.webp" },
    { key: "internet", label: "인터넷 · 정수기", eyebrow: "INTERNET · TV · LIVING", title: "인터넷·TV·정수기까지,", highlight: "한 번에 맞춤 상담", description: "통신부터 생활가전까지 필요한 조건을\n인생네폰에서 편하게 상담받으세요.", primary: "상담 예약하기", primaryHref: "#stores", secondary: "혜택 둘러보기", secondaryHref: "#events", image: "banner-internet.webp" },
  ];
  return `<section class="hero container" aria-label="인생네폰 주요 혜택"><div class="hero__slides" data-hero-track>${slides.map((slide, index) => `<article class="hero__slide hero__slide--${slide.key} ${index === 0 ? "is-active" : ""}" data-hero-slide aria-hidden="${index !== 0}" ${index !== 0 ? "inert" : ""}><img class="hero__image" src="./assets/home/${slide.image}" alt="" aria-hidden="true"><div class="hero__copy"><span class="hero__eyebrow">${slide.eyebrow}</span><h1>${slide.title}<br><em>${slide.highlight}</em></h1><p>${slide.description}</p><div class="hero__actions">${button(`${slide.primary}　›`, slide.primaryHref, "yellow")}${button(`${slide.secondary}　›`, slide.secondaryHref, "dark")}</div></div></article>`).join("")}</div><div class="hero__pagination" role="group" aria-label="배너 선택">${slides.map((slide, index) => `<button class="hero__dot ${index === 0 ? "is-active" : ""}" type="button" data-hero-to="${index}" aria-label="${slide.label} 배너 보기" aria-pressed="${index === 0}"></button>`).join("")}</div></section>`;
}

export function shortcutSection() {
  const links = [["휴대폰 비교", "phone", "phones"], ["요금제 비교", "plan", "plans"], ["이벤트", "gift", "events"], ["매장 찾기", "store", "stores"], ["실제 고객 후기", "chat", "reviews"]];
  return `<nav class="quick-links container" aria-label="바로가기">${links.map(([label, glyph, href]) => `<a class="quick-link" href="#${href}"><span class="quick-link__icon">${icon(glyph)}</span><span>${label}</span></a>`).join("")}</nav>`;
}

export function phoneSection(phones) {
  return `<section class="section section--muted product-section" id="phones"><div class="container"><div class="section-top"><div>${sectionTitle("휴대폰 비교", "인기 모델을 길게 둘러보고 가입 조건에 맞춰 비교하세요.")}</div><div class="section-top__tools">${filters(["전체", "갤럭시", "아이폰"], "기종 필터")}<div class="carousel-controls" aria-label="휴대폰 목록 넘기기"><button class="carousel-arrow" type="button" data-carousel-prev aria-label="이전 휴대폰">‹</button><button class="carousel-arrow" type="button" data-carousel-next aria-label="다음 휴대폰">›</button></div></div></div><div class="horizontal-rail" data-carousel aria-label="휴대폰 목록"><div class="horizontal-rail__track phone-rail__track">${carouselCards(phones, phoneCard)}</div></div><p class="phone-note">할인율과 단말 가격은 화면 구성용 임시 데이터입니다.</p></div></section>`;
}

export function planSection(plans) {
  return `<section class="section plan-section" id="plans"><div class="container"><div class="section-top"><div>${sectionTitle("요금제 비교", "데이터와 월정액을 한 줄 카드로 보고 통신사별로 비교하세요.")}</div><div class="section-top__tools">${filters(["전체", "SKT", "KT", "LG U+"], "통신사 필터")}<div class="carousel-controls" aria-label="요금제 목록 넘기기"><button class="carousel-arrow" type="button" data-carousel-prev aria-label="이전 요금제">‹</button><button class="carousel-arrow" type="button" data-carousel-next aria-label="다음 요금제">›</button></div></div></div><div class="horizontal-rail" data-carousel aria-label="요금제 목록"><div class="horizontal-rail__track plan-rail__track">${carouselCards(plans, planCard)}</div></div><p class="plan-note">월정액 기준이며, 약정·결합 할인은 적용 전 금액입니다.</p></div></section>`;
}

export function comparisonSection() {
  return `<section class="section comparison-section" aria-labelledby="comparison-title"><div class="container comparison-section__layout"><div class="comparison-section__copy"><span class="comparison-section__eyebrow">PRICE COMPARISON</span><h2 id="comparison-title">판매 조건이 정말 같은지<br>꼭 확인하세요</h2><div class="comparison-section__rule"></div><p>휴대폰 가격은 지원금만으로 결정되지 않습니다. 요금제와 부가서비스, 중고폰 반납, 제휴카드 조건까지 함께 살펴야 실제 구매 부담을 비교할 수 있습니다.</p><p class="comparison-section__promise">인생네폰은 복잡한 조건을 쉽게 확인하고, 내게 맞는 선택을 할 수 있도록 안내합니다.</p></div><figure class="comparison-section__visual"><img src="./assets/home/price-comparison.png" alt="일반 매장과 인생네폰의 휴대폰 판매 조건 비교 예시" loading="lazy" decoding="async"><figcaption>※ 이미지의 기종과 금액은 이해를 돕기 위한 예시입니다.</figcaption></figure></div></section>`;
}

export function eventSection() {
  return `<section class="section section--muted event-section" id="events"><div class="container">${sectionTitle("진행 중인 이벤트", "지금 인생네폰에서만 만날 수 있는 특별한 혜택을 확인하세요.")}<div class="event-banner"><div class="event-banner__copy"><h3>신규 개통 고객<br><em>혜택 이벤트</em></h3><p>지금 인생네폰에서 휴대폰 개통하면<br>액세서리 패키지 또는 추가 혜택을 드려요!</p>${button("이벤트 자세히 보기　›", "#events", "yellow")}</div><img src="./assets/home/event-gift.png" alt="노란 리본을 묶은 선물 상자"></div></div></section>`;
}

export function storeSection(stores) {
  const regions = ["서울", "대구", "부산"]
    .map((name) => ({ name, count: stores.filter((store) => store.region === name).length }))
    .filter((region) => region.count > 0);
  const regionPositions = { "서울": [57, 28], "대구": [65, 61], "부산": [71, 76] };
  const regionButton = (name, count, all = false) => `<button class="store-region-filter ${all ? "is-active" : ""}" type="button" data-store-filter="${name}" aria-pressed="${all}">${name}<span>${count}</span></button>`;
  const mapPins = regions.map(({ name, count }) => {
    const [x, y] = regionPositions[name] || [50, 50];
    return `<button class="store-schematic-pin" type="button" data-region-map="${name}" style="--pin-x:${x}%;--pin-y:${y}%" aria-label="${name} 지역 매장 ${count}곳 보기" aria-pressed="false"><span class="store-schematic-pin__dot"></span><span class="store-schematic-pin__label"><strong>${name}</strong><small>${count}개 매장</small></span></button>`;
  }).join("");
  const storeRows = stores.map((store, index) => {
    const mapUrl = `https://map.naver.com/p/search/${encodeURIComponent(store.address)}`;
    return `<article class="store-listing" data-store-card data-region="${store.region}"><img src="${store.image}" alt="${store.name} 전경" loading="lazy" decoding="async"><div class="store-listing__details"><span class="store-listing__region">${store.region}</span><h3>${store.name}</h3><p data-store-address hidden>${store.address}</p><div class="store-listing__actions"><button type="button" data-store-open="${index}" data-store-name="${store.name}" data-store-address="${store.address}" aria-expanded="false">주소 보기 <span aria-hidden="true">⌄</span></button><a href="${mapUrl}" target="_blank" rel="noopener noreferrer">지도 열기 ↗</a></div></div></article>`;
  }).join("");
  return `<section class="section stores-section" id="stores"><div class="container"><div class="stores-section__top"><div class="stores-section__copy">${sectionTitle("가까운 매장에서 상담받기", "지도에서 지역을 고르면 오른쪽에 매장이 표시됩니다.")}</div><span class="stores-section__count">${stores.length}개 매장 · ${regions.length}개 지역</span></div><div class="store-finder" data-store-finder><div class="store-map-card"><div class="store-map-card__heading"><div><span>STORE GUIDE</span><h3 data-store-map-title>전국 매장 안내</h3></div><span class="store-map-card__live"><i></i> 지역별 매장</span></div><div class="store-map-stage" data-store-map-stage><svg class="store-schematic-map" viewBox="0 0 420 500" role="img" aria-label="서울, 대구, 부산의 매장 위치를 나타낸 대한민국 지도 일러스트" preserveAspectRatio="xMidYMid meet"><defs><pattern id="store-map-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M 28 0 L 0 0 0 28" fill="none" stroke="#dce7e8" stroke-width="1" opacity=".52"/></pattern><linearGradient id="store-land-fill" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f9fbf8"/><stop offset="1" stop-color="#e4efed"/></linearGradient></defs><rect width="420" height="500" fill="url(#store-map-grid)"/><path class="store-map-land" d="M248 31c-22-2-44 8-59 23-12 12-15 30-31 41-16 10-32 14-39 31-7 16-3 31-15 47-10 13-28 21-32 38-4 17 10 31 10 47 1 18-14 33-8 49 6 15 25 20 33 34 9 16 10 36 23 48 12 11 30 10 42 22 14 13 22 36 41 38 18 2 28-19 43-28 14-9 33-8 44-21 12-14 8-34 17-49 9-15 29-22 33-39 4-17-8-32-7-49 2-18 18-34 15-51-3-16-22-25-25-41-4-17 10-34 6-50-4-17-23-25-28-41-5-15 0-32-10-45-10-14-31-17-53-19z"/><path class="store-map-road" d="M206 91c21 35 19 65 42 91 20 22 14 48 31 73 15 23 5 47 22 74M147 177c28 8 54 5 77 18 20 11 26 28 48 36M122 272c28-10 53-8 72 4 19 13 25 37 47 50M187 105c-4 37-14 53-40 72M250 253c-22 19-31 40-29 69"/><path class="store-map-route" d="M201 146C220 185 240 232 268 305S286 358 296 381"/></svg><span class="store-map-stage__caption"><strong>인생네폰</strong><span>가까운 매장을 찾아보세요</span></span>${mapPins}</div><div class="store-map-card__footer"><span><i class="store-map-legend-dot"></i> 지역을 선택해 매장 확인</span><span>서울 · 대구 · 부산</span></div></div><div class="store-directory"><div class="store-directory__heading"><div><span>BRANCHES</span><h3 data-store-list-heading>전국 매장 <small data-store-visible-count>${stores.length}</small></h3><p data-store-list-hint>지역을 선택해 매장을 좁히고, 주소 보기로 상세 주소를 확인하세요.</p></div></div><div class="store-region-filters" role="group" aria-label="매장 지역 선택">${regionButton("전체", stores.length, true)}${regions.map((region) => regionButton(region.name, region.count)).join("")}</div><div class="store-directory__list" data-store-list>${storeRows}</div></div></div></div></section>`;
}

export function reviewSection(reviews) {
  return `<section class="section section--muted reviews-section" id="reviews"><div class="container">${sectionTitle("실제 고객 후기", "인생네폰을 이용하신 고객님들의 솔직한 후기를 확인해보세요.")}<div class="card-grid">${reviews.map(reviewCard).join("")}</div>${button("후기 전체 보기　›", "#reviews", "yellow")}</div></section>`;
}
