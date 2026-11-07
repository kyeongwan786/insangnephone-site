export function phoneCard(phone) {
  const price = Number(phone.price).toLocaleString("ko-KR");
  const retailPrice = Number(phone.retailPrice).toLocaleString("ko-KR");
  return `<article class="card phone-card" data-category="${phone.category}"><img class="phone-card__image" src="${phone.image}" alt="" aria-hidden="true" loading="lazy" decoding="async"><div class="phone-card__content"><span class="phone-card__category">${phone.category}</span><h3>${phone.name} <span class="phone-card__storage">${phone.storage}</span></h3><strong class="phone-card__price"><span>${phone.discount}%</span> ${price}원</strong><span class="phone-card__retail">출고가 <s>${retailPrice}원</s></span><span class="phone-card__offer">${phone.offer} · 임시</span></div></article>`;
}

export function planCard(plan) {
  return `<article class="card plan-card" data-category="${plan.network}"><div class="plan-card__top"><span class="plan-network">${plan.network}</span><span class="plan-price">월 ${Number(plan.price).toLocaleString("ko-KR")}원</span></div><h3>${plan.name}</h3><p class="plan-feature">${plan.data}</p><p class="plan-detail">${plan.detail}</p></article>`;
}

export function storeCard(store) {
  return `<article class="card store-card"><img class="store-card__photo ${store.imageClass || ""}" src="${store.image}" alt="${store.name} 매장 전경" loading="lazy" decoding="async"><div class="store-card__body"><h3>${store.name}</h3>${store.address ? `<p>📍　${store.address}</p>` : ""}${store.phone ? `<p>☎　${store.phone}</p>` : ""}${store.hours ? `<p>◷　${store.hours}</p>` : ""}${store.phone ? `<div class="store-card__actions"><a class="button button--yellow" href="tel:${store.phone.replaceAll("-", "")}">상담 전화 ›</a></div>` : ""}</div></article>`;
}

export function reviewCard(review) {
  return `<article class="card review-card"><div class="review-card__top"><span><span class="stars">★★★★★</span>　<b>${review.rating}</b></span><time>${review.date}</time></div><div class="review-card__meta">✔ ${review.branch} ${review.title}</div><p>${review.body}</p></article>`;
}
