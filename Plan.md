# FoodLab
Planen för uppgiften är baserad på **Recipe Experiment Lab** från förslagen vi kan välja mellan.

**Saker jag kommer ha kvar från förslag**<br />
- Registera maträtter med ingredienser med mängd, tillagningsätt (tänk step by step), tid det tar att tillaga ungefär
- Betyg på receptet (Användares betyg average 1-5 stjärnor?)

**Förändringarna jag kommer göra är följande**<br />
- Ett sätt att slumpa recept för dagar du vill laga mat hemma (du väljer vilka dagar, systemet slumpar dina eller allas recept)
- Efter rätterna slumpats kan du få en ihopräknad inköpslista så du enklare kan handla

**För att nå krav**<br />
- Inloggning, utloggning, registrering
- Dashboard (alla recept med betyg, filtrering (tid, betyg osv..) lägg till i dina recept)
- Admin dashboard? Admin hem kan vara en överblick av hur många recept, hur många som lagts till denna månad (ez datetime), kanske se alla konton, möjlighet att ta bort användare?
- Axios
- shadcn(?)

## Tankar och planering av DB
**Recipe**<br />
Information om recepted

- Recipe
    - Name
    - Description
    - Instructions
    - CookingTimeMinutes
    - Servings
    - CreatedAt
    - CreatedByUserID

**Ingredient**<br />
Alla "ingredient" är kopplade till ett recept så att man kan hämta alla ingredienter med recipeID för att visa dom.
För ihopräkning av inköpslistan kan detta bli ett problem om folk skriver t.ex tomat eller tomater, då räknas dom olika.
Men att ha en databas med fasta ingredienser funkar inte heller. (hmm??) <br />

Jag kör på att användare får skriva vad dom vill, men mått är från fast lista. Tror bara detta är ett stort problem vid scale

- Ingredient
    - Id
    - Name
    - Amount
    - Unit
    - RecipeId

**Rating**<br />
Här kan man göra så att man kan ta alla score med x RecipeId och dela dom på antalet RecipeId för att få ut average.
Använder närmaste avrundning för att visa hur många stjärnor? Behöver UserId då man bara ska kunna rösta en gång?<br />

Kör på att typ 4.8 visas då det är enklare och ger ett tydligare budskap.

- Rating
    - Id
    - Score
    - RecipeId
    - UserId

**SavedRecipes**<br />
Man ska kunna spara andras recept. Kan visas genom Alla receptId med UserId X t.ex.

- SavedRecipes
    - UserId
    - RecipeId
    - SavedAt

 **CheckListPages frontend**<br />
 - Login ✓
 - Home ✓
 - Plan page (om jag har tid)
 - Recipes page ✓
 - Single-recipe ✓
 - Admin dashboard
 - Profile ✓