# Proje Adı

Bu proje, bir sosyal medya platformunun verilerini görselleştirmek amacıyla oluşturulmuş bir Vue.js uygulamasıdır. Kullanıcılar, farklı grafikler aracılığıyla platformdaki tweet verilerini analiz edebilir ve kullanıcı istatistiklerini görüntüleyebilir.


### Kullanılan Teknolojiler

- Vue.js
- Vue Router
- Vuex
- Axios
- Chart.js
- OAuth 1.0a

### Gereksinimler

Bu projeyi çalıştırmak için aşağıdaki yazılımlara ihtiyacınız vardır:

- Node.js
- npm (Node Package Manager)

### Kurulum

1. Proje klasörünü yerel makinenize klonlayın veya ZIP dosyası olarak indirin.
2. Klasöre terminal üzerinden gidin ve aşağıdaki komutu çalıştırarak bağımlılıkları yükleyin:
   `npm install`


### Çalıştırma

Bağımlılıkları yükledikten sonra, aşağıdaki komutla uygulamayı başlatabilirsiniz:

`npm run serve`

Uygulama başarıyla başlatıldıktan sonra, tarayıcınızda `http://localhost:8080` adresine giderek uygulamayı görebilirsiniz.

Linkten sayfayı inceleyebilirsiz

### Verilerin Yüklenmesi

Uygulama, `data.json` adlı bir dosyadan kullanıcı ve tweet verilerini yükler.

## Kullanım

Uygulama, ana sayfa (`Dashboard.vue`) üzerinde birkaç farklı grafik sunar:

- **Total number of tweets by country (Ülkeye göre toplam tweet sayısı)**: Ülkelerin toplam tweet sayısını gösteren çizgi grafiği.
- **Female-Male ratio of all tweets pie (Tüm tweet'lerdeki kadın-erkek oranı - Pasta grafiği)**: Tüm tweet'lerdeki kadın ve erkek kullanıcıların oranını gösteren pasta grafiği.
- **Tweet likes graph (Tweet beğenileri grafiği)**: Tweet'lerin beğeni sayılarını gösteren çubuk grafiği.

Bu grafikler, kullanıcılara sosyal medya platformundaki verileri daha iyi anlamalarına yardımcı olacak görsel analizler sunar.


