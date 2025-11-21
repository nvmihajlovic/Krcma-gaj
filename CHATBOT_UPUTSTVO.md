# 💬 Chatbot - Uputstvo za korišćenje

## 📌 Trenutno stanje

Chatbot je trenutno **FAQ sistem sa automatskim odgovorima**. On **NE omogućava** direktnu komunikaciju sa posetiocima sajta u realnom vremenu.

### Šta chatbot može:
- ✅ Automatski odgovara na brze akcije (Meni, Rezervacija, Kontakt)
- ✅ Prikazuje kontakt informacije
- ✅ Usmerava posetioce na relevantne sekcije sajta
- ✅ Podržava srpski i engleski jezik
- ✅ Prikazuje povremene notifikacije

### Šta chatbot NE može:
- ❌ Direktna komunikacija sa vlasnikom sajta
- ❌ Primanje poruka u realnom vremenu
- ❌ Slanje email notifikacija
- ❌ Čuvanje istorije razgovora

---

## 🚀 PREPORUKA: Tawk.to (BESPLATNO!)

Za **PRAVU** komunikaciju sa posetiocima, preporučujem **Tawk.to** - potpuno besplatna live chat platforma.

### Zašto Tawk.to?
- ✅ **Potpuno besplatan** (bez skrivenih troškova)
- ✅ Desktop i mobilna aplikacija
- ✅ Email notifikacije kada dođe poruka
- ✅ Snimanje istorije razgovora
- ✅ Podržava više operatera
- ✅ Podržava 45+ jezika
- ✅ Widget se može prilagoditi bojama sajta

---

## 📖 Kako dodati Tawk.to (korak po korak)

