# Om uppgiften

Du ska genomföra en **individuell inlämningsuppgift** där du utvecklar och publicerar en komplett webbapplikation med **ASP.NET Core Web API** och **React**. Applikationen ska använda en databas, driftsättas i **Azure** och levereras med en fungerande **CI/CD‑pipeline** via GitHub Actions.

Uppgiften ska visa att du kan bygga en sammanhängande fullstack‑lösning med:

- Tydlig arkitektur och lagerindelning
- Säker hantering av användare och användarspecifik data
- Goda utvecklings- och leveransflöden från kod till produktion

# Vad du ska göra

Börja med att gå igenom teman nedan och välj det som passar dig. Utifrån ditt val ska du sedan designa och bygga en fullstack‑webbapplikation (ASP.NET Core Web API + React) med databas, driftsättning i Azure och en fungerande CI/CD‑pipeline via GitHub Actions.

#### Tema

**Välj ett av följande teman och utforma funktionalitet, datamodell och UI utifrån ditt val.**

- **1. Mood & Wellness Dashboard**
    
    En applikation där användaren kan registrera exempelvis humör, sömn, stressnivå och fysisk aktivitet. Informationen ska presenteras genom grafer och sammanställningar där användaren ska kunna följa förändringar över tid och upptäcka möjliga samband, exempelvis mellan sömn och humör.
    
- **2. Recipe Experiment Lab**
    
    En applikation där användaren kan registrera maträtter, ingredienser, tillagningssätt, variationer och resultat. Informationen ska användas för att visa vilka maträtter, ingredienser eller tillagningssätt som har fått högst betyg.
    
- **3. Prenumerationsöversikt**
    
    En applikation där användaren kan registrera sina digitala prenumerationer, kostnader, kategorier och betalningsintervall. Informationen ska presenteras i en dashboard som exempelvis visar total månadskostnad och kostnad per kategori.
    

Du har frihet att utforma funktionalitet, datamodell och gränssnitt utifrån temat, men **samtliga tekniska krav ska vara uppfyllda**.

## Tekniska Krav

För att uppgiften ska godkännas behöver applikation uppfylla följande tekniska krav:

<aside>

### **⚙️ Backend**

**Web API**

- [ ]  Bygg ett API med **ASP.NET Core Web API** och använd controllers.
- [ ]  Implementera CRUD för relevant data och använd korrekta HTTP‑metoder/statuskoder.
- [ ]  Lägg affärslogik i **services** (inte direkt i controllers/endpoints).

**Databas**

- [ ]  Använd **Entity Framework Core** och **Code First**.
- [ ]  Skapa minst **tre relevanta entiteter** utöver Identity‑tabeller.
- [ ]  Skapa minst **en relation** mellan två entiteter.

**Säkerhet**

- [ ]  Implementera registrering, inloggning och utloggning med **ASP.NET Core Identity**.
- [ ]  Minst en endpoint ska kräva autentisering.
- [ ]  Det ska inte gå att läsa/uppdatera/ta bort någon annans data.
- [ ]  Implementera **inputvalidering** i backend (även om du validerar i frontend).
- [ ]  Konfigurera **CORS** så att endast nödvändiga origins tillåts.
- [ ]  Visa säker hantering av secrets (lösenord, connection string, nycklar).
</aside>

<aside>

### 🎨 Frontend: React

- [ ]  Bygg en frontend med **React**.
- [ ]  Konsumera APIet med Axios eller Fetch (det du föredrar).
- [ ]  UI ska stödja registrering/inloggning/utloggning.
- [ ]  UI ska stödja CRUD för applikationens data.
- [ ]  Bygg en **dashboard** som sammanställer data.
- [ ]  Använd statehantering för applikationens data.
- [ ]  Använd CSS‑ramverk/komponentbibliotek.
    
    > *💡 Du får också skriva egen CSS om du vill.*
    > 
</aside>

<aside>

### Leverans

- [ ]  Publicera frontend i **Azure**.
- [ ]  Publicera backend i **Azure**.
- [ ]  Produktionsdatabas ska finnas i **Azure**.
- [ ]  Den publicerade frontend ska kommunicera med publicerad backend.
- [ ]  Secrets ska hanteras via t.ex. **GitHub Secrets** och/eller **Azure‑konfiguration**.
- [ ]  Lokal konfiguration och produktionskonfiguration ska hanteras separat.
- [ ]  **Git‑historik ska visa kontinuerligt arbete:**
    - [ ]  Inga ”allt i sista commit”.
</aside>

<aside>

### **🏆 VG Krav**

Om du siktar på VG i den här inlämningsuppgiften ska du även göra följande:

- [ ]  API ska använda separata DTO för inkommande och utgående data. Entity Framework-entiteter får inte skickas direkt till eller från controllers.
- [ ]  Layouten i Frontend ska vara tydlig och responsiv (fungera på både stora och små skärmar).
- [ ]  Minst ett databasindex ska skapas med EF Core för en kolumn som används vid sökning, filtrering eller sortering. Indexet ska finnas med i en migration.
- [ ]  Inga secrets/anslutningssträngar får finnas i repositoryn eller dess historik.
- [ ]  Routes som kräver inloggning ska skyddas i både frontend och backend. En användare som inte är inloggad och försöker öppna en skyddad route ska omdirigeras till inloggningssidan.
- [ ]  Applikationen ska ha en särskild sida för okända routes. Om användaren navigerar till en adress som inte finns ska en tydlig 404-sida visas.
</aside>

## **Muntlig Redovisning**

Den muntliga redovisningen är en del av betygsunderlaget och används för att bedöma din förmåga att kritiskt reflektera över den applikation du har utvecklat.

<aside>

Under redovisningen ska du kunna:

- [ ]  Motivera och diskutera de arkitekturval du har gjort.
- [ ]  Identifiera och resonera kring styrkor och svagheter i din lösning.
- [ ]  Beskriva vilka delar du skulle förändra eller vidareutveckla.
- [ ]  Resonera kring applikationens möjliga marknadspotential.

### För G

Du kan på ett relevant sätt reflektera kring dina arkitekturval och beskriva styrkor och svagheter i den egna lösningen. Du kan även föra ett resonemang kring möjlig vidareutveckling och applikationens marknadspotential.

### För VG

För VG krävs det att du gör G-kravet med stor säkerhet och skicklighet. Det innebär att du kan föra ett självständigt och välgrundat resonemang där du exempelvis:

- Motiverar dina arkitektur val och diskuterar rimliga alternativ.
- Väger olika lösningars för- och nackdelar mot varandra.
- Identifierar konsekvenser av de val du har gjort.
- Föreslår relevanta förbättringar och kan motivera varför de skulle vara värdefulla.
- För ett välgrundat resonemang kring användarnytta, marknadspotential och möjlig fortsatt utveckling.
</aside>

# Din inlämning

- Länk till ditt **GitHub‑repository**.
- Länk till publicerad **frontend**.
- Länk till publicerat **API som leder till fungerande swagger/scalar sida.**

**Efter deadline kommer du att få tid till en muntlig redovisning.**

# Betygsättning

För att få G krävs det att samtliga tekniska krav är uppfyllda samt att den muntliga redovisningen når G-nivå. För VG krävs det att samtliga G och VG krav i uppgiften är uppfyllda samt att den muntliga redovisningen når VG-nivå.