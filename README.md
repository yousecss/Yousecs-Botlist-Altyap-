# Projemizin Adı

Bu proje, Discord botları için bir botlist komut seti içerir.

## Kurulum

1. Projeyi klonlayın:

```bash
git clone https://github.com/KULLANICI_ADINIZ/proje-adiniz.git
Gerekli paketleri yükleyin:
bash
Copy code
npm install
Botunuzun tokenini ve diğer ayarları config.json dosyasına ekleyin:
json
Copy code
{
  "token": "BURAYA_BOT_TOKENINIZI_EKLEYIN",
  "prefix": "!",
  "ownerID": "SUNUCU_SAHIBI_ID"
}
Botunuzu başlatın:
bash
Copy code
node index.js
Kullanım
Botunuzun sunucuda yetkili rolünü ayarlamak için: !botlist-yetkili-ayarla <rolEtiketi>
Botunuzun log kanalını ayarlamak için: !botlist-log-ayarla <kanalEtiketi>
Bot eklemek için: !botekle <BotID> <Prefix>
Lisans
Bu proje MIT Lisansı ile lisanslanmıştır. Detaylı bilgi için Lisans Dosyası inceleyebilirsiniz.

Bu proje KULLANICI ADINIZ tarafından geliştirilmiştir. Herhangi bir sorunuz veya öneriniz varsa, lütfen iletişime geçmekten çekinmeyin.