### Korak 1: Registracija
1. Idite na [https://www.tawk.to/](https://www.tawk.to/)
2. Kliknite na **"Sign Up Free"**
3. Unesite:
   - Email adresu
   - Lozinku
   - Ime sajta: **Krčma Gaj**
4. Potvrdite email

### Korak 2: Kreirajte Property
1. U dashboard-u kliknite **"Add Property"**
2. Unesite:
   - Property name: **Krčma Gaj**
   - Website URL: **https://vašadresa.com**
3. Sačuvajte

### Korak 3: Prilagodite Widget
1. Idite na **Administration → Channels → Chat Widget**
2. **Izgled (Appearance):**
   - Widget Color: `#d97706` (narandžasta - summer tema)
   - Widget Position: **Bottom Left** (da se ne sudara sa back-to-top)
3. **Offline Behavior:**
   - Omogućite "Show offline form" da primite poruke i kada niste dostupni
4. **Language:** Izaberite **Serbian**

### Korak 4: Instalirajte kod
1. Idite na **Administration → Channels → Chat Widget**
2. Skrolujte do **"Direct Chat Link"** i kopirajte **JavaScript kod**
3. Izgleda ovako:

```html
<!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/VAŠ_ID/default';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script-->
```

### Korak 5: Dodajte kod u index.html

Otvorite `index.html` i nalepite Tawk.to kod **PRE** zatvarajućeg `</body>` tag-a:

```html
    <script src="script.js?v=15"></script>
    <script src="enhancements.js?v=3"></script>
    <script src="features.js?v=1"></script>
    
    <!--Start of Tawk.to Script-->
    <script type="text/javascript">
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/VAŠ_ID/default';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
    })();
    </script>
    <!--End of Tawk.to Script-->
    
</body>
</html>
```

### Korak 6: Testirajte
1. Osvežite sajt
2. Videćete Tawk.to widget u donjem levom uglu
3. Pošaljite test poruku
4. Poruka će vam stići u Tawk.to dashboard i na email

### Korak 7: Preuzmite aplikaciju
- **Desktop:** [https://www.tawk.to/downloads/](https://www.tawk.to/downloads/)
- **Android:** Google Play Store
- **iOS:** App Store

---

## 🔧 Opcije: Uklonite trenutni chatbot

Ako želite da koristite **SAMO Tawk.to** (preporuka), uklonite postojeći chatbot:

### Metod 1: Sakrijte postojeći chatbot (CSS)
Dodajte u `chatbot.css`:
```css
.chatbot-container {
    display: none !important;
}
```

### Metod 2: Obrišite chatbot (kompletno)
Obrišite iz `index.html`:
```html
<!-- Chatbot Widget -->
<div class="chatbot-container">
    ...
</div>
```

I uklonite linkove:
```html
<link rel="stylesheet" href="chatbot.css?v=1">
<script src="chatbot.js"></script>
```

---

## 🌟 Alternativne opcije (ako ne želite Tawk.to)

### 1. Tidio (Freemium)
- **URL:** [https://www.tidio.com/](https://www.tidio.com/)
- **Besplatno:** Do 50 razgovora mesečno
- **Prednosti:** Chatbot + live chat, integracija sa Messengerom

### 2. JivoChat (Besplatna proba)
- **URL:** [https://www.jivochat.com/](https://www.jivochat.com/)
- **Besplatno:** 14 dana probni period
- **Prednosti:** Multi-kanal (chat, telefon, email, Facebook)

### 3. Facebook Messenger Plugin (Besplatno)
- **URL:** [https://developers.facebook.com/docs/messenger-platform/discovery/customer-chat-plugin/](https://developers.facebook.com/docs/messenger-platform/discovery/customer-chat-plugin/)
- **Prednosti:** Direktna veza sa Facebook stranicom
- **Mane:** Korisnici moraju imati Facebook

### 4. WhatsApp Business Button (Besplatno)
Dodajte WhatsApp dugme umesto chatbota:
```html
<a href="https://wa.me/381VAŠTELEFONBEZNULA" 
   class="whatsapp-btn" 
   target="_blank"
   aria-label="Kontakt WhatsApp">
    <i class="fab fa-whatsapp"></i>
    Pišite nam
</a>
```

---

## 📊 Poređenje opcija

| Opcija | Cena | Live Chat | Mobilna App | Email notif. | Multi-jezik |
|--------|------|-----------|-------------|--------------|-------------|
| **Tawk.to** | Besplatno | ✅ | ✅ | ✅ | ✅ |
| **Tidio** | €0-19/mes | ✅ | ✅ | ✅ | ✅ |
| **JivoChat** | $0-79/mes | ✅ | ✅ | ✅ | ✅ |
| **Messenger** | Besplatno | ✅ | ✅ (FB Messenger) | ✅ | ✅ |
| **WhatsApp** | Besplatno | ✅ | ✅ (WhatsApp) | ✅ | ✅ |
| **Postojeći FAQ bot** | Besplatno | ❌ | N/A | ❌ | ✅ |

---

## 💡 Moja preporuka

Za vaš sajt **Krčma Gaj**, najbolje rešenje je:

### Opcija A: Samo Tawk.to
- Uklonite postojeći chatbot
- Dodajte Tawk.to
- Potpuno besplatno, profesionalno rešenje

### Opcija B: Tawk.to + WhatsApp
- Koristite Tawk.to za desktop korisnike
- Dodajte WhatsApp dugme za mobilne korisnike
- Najbolje od oba sveta

### Opcija C: Zadržite postojeći + Tawk.to
- Postojeći chatbot za brze FAQ
- Tawk.to za detaljnije upite
- Ali može biti zbunjujuće za posetioce (ne preporučujem)

---

## 🎯 Zaključak

Trenutni chatbot je **samo za pokazivanje**. Za pravu komunikaciju sa gostima, **obavezno** instalirajte Tawk.to ili sličan servis.

**Preporučena akcija:**
1. Registrujte se na Tawk.to (5 minuta)
2. Dodajte kod u index.html (1 minut)
3. Preuzmite mobilnu aplikaciju
4. Gotovo! Možete da primate poruke u realnom vremenu 🎉

---

Ako vam treba pomoć sa instalacijom, javite se!
