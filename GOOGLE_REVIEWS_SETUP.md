# Упутство за учитавање Google Reviews

## Корак 1: Добијање Google API кључа

1. Иди на [Google Cloud Console](https://console.cloud.google.com/)
2. Креирај нови пројекат или изабери постојећи
3. Иди на **APIs & Services** → **Library**
4. Потражи и омогући **Places API**
5. Иди на **APIs & Services** → **Credentials**
6. Кликни **Create Credentials** → **API Key**
7. Копирај API кључ

## Корак 2: Ограничи API кључ (важно за безбедност)

1. Кликни на свој API кључ
2. У **Application restrictions** изабери **HTTP referrers**
3. Додај свој домен (нпр. `*.krcmagajzlatibor.rs/*`)
4. У **API restrictions** изабери **Restrict key**
5. Штиклирај **Places API**
6. Сачувај

## Корак 3: Пронађи Place ID за Крчму Гај

### Метод 1: Коришћењем Place ID Finder
1. Иди на [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
2. Претражи "Крчма Гај Златибор"
3. Кликни на маркер
4. Копирај Place ID (нпр. `ChIJYRQqGd8GWEQR5JTHGK7X0R0`)

### Метод 2: Коришћењем Google Maps URL
1. Иди на [Google Maps](https://maps.google.com)
2. Претражи "Крчма Гај Златибор"
3. Кликни на локацију
4. Погледај URL - Place ID је после `!1s` (нпр. `!1sChIJYRQqGd8GWEQR5JTHGK7X0R0`)

## Корак 4: Уметни кредендијале у код

### У `index.html` (линија ~730):
```html
<script src="https://maps.googleapis.com/maps/api/js?key=ТВОЈ_API_КЉУЧ&libraries=places"></script>
```

Замени `YOUR_API_KEY` са твојим правим API кључем.

### У `script.js` (функција `loadGoogleReviews`):
```javascript
const placeId = 'ТВОЈ_PLACE_ID'; // Замени са правим Place ID
```

## Корак 5: Тестирај

1. Отвори сајт у браузеру
2. Провери Console (F12) за грешке
3. Testimonials секција треба да учита праве Google рецензије

## Важне напомене

- **API има лимите**: 
  - Free tier: До 100,000 захтева месечно
  - После тога се наплаћује ($17 per 1,000 requests)
  
- **Кеширање**: Сачувај рецензије локално да не трошиш API квоту
  
- **Fallback**: Ако API не ради, сајт аутоматски учитава demo рецензије

## Алтернатива: Elfsight Google Reviews Widget

Ако не желиш да користиш API:

1. Иди на [Elfsight](https://elfsight.com/google-reviews-widget/)
2. Креирај бесплатан налог
3. Генериши widget код
4. Замени testimonials секцију са widget кодом

## Troubleshooting

### "Places API not enabled"
- Провери да ли си омогућио Places API у Google Cloud Console

### "API key not valid"
- Провери да ли си правилно копирао API кључ
- Провери да ли је HTTP referrer правилно подешен

### "REQUEST_DENIED"
- Омогући Billing у Google Cloud (чак и за free tier)
- Провери API restrictions

### "No reviews showing"
- Провери Place ID - можда није тачан
- Провери да Крчма Гај има Google рецензије
- Провери Console за грешке

## Цена

- **Google Places API**: Free до 100k requests/месец
- **Elfsight Widget**: $5/месец (basic plan)
- **Custom backend solution**: Бесплатно али захтева backend

## Препорука

За продукциони сајт, препоручујем:
1. Кеширај рецензије у localStorage (важи 24h)
2. Или крени backend endpoint који свака 24h пулује нове рецензије
3. Тако ћеш минимизовати API захтеве и трошкове
