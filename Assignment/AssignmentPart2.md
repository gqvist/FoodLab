# Om uppgiften

Du ska vidareutveckla den webbapplikation som du byggde i förra uppgiften. Under arbetet ska du använda ett AI-verktyg som stöd i utvecklingsprocessen.

Syftet är att visa att du kan använda AI på ett genomtänkt sätt, bedöma kvaliteten på det som genereras och själv ta ansvar för den kod som läggs till i projektet.

Du ska kunna identifiera fel, säkerhetsrisker och arkitekturproblem i AI-genererad kod samt förbättra koden innan den används i applikationen.

# Vad du ska göra

Välj en avgränsad del av din befintliga applikation som du vill utveckla eller förbättra med hjälp av AI. Det kan exempelvis vara en ny funktion, en service, en controller, validering, felhantering, autentisering eller en del av din React-frontend.

<aside>

Under hela arbetet ska du **dokumentera processen löpande**. Du ska spara de prompts du använder, relevanta delar av AI-verktygets svar och dina egna bedömningar av förslagen.

</aside>

**Arbetet ska genomföras i följande steg:**

1. Använd ett AI-verktyg för att ta fram eller vidareutveckla kod för den valda delen av applikationen.
2. Granska AI-verktygets förslag innan du använder det. Kontrollera att du förstår koden och att den passar tillsammans med resten av projektet.
3. Ändra eller förbättra koden utifrån din granskning.
4. Använd AI ytterligare en gång för att exempelvis analysera, felsöka eller förbättra den kod du arbetar med. Du ska även granska detta resultat kritiskt.
5. Testa den slutliga lösningen och kontrollera att den fungerar tillsammans med resten av applikationen.

## Krav under arbetet

<aside>

### 🤖  Användning av AI

Du ska dokumentera minst två tillfällen där du har använt AI i arbetet.

- [ ]  Vid minst ett av tillfällena ska AI användas för att generera eller vidareutveckla kod.
- [ ]  Vid det andra tillfället kan AI exempelvis användas för att analysera, felsöka eller förbättra kod.

Du ska inte använda AI-genererad kod utan att själv ha granskat och förstått den.

</aside>

<aside>

### 🔍  Granskning av AI-genererad kod

Välj minst ett kodförslag som har genererats eller förändrats med hjälp av AI och genomför en egen kodgranskning. Granskningen ska behandla följande områden:

- [ ]  Koden fungerar tillsammans med resten av applikationen.
- [ ]  Koden följer projektets arkitektur och ansvarsfördelning.
- [ ]  Koden innehåller inte onödig eller duplicerad logik.
- [ ]  Input och användardata hanteras på ett säkert sätt.
- [ ]  Secrets eller känslig information har inte lagts in i koden.
- [ ]  Fel och oväntade situationer hanteras på ett rimligt sätt.

Du ska rätta de problem som du hittar. Det ska framgå vad AI föreslog från början och hur den slutliga lösningen förändrades efter din granskning.

</aside>

<aside>

## ♾️ Versionshantering

Arbetet ska genomföras i samma GitHub-repository som huvudprojektet. Du ska göra separata och meningsfulla commits under arbetet så att det går att följa hur lösningen har utvecklats, granskats och förbättrats.

I inlämningen ska du ange vilka commits som hör till denna uppgift. Det gör du genom att ange varje commits unika commit-hash, även kallad commit-ID eller SHA.

**Exempel:**

```json
a1b2c3d: Lade till service för sammanställning

e4f5g6h: Rättade behörighetskontroll och inputvalidering

i7j8k9l: Lade till felhantering efter kodgranskning
```

</aside>

## Dokumentation

Du ska dokumentera arbetet i en PDF-fil. Dokumentationen ska beskriva:

<aside>

1. Vilken del av applikationen du valde att utveckla eller förbättra.
2. Vilket eller vilka AI-verktyg du använde.
3. Beskriv tillfällen där du använde AI, inklusive vilka instruktioner eller prompts du gav verktyget.
4. Vad AI-verktyget föreslog och vilka delar av förslaget du valde att använda.
5. Vilka problem, brister eller risker du identifierade i den AI-genererade koden.
6. **Om du har ändrat i AI koden**: hur har du förändrat eller förbättrat koden efter granskningen?
7. Hur du kontrollerade kodens kvalitet, säkerhet och placering i projektets arkitektur.
8. Din egen bedömning av AI-verktygets bidrag till arbetet. Beskriv vad verktyget hjälpte dig med och vilka begränsningar eller risker du upplevde.

> 💡 Du behöver inte bifoga fullständiga konversationer med AI-verktyget. Ta endast med de prompts, kodförslag och svar som behövs för att visa din arbetsprocess och dina beslut.
> 
</aside>

# Din inlämning

Lämna in en .zip fil som innehåller:

- Text fil som innehåller:
    - Länk till ditt GitHub-repository.
    - Lista över de commit-hashar som hör till denna uppgift.
- En PDF-fil med dokumentationen av ditt arbete.